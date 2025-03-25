"use client";

import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { useEffect, useState } from "react";

// Fallback if not defined or during SSR
const fallbackRedirectUri = typeof window !== "undefined"
  ? window.location.origin
  : "https://bytefest.azurewebsites.net";

// Use the environment variable if available; otherwise use the fallback
const redirectUri = process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI || fallbackRedirectUri;

// API scope configuration
const apiScope = process.env.NEXT_PUBLIC_MSAL_API_SCOPE 
  ? `api://${process.env.NEXT_PUBLIC_MSAL_API_SCOPE}/user`
  : "";

// MSAL Configuration
const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN}`,
    redirectUri,
    postLogoutRedirectUri: redirectUri,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
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
    "offline_access",
    apiScope
  ].filter(Boolean),
  prompt: "select_account"
};

// Export the provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await pca.initialize();
        const response = await pca.handleRedirectPromise();
        
        if (response?.account) {
          // Valid account
          pca.setActiveAccount(response.account);
          
          // Check if we should redirect to bli-foredragsholder page
          const shouldRedirectToForm = localStorage.getItem('returnToFormAfterLogin') === 'true';
          localStorage.removeItem('returnToFormAfterLogin');
          
          // Trigger login complete event
          window.dispatchEvent(new Event('msal:login:complete'));
          
          // Handle redirect
          if (shouldRedirectToForm) {
            window.location.href = '/bli-foredragsholder';
          } else {
            window.location.href = '/';
          }
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing MSAL:", error);
        setAuthError('An error occurred during authentication.');
      }
    };

    initializeMsal();
  }, []);

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
