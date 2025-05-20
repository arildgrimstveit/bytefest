"use client";

import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { useEffect, useState } from "react";

// Define redirect URI
const redirectUri =
  (typeof window !== "undefined" && window.location.origin) ||
  process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI ||
  "https://bytefest.soprasteria.no/";

// MSAL configuration
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
  },
  system: {
    allowRedirectInIframe: true,
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (!containsPii) { console.log(`MSAL: ${message}`); }
      },
      piiLoggingEnabled: false
    }
  }
};

// MSAL application instance
const pca = new PublicClientApplication(msalConfig);

// Default login request parameters
export const loginRequest = {
  scopes: ["User.Read", "openid", "profile", "offline_access"],
  prompt: "select_account"
};

// Provides MSAL context and handles initialization
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await pca.initialize();
        const response = await pca.handleRedirectPromise();

        if (response?.account) {
          pca.setActiveAccount(response.account);
          window.dispatchEvent(new Event('msal:login:complete')); // Notify UserContext early

          const shouldReturnToForm = localStorage.getItem('returnToFormAfterLogin') === 'true';
          
          if (shouldReturnToForm) {
            localStorage.removeItem('returnToFormAfterLogin');
            // If not already on /paamelding (e.g., MSAL redirected to default redirectUri like homepage)
            // or if login was initiated from a generic /login page with the flag set.
            if (window.location.pathname !== '/paamelding') {
              window.location.href = '/paamelding'; // Use window.location.href for full page redirect after MSAL init
              return; // Stop further processing in this effect if redirecting
            }
          } else if (window.location.pathname === '/login') {
            // If not returning to form and currently on /login page, redirect to homepage.
            // This handles cases where user directly visits /login and logs in without specific intent.
            window.location.href = '/';
            return; // Stop further processing
          }
          // If navigateToLoginRequestUrl: true is doing its job and we were on /paamelding, we should be there.
          // If we were on another page, we should be there.
          // If we were on /login and the flag wasn't set, we are now at '/'.
        } else {
          const accounts = pca.getAllAccounts();
          if (accounts.length > 0) {
            pca.setActiveAccount(accounts[0]);
          }
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing MSAL:", error);
        setAuthError('An error occurred during authentication.');
        setIsInitialized(true); // Ensure app UI doesn't block on init error
      }
    };
    initializeMsal();
  }, []);

  const errorMessage = authError ? (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-red-50 text-red-800 text-center">
      {authError}
    </div>
  ) : null;

  if (!isInitialized) {
    return null; // Don't render children until MSAL is ready
  }

  return (
    <MsalProvider instance={pca}>
      {errorMessage}
      {children}
    </MsalProvider>
  );
}

// Microsoft Graph API endpoints
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphPhotoEndpoint: "https://graph.microsoft.com/v1.0/me/photo/$value",
  graphThumbnailEndpoint: "https://graph.microsoft.com/v1.0/me/photos/48x48/$value",
};
