// Get environment variables with fallbacks for local development
const MSAL_CLIENT_ID = process.env.NEXT_PUBLIC_MSAL_CLIENT_ID || '6b5e1b61-c5d5-40f0-964c-37be41a24f06';
const MSAL_AUTHORITY_TOKEN = process.env.NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN || '5cfb4cc2-e03e-4799-847e-4cf4efb321ba';
const MSAL_REDIRECT_URI = process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI || 'http://localhost:3000';

// Check for missing values in non-development environments
if (process.env.NODE_ENV !== 'development') {
    const missingVars = [];
    if (!process.env.NEXT_PUBLIC_MSAL_CLIENT_ID) missingVars.push('NEXT_PUBLIC_MSAL_CLIENT_ID');
    if (!process.env.NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN) missingVars.push('NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN');
    if (!process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI) missingVars.push('NEXT_PUBLIC_MSAL_REDIRECT_URI');

    if (missingVars.length > 0) {
        // Log warning but don't throw error to prevent build failures
        console.warn(`Warning: Environment variables missing: ${missingVars.join(', ')}`);
    }
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

// Graph API endpoints for getting user profile data
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphPhotoEndpoint: "https://graph.microsoft.com/v1.0/me/photo/$value",
    // Alternative endpoint for corporate accounts
    graphThumbnailEndpoint: "https://graph.microsoft.com/v1.0/me/photos/48x48/$value"
};