"use client";

import { Configuration, PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { useEffect, useState, useCallback } from "react";

// Fallback if not defined or during SSR
const fallbackRedirectUri = typeof window !== "undefined"
  ? window.location.origin
  : "https://bytefest.azurewebsites.net";

// Use the environment variable if available; otherwise use the fallback
const redirectUri = process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI || fallbackRedirectUri;

// MSAL Configuration
const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN}`,
    redirectUri,
    postLogoutRedirectUri: redirectUri,
    navigateToLoginRequestUrl: false // Change to false to prevent navigation issues
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    allowRedirectInIframe: true,
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (!containsPii) {
          console.log(`MSAL: ${message}`);
        }
      },
      piiLoggingEnabled: false
    }
  }
};

// Initialize MSAL
const pca = new PublicClientApplication(msalConfig);

// Login request configuration
export const loginRequest = {
  scopes: [
    "User.Read",
    "openid", 
    "profile",
    "offline_access"
  ],
  prompt: "select_account"
};

// Export the provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Handler for redirect completion - used to prevent stuck states
  const handleRedirectComplete = useCallback(() => {
    console.log("MSAL redirect flow completed");
  }, []);

  useEffect(() => {
    // Set up event listener for redirect completion
    const listenerId = pca.addEventCallback(event => {
      if (event.eventType === EventType.HANDLE_REDIRECT_END) {
        handleRedirectComplete();
      }
    });

    // Initialize MSAL - one-time call at app startup
    const initializeMsal = async () => {
      try {
        // First initialize MSAL instance
        await pca.initialize();
        console.log("MSAL initialized");
        
        // Then try to handle any redirect response
        const response = await pca.handleRedirectPromise();
        console.log("Initial redirect handled:", response ? "with response" : "no response");
        
        if (response?.account) {
          // Set active account when successful
          pca.setActiveAccount(response.account);
          console.log("Account set from redirect:", response.account.username);
          
          // Get flag for bli-foredragsholder redirect
          const shouldRedirectToForm = localStorage.getItem('returnToFormAfterLogin') === 'true';
          localStorage.removeItem('returnToFormAfterLogin');
          
          // Trigger login complete event
          window.dispatchEvent(new Event('msal:login:complete'));
          
          // Redirect user appropriately
          if (shouldRedirectToForm) {
            window.location.href = '/bli-foredragsholder';
          } else if (window.location.pathname === '/login') {
            // Only redirect away from login page
            window.location.href = '/';
          }
        } else {
          // Check for existing sessions
          const accounts = pca.getAllAccounts();
          if (accounts.length > 0) {
            pca.setActiveAccount(accounts[0]);
            console.log("Using existing account:", accounts[0].username);
          }
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing MSAL:", error);
        setAuthError('An error occurred during authentication.');
        setIsInitialized(true); // Still mark as initialized to prevent app blocking
      }
    };

    initializeMsal();

    // Cleanup event listener
    return () => {
      if (listenerId) {
        pca.removeEventCallback(listenerId);
      }
    };
  }, [handleRedirectComplete]);

  // Show error message if there is one, but don't block the app
  const errorMessage = authError ? (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-red-50 text-red-800 text-center">
      {authError}
    </div>
  ) : null;

  if (!isInitialized) {
    return null;
  }

  return (
    <MsalProvider instance={pca}>
      {errorMessage}
      {children}
    </MsalProvider>
  );
}

// Graph configuration
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphPhotoEndpoint: "https://graph.microsoft.com/v1.0/me/photo/$value",
  graphThumbnailEndpoint: "https://graph.microsoft.com/v1.0/me/photos/48x48/$value",
};
