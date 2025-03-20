const isDevelopment = process.env.NODE_ENV === 'development';

// Get environment variables with fallbacks ONLY for local development
const MSAL_CLIENT_ID = process.env.NEXT_PUBLIC_MSAL_CLIENT_ID || (isDevelopment ? '6b5e1b61-c5d5-40f0-964c-37be41a24f06' : '');
const MSAL_AUTHORITY_TOKEN = process.env.NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN || (isDevelopment ? '5cfb4cc2-e03e-4799-847e-4cf4efb321ba' : '');

const rawRedirect = process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI || '';
const MSAL_REDIRECT_URI = rawRedirect.trim() || (isDevelopment ? 'http://localhost:3000' : '');
console.log("MSAL Redirect URI:", MSAL_REDIRECT_URI);

if (!isDevelopment && !MSAL_REDIRECT_URI) {
  const message = 'Critical: NEXT_PUBLIC_MSAL_REDIRECT_URI is not set in production!';
  console.error(message);
  throw new Error(message);
}

// Explicitly check for missing production environment variables
if (!isDevelopment) {
  const missingVars = [];
  if (!process.env.NEXT_PUBLIC_MSAL_CLIENT_ID) missingVars.push('NEXT_PUBLIC_MSAL_CLIENT_ID');
  if (!process.env.NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN) missingVars.push('NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN');
  if (!process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI) missingVars.push('NEXT_PUBLIC_MSAL_REDIRECT_URI');

  if (missingVars.length > 0) {
    const message = `Critical environment variables missing in production: ${missingVars.join(', ')}`;
    console.error(message);
    throw new Error(message); // Immediately stop the build/deployment if missing
  }
}

// Validate redirect URI format
if (MSAL_REDIRECT_URI && !MSAL_REDIRECT_URI.startsWith('http://') && !MSAL_REDIRECT_URI.startsWith('https://')) {
  throw new Error('MSAL_REDIRECT_URI must be a valid absolute URL starting with http:// or https://');
}

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

export const loginRequest = {
  scopes: ["User.Read"]
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphPhotoEndpoint: "https://graph.microsoft.com/v1.0/me/photo/$value",
  graphThumbnailEndpoint: "https://graph.microsoft.com/v1.0/me/photos/48x48/$value"
};
