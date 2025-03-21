"use client";

import { MsalProvider } from "@azure/msal-react";
import { Configuration, PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "@/config/AuthConfig";

// Ensure redirect URI is set correctly
const configuration: Configuration = {
  ...msalConfig,
  auth: {
    ...msalConfig.auth,
    redirectUri: typeof window !== 'undefined' ? window.location.origin : 'https://bytefest.azurewebsites.net'
  }
};

// Create MSAL instance
const pca = new PublicClientApplication(configuration);

// Add event listeners for debugging
pca.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_START) {
    console.log('Login started:', {
      timestamp: new Date().toISOString(),
      config: pca.getConfiguration(),
      windowLocation: typeof window !== 'undefined' ? window.location.href : 'SSR'
    });
  }
  if (event.eventType === EventType.LOGIN_FAILURE) {
    console.error('Login failed:', {
      timestamp: new Date().toISOString(),
      error: event.error,
      config: pca.getConfiguration()
    });
  }
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MsalProvider instance={pca}>
      {children}
    </MsalProvider>
  );
} 