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
    clientId: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID!, // from your environment
    authority: "https://login.microsoftonline.com/organizations",
    redirectUri,
    postLogoutRedirectUri: redirectUri,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
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
  ].filter(Boolean), // Remove empty strings if apiScope is not configured
  prompt: "select_account",
  domainHint: "soprasteria.com"
};

// Export the provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await pca.initialize();
        await pca.handleRedirectPromise();
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing MSAL:", error);
      }
    };

    initializeMsal();
  }, []);

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <MsalProvider instance={pca}>
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
