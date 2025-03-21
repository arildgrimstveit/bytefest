const isDevelopment = process.env.NODE_ENV === 'development';

// Get environment variables
const MSAL_CLIENT_ID = process.env.NEXT_PUBLIC_MSAL_CLIENT_ID;
const MSAL_AUTHORITY_TOKEN = process.env.NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN;

// In development, use the environment variable. In production, use window.location.origin
const getRedirectUri = () => {
  if (typeof window === 'undefined') return ''; // Handle SSR case
  
  if (isDevelopment) {
    return process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI || 'http://localhost:3000';
  }
  
  return window.location.origin;
};

// Debug logging for environment variables
console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  hasClientId: !!MSAL_CLIENT_ID,
  hasAuthorityToken: !!MSAL_AUTHORITY_TOKEN,
  redirectUri: getRedirectUri(),
  isDevelopment
});

// Validate required environment variables
if (!MSAL_CLIENT_ID || !MSAL_AUTHORITY_TOKEN) {
  throw new Error('Missing required MSAL environment variables');
}

const redirectUri = getRedirectUri();

// Validate redirect URI
if (!redirectUri) {
  console.error('No redirect URI available');
  throw new Error('No redirect URI available');
}

// Add safe debugging info that won't be masked
console.log('MSAL Configuration:', {
  isDevelopment,
  redirectUri,
  hasClientId: !!MSAL_CLIENT_ID,
  hasAuthorityToken: !!MSAL_AUTHORITY_TOKEN
});

// TypeScript knows these values are defined after our validation
export const msalConfig = {
  auth: {
    clientId: MSAL_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${MSAL_AUTHORITY_TOKEN}`,
    redirectUri,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

// Add configuration validation logging
console.log('Final MSAL Config:', {
  clientId: msalConfig.auth.clientId,
  authority: msalConfig.auth.authority,
  redirectUri: msalConfig.auth.redirectUri,
});

export const loginRequest = {
  scopes: ["User.Read"]
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphPhotoEndpoint: "https://graph.microsoft.com/v1.0/me/photo/$value",
  graphThumbnailEndpoint: "https://graph.microsoft.com/v1.0/me/photos/48x48/$value"
};
