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
const missingVars = [];
if (!MSAL_CLIENT_ID) missingVars.push('NEXT_PUBLIC_MSAL_CLIENT_ID');
if (!MSAL_AUTHORITY_TOKEN) missingVars.push('NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN');
if (!MSAL_REDIRECT_URI) missingVars.push('NEXT_PUBLIC_MSAL_REDIRECT_URI');

if (missingVars.length > 0) {
  const message = `Missing required environment variables: ${missingVars.join(', ')}`;
  console.error(message);
  throw new Error(message);
}

// Validate redirect URI format
if (!(MSAL_REDIRECT_URI as string).startsWith('http://') && !(MSAL_REDIRECT_URI as string).startsWith('https://')) {
  throw new Error('MSAL_REDIRECT_URI must be a valid absolute URL starting with http:// or https://');
}

console.log('MSAL Configuration loaded successfully');

// TypeScript knows these values are defined after our validation
export const msalConfig = {
  auth: {
    clientId: MSAL_CLIENT_ID as string,
    authority: `https://login.microsoftonline.com/${MSAL_AUTHORITY_TOKEN as string}`,
    redirectUri: MSAL_REDIRECT_URI as string,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"]
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphPhotoEndpoint: "https://graph.microsoft.com/v1.0/me/photo/$value",
  graphThumbnailEndpoint: "https://graph.microsoft.com/v1.0/me/photos/48x48/$value"
};
