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
    clientId: MSAL_CLIENT_ID as string,
    authority: `https://login.microsoftonline.com/${MSAL_AUTHORITY_TOKEN as string}`,
    redirectUri: encodeURI(MSAL_REDIRECT_URI as string).replace(/%20/g, ''),
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

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
