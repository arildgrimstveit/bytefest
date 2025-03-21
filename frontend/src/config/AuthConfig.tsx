const isDevelopment = process.env.NODE_ENV === 'development';

// Debug logging for environment variables
console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  hasClientId: !!process.env.NEXT_PUBLIC_MSAL_CLIENT_ID,
  hasAuthorityToken: !!process.env.NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN,
  hasRedirectUri: !!process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI,
  isDevelopment
});

// Get environment variables
const MSAL_CLIENT_ID = process.env.NEXT_PUBLIC_MSAL_CLIENT_ID;
const MSAL_AUTHORITY_TOKEN = process.env.NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN;
const MSAL_REDIRECT_URI = process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI;

// Validate required environment variables
if (!MSAL_CLIENT_ID || !MSAL_AUTHORITY_TOKEN || !MSAL_REDIRECT_URI) {
  throw new Error('Missing required MSAL environment variables');
}

// Validate redirect URI format
if (!MSAL_REDIRECT_URI.startsWith('https://')) {
  throw new Error('MSAL_REDIRECT_URI must be a valid HTTPS URL');
}

// Additional validation for encoding and hidden characters
const cleanRedirectUri = MSAL_REDIRECT_URI?.trim();
if (cleanRedirectUri !== MSAL_REDIRECT_URI) {
  console.error('Redirect URI contains leading/trailing spaces or hidden characters');
  throw new Error('Redirect URI contains invalid characters');
}

// Add safe character validation logging
console.log('MSAL Redirect URI character validation:', {
  length: MSAL_REDIRECT_URI?.length || 0,
  cleanLength: cleanRedirectUri?.length || 0,
  firstChar: MSAL_REDIRECT_URI?.[0]?.charCodeAt(0),
  lastChar: MSAL_REDIRECT_URI?.[MSAL_REDIRECT_URI.length - 1]?.charCodeAt(0),
  urlEncoded: encodeURIComponent(MSAL_REDIRECT_URI || '')
});

// Add safe debugging info that won't be masked
console.log('MSAL Redirect URI validation:', {
  length: MSAL_REDIRECT_URI?.length || 0,
  startsWithHttp: MSAL_REDIRECT_URI?.startsWith('http://'),
  startsWithHttps: MSAL_REDIRECT_URI?.startsWith('https://'),
  containsAzurewebsites: MSAL_REDIRECT_URI?.includes('azurewebsites.net'),
  hasSpaces: MSAL_REDIRECT_URI?.includes(' '),
  isEmpty: !MSAL_REDIRECT_URI || MSAL_REDIRECT_URI.trim() === ''
});

console.log('MSAL Configuration loaded successfully');

// Debug logging for environment variables
console.log('MSAL Configuration Debug:', {
  NODE_ENV: process.env.NODE_ENV,
  hasClientId: !!process.env.NEXT_PUBLIC_MSAL_CLIENT_ID,
  hasAuthorityToken: !!process.env.NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN,
  hasRedirectUri: !!process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI,
  actualRedirectUri: process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI,
  isDevelopment,
  redirectUriLength: process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI?.length
});

// TypeScript knows these values are defined after our validation
export const msalConfig = {
  auth: {
    clientId: MSAL_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${MSAL_AUTHORITY_TOKEN}`,
    redirectUri: MSAL_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

// Add configuration validation logging
console.log('Redirect URI Debug:', {
  configuredUri: msalConfig.auth.redirectUri,
  uriParameter: `redirect_uri=${encodeURIComponent(msalConfig.auth.redirectUri)}`,
});

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
