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
        isAuthStatusKnown: boolean;
    }>({
        isAuthenticated: false,
        user: null,
        activeAccount: null,
        isAuthStatusKnown: false,
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
    const updateAuthState = useCallback(() => {
        const msalActiveAccount = instance.getActiveAccount();

        setAuthState(currentInternalState => {
            let newIsAuthenticated = currentInternalState.isAuthenticated;
            let newUser = currentInternalState.user;
            let newActiveAccount = currentInternalState.activeAccount;
            let needsRedirect = false;
            let redirectPath = "";

            if (msalActiveAccount) {
                if (!currentInternalState.isAuthenticated || currentInternalState.activeAccount?.homeAccountId !== msalActiveAccount.homeAccountId) {
                    newIsAuthenticated = true;
                    newActiveAccount = msalActiveAccount;
                    // Set basic user info; graph fetch effect will update details if needed
                    newUser = { name: msalActiveAccount.name || "", email: msalActiveAccount.username, phoneNumber: "", department: "", officeLocation: "" };

                    if (!currentInternalState.isAuthenticated) { // Fresh login
                        const loginIntent = localStorage.getItem('loginRedirectIntent');
                        const redirectTo = localStorage.getItem('loginRedirectTo');
                        
                        if (loginIntent) {
                            localStorage.removeItem('loginRedirectIntent');
                            if (redirectTo) {
                                localStorage.removeItem('loginRedirectTo');
                                redirectPath = redirectTo;
                            } else if (loginIntent === 'program') {
                                redirectPath = '/program';
                            } else if (loginIntent === 'paamelding') {
                                redirectPath = '/paamelding';
                            } else if (loginIntent === 'talkFeedback') {
                                redirectPath = '/'; // Fallback if no redirectTo
                            } else {
                                redirectPath = '/';
                            }
                            needsRedirect = true;
                        }
                    }
                }
            } else { // No MSAL active account
                if (currentInternalState.isAuthenticated) {
                    document.cookie = "userEmail=; path=/; max-age=0; SameSite=Lax";
                    newIsAuthenticated = false;
                    newUser = null;
                    newActiveAccount = null;
                }
            }

            const finalState = {
                isAuthenticated: newIsAuthenticated,
                user: newUser,
                activeAccount: newActiveAccount,
                isAuthStatusKnown: true
            };
            
            if (
                currentInternalState.isAuthenticated === finalState.isAuthenticated &&
                currentInternalState.activeAccount?.homeAccountId === finalState.activeAccount?.homeAccountId &&
                currentInternalState.user?.email === finalState.user?.email && // Basic check
                currentInternalState.isAuthStatusKnown // If it was already known and other critical parts didn't change
            ) {
                return currentInternalState;
            }
            
            if (needsRedirect && redirectPath) {
                 Promise.resolve().then(() => router.push(redirectPath));
            }
            return finalState;
        });
    }, [instance, router]);

    // Effect for fetching graph data when activeAccount changes or user details are missing
    useEffect(() => {
        const account = authState.activeAccount;
        if (account && authState.isAuthenticated) {
            if (!authState.user || authState.user.email !== account.username || !authState.user.department /* check if full details are missing */) {
                fetchUserDetailsFromGraph(account).then(userDetails => {
                    if (userDetails) {
                        document.cookie = `userEmail=${encodeURIComponent(userDetails.email)}; path=/; max-age=86400; SameSite=Lax`;
                        setAuthState(s => {
                            // Only update if user is different to prevent loops if graph returns same object by chance
                            if (s.user?.email !== userDetails.email || s.user?.name !== userDetails.name) {
                                return { ...s, user: userDetails, isAuthStatusKnown: true };
                            }
                            return s; // No actual change in user details from graph needed
                        });
                    }
                }).catch(error => {
                    console.error("[UserContext] Error in graph fetch useEffect:", error);
                });
            }
        }
    }, [authState.activeAccount, authState.isAuthenticated, authState.user, fetchUserDetailsFromGraph]);

    // Main effect to initialize auth state and set up MSAL event listeners
    useEffect(() => {
        updateAuthState(); 

        const callbackId = instance.addEventCallback(event => {
            if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.LOGOUT_SUCCESS || event.eventType === EventType.HANDLE_REDIRECT_END) {
                updateAuthState();
            }
        });
        const handleCustomLoginEvent = () => { updateAuthState(); };
        const handleVisibilityChange = () => { 
            if (document.visibilityState === 'visible') { 
                updateAuthState(); 
            }
        };
        window.addEventListener('msal:login:complete', handleCustomLoginEvent);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            if (callbackId) instance.removeEventCallback(callbackId);
            window.removeEventListener('msal:login:complete', handleCustomLoginEvent);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [instance, updateAuthState]); // updateAuthState is now stable

    const logout = useCallback(() => {
        document.cookie = "userEmail=; path=/; max-age=0; SameSite=Lax";
        localStorage.removeItem('loginRedirectIntent');
        localStorage.removeItem('returnToFormAfterLogin');
        instance.logoutRedirect({
            postLogoutRedirectUri: window.location.origin + '/',
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
            isAuthStatusKnown: authState.isAuthStatusKnown,
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