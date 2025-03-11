console.log('Full process.env:', process.env);

const MSAL_CLIENT_ID = '6b5e1b61-c5d5-40f0-964c-37be41a24f06';
const MSAL_AUTHORITY_TOKEN = '5cfb4cc2-e03e-4799-847e-4cf4efb321ba';
const MSAL_REDIRECT_URI = 'http://localhost:3000';

console.log('MSAL Config Values:', {
    MSAL_CLIENT_ID,
    MSAL_AUTHORITY_TOKEN,
    MSAL_REDIRECT_URI,
    NODE_ENV: process.env.NODE_ENV
});

if (!MSAL_CLIENT_ID || !MSAL_AUTHORITY_TOKEN || !MSAL_REDIRECT_URI) {
    const missingVars = [];
    if (!MSAL_CLIENT_ID) missingVars.push('MSAL_CLIENT_ID');
    if (!MSAL_AUTHORITY_TOKEN) missingVars.push('MSAL_AUTHORITY_TOKEN');
    if (!MSAL_REDIRECT_URI) missingVars.push('MSAL_REDIRECT_URI');

    throw new Error(`Environment variables missing: ${missingVars.join(', ')}. 
        Current environment: ${process.env.NODE_ENV}`);
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