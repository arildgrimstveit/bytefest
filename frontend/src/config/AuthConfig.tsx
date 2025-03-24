"use client";

import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

// Define redirect URI as a constant
export const REDIRECT_URI = 'https://bytefest.azurewebsites.net';

// MSAL Configuration
const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN}`,
    redirectUri: REDIRECT_URI,
    postLogoutRedirectUri: REDIRECT_URI
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  },
};

// Initialize MSAL
const pca = new PublicClientApplication(msalConfig);

// Handle the redirect promise
if (typeof window !== 'undefined') {
  pca.handleRedirectPromise().catch(error => {
    console.error("Error handling redirect:", error);
  });
}

// Login request configuration
export const loginRequest = {
  scopes: ["User.Read", "openid", "profile", "offline_access"],
  prompt: "select_account"
};

// Export the provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
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
  graphThumbnailEndpoint: "https://graph.microsoft.com/v1.0/me/photos/48x48/$value"
};
