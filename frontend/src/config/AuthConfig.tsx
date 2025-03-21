const isDevelopment = process.env.NODE_ENV === 'development';

// Get environment variables
const MSAL_CLIENT_ID = process.env.NEXT_PUBLIC_MSAL_CLIENT_ID;
const MSAL_AUTHORITY_TOKEN = process.env.NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN;
const DEFAULT_REDIRECT_URI = 'https://bytefest.azurewebsites.net';

// In development, use the environment variable. In production, use window.location.origin if available
const getRedirectUri = () => {
  if (typeof window === 'undefined') {
    // During SSR, return the default URI
    return DEFAULT_REDIRECT_URI;
  }

  // In the browser
  const redirectUri = isDevelopment
    ? 'http://localhost:3000'
    : window.location.origin;

  console.log('Generating redirect URI:', {
    isDevelopment,
    redirectUri,
    windowOrigin: typeof window !== 'undefined' ? window.location.origin : 'undefined',
    isServer: typeof window === 'undefined'
  });

  return redirectUri;
};

// Debug logging for environment variables
console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  hasClientId: !!MSAL_CLIENT_ID,
  hasAuthorityToken: !!MSAL_AUTHORITY_TOKEN,
  redirectUri: getRedirectUri(),
  isDevelopment,
  isServer: typeof window === 'undefined',
  defaultUri: DEFAULT_REDIRECT_URI
});

// Validate required environment variables
if (!MSAL_CLIENT_ID || !MSAL_AUTHORITY_TOKEN) {
  throw new Error('Missing required MSAL environment variables');
}

const redirectUri = getRedirectUri();

// Add safe debugging info that won't be masked
console.log('MSAL Configuration:', {
  isDevelopment,
  redirectUri,
  hasClientId: !!MSAL_CLIENT_ID,
  hasAuthorityToken: !!MSAL_AUTHORITY_TOKEN,
  isServer: typeof window === 'undefined'
});

// TypeScript knows these values are defined after our validation
export const msalConfig = {
  auth: {
    clientId: MSAL_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${MSAL_AUTHORITY_TOKEN}`,
    redirectUri,
    postLogoutRedirectUri: redirectUri,
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
  postLogoutRedirectUri: msalConfig.auth.postLogoutRedirectUri,
  isServer: typeof window === 'undefined'
});

export const loginRequest = {
  scopes: ["User.Read"]
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphPhotoEndpoint: "https://graph.microsoft.com/v1.0/me/photo/$value",
  graphThumbnailEndpoint: "https://graph.microsoft.com/v1.0/me/photos/48x48/$value"
};
