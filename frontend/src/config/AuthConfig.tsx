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

// MSAL Configuration
const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID!, // from your environment
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN}`,
    redirectUri,
    postLogoutRedirectUri: redirectUri,
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
  scopes: ["User.Read", "openid", "profile", "offline_access"],
  prompt: "select_account",
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
