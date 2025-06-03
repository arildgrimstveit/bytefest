'use client';

import { useMsal } from "@azure/msal-react";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { EventType, AccountInfo } from "@azure/msal-browser";
import { User, UserContextType, UserProviderProps } from "@/types/user";
import { graphConfig } from "@/config/AuthConfig"; // Added for graphMeEndpoint
import { useRouter } from "next/navigation"; // Import useRouter

// Create the context for user authentication state
const UserContext = createContext<UserContextType | undefined>(undefined);

// Manages user info, authentication status, and MSAL interactions.
export const UserProvider = ({ children }: UserProviderProps) => {
    const { instance } = useMsal();
    const router = useRouter(); // Instantiate useRouter
    const [authState, setAuthState] = useState<{
        isAuthenticated: boolean;
        user: User | null;
        activeAccount: AccountInfo | null;
    }>({
        isAuthenticated: false,
        user: null,
        activeAccount: null
    });

    // Fetches additional user details from Graph API
    const fetchUserDetailsFromGraph = useCallback(async (account: AccountInfo): Promise<User | null> => {
        try {
            const accessToken = await instance.acquireTokenSilent({
                scopes: ["User.Read"],
                account: account,
            });
            // Explicitly select the fields needed, including department and officeLocation
            const graphUrl = `${graphConfig.graphMeEndpoint}?$select=displayName,mail,userPrincipalName,mobilePhone,businessPhones,department,officeLocation`;
            const response = await fetch(graphUrl, {
                headers: { Authorization: `Bearer ${accessToken.accessToken}` },
            });
            if (!response.ok) {
                console.error("Graph API call failed:", response);
                return null;
            }
            const graphUser = await response.json();
            return {
                name: account.name || graphUser.displayName || "",
                email: account.username || graphUser.mail || graphUser.userPrincipalName || "",
                phoneNumber: graphUser.mobilePhone || (Array.isArray(graphUser.businessPhones) && graphUser.businessPhones.length > 0 ? graphUser.businessPhones[0] : ""),
                department: graphUser.department || "",
                officeLocation: graphUser.officeLocation || "",
            };
        } catch (error) {
            console.error("Error fetching user details from Graph:", error);
            return {
                name: account.name || "",
                email: account.username,
                phoneNumber: "",
                department: "",
                officeLocation: "",
            };
        }
    }, [instance]);

    // Updates the authState based on the current MSAL active account
    const updateAuthState = useCallback(async () => {
        const activeAccount = instance.getActiveAccount();
        const currentIsAuth = authState.isAuthenticated;

        if (activeAccount) {
            if (authState.activeAccount?.homeAccountId !== activeAccount.homeAccountId || !currentIsAuth) {
                const userDetails = await fetchUserDetailsFromGraph(activeAccount);
                if (userDetails) {
                    document.cookie = `userEmail=${encodeURIComponent(userDetails.email)}; path=/; max-age=86400; SameSite=Lax`;
                    setAuthState({
                        isAuthenticated: true,
                        user: userDetails,
                        activeAccount
                    });
                } else {
                    setAuthState(prevState => ({
                        ...prevState,
                        isAuthenticated: true,
                        user: {
                            name: activeAccount.name || "",
                            email: activeAccount.username,
                            phoneNumber: "",
                            department: "",
                            officeLocation: "",
                        },
                        activeAccount
                    }));
                }
                // Handle redirect after login
                const loginIntent = localStorage.getItem('loginRedirectIntent');
                if (loginIntent) {
                    console.log(`Found login intent: ${loginIntent}, attempting redirect.`);
                    localStorage.removeItem('loginRedirectIntent'); // Clear intent after use
                    // Map intent values to paths
                    if (loginIntent === 'program') {
                        router.push('/program');
                    } else if (loginIntent === 'paamelding') {
                        router.push('/paamelding'); 
                    } else if (loginIntent === 'dashboard') {
                        router.push('/dashboard');
                    } else {
                        router.push('/');
                    }
                } else if (!currentIsAuth) {
                     // If it was a new login without a specific intent, redirect to home
                     router.push('/'); 
                }
            }
        } else {
            if (currentIsAuth) {
                document.cookie = "userEmail=; path=/; max-age=0; SameSite=Lax";
                setAuthState({
                    isAuthenticated: false,
                    user: null,
                    activeAccount: null
                });
            }
        }
    }, [instance, authState.activeAccount, authState.isAuthenticated, fetchUserDetailsFromGraph, router]);

    // Effect to initialize auth state and set up MSAL event listeners
    useEffect(() => {
        updateAuthState();

        const callbackId = instance.addEventCallback(event => {
            if (
                event.eventType === EventType.LOGIN_SUCCESS ||
                event.eventType === EventType.LOGIN_FAILURE ||
                event.eventType === EventType.LOGOUT_SUCCESS ||
                event.eventType === EventType.HANDLE_REDIRECT_END // Important for post-login scenarios
            ) {
                updateAuthState();
            }
        });

        const handleCustomLoginEvent = () => updateAuthState();
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') updateAuthState();
        };

        window.addEventListener('msal:login:complete', handleCustomLoginEvent);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (callbackId) instance.removeEventCallback(callbackId);
            window.removeEventListener('msal:login:complete', handleCustomLoginEvent);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [instance, updateAuthState]);

    const logout = useCallback(() => {
        document.cookie = "userEmail=; path=/; max-age=0; SameSite=Lax";
        // Ensure localStorage is cleaned up on logout as well
        localStorage.removeItem('loginRedirectIntent');
        localStorage.removeItem('returnToFormAfterLogin');
        
        instance.logoutRedirect({
            postLogoutRedirectUri: window.location.origin + '/', // Redirect to homepage
        }).catch((e) => console.error("Logout failed:", e));
    }, [instance]);

    const acquireTokenSilent = useCallback(async (scopes: string[]): Promise<string | null> => {
        if (!authState.activeAccount) return null;
        try {
            const response = await instance.acquireTokenSilent({
                scopes,
                account: authState.activeAccount
            });
            return response.accessToken;
        } catch (error) {
            console.warn("Silent token acquisition failed (may require interaction):", error);
            return null;
        }
    }, [instance, authState.activeAccount]);

    return (
        <UserContext.Provider value={{
            user: authState.user,
            isAuthenticated: authState.isAuthenticated,
            activeAccount: authState.activeAccount,
            logout,
            acquireTokenSilent,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider. Ensure your component tree is correctly wrapped.");
    }
    return context;
}; 