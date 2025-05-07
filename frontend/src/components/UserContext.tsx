'use client';

import { useMsal } from "@azure/msal-react";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { EventType, AccountInfo } from "@azure/msal-browser";
import { User, UserContextType, UserProviderProps } from "@/types/user";

// Create the context for user authentication state
const UserContext = createContext<UserContextType | undefined>(undefined);


// Manages user info, authentication status, and MSAL interactions.
export const UserProvider = ({ children }: UserProviderProps) => {
    const { instance } = useMsal();
    const [authState, setAuthState] = useState<{
        isAuthenticated: boolean;
        user: User | null;
        activeAccount: AccountInfo | null;
    }>({
        isAuthenticated: false,
        user: null,
        activeAccount: null
    });

    // Updates the authState based on the current MSAL active account
    const updateAuthState = useCallback(() => {
        const activeAccount = instance.getActiveAccount();
        const currentEmail = authState.user?.email;
        const currentIsAuth = authState.isAuthenticated;

        if (activeAccount) {
            const newEmail = activeAccount.username;
            // Only update if account or email has actually changed, or if not currently authenticated
            if (authState.activeAccount?.homeAccountId !== activeAccount.homeAccountId || currentEmail !== newEmail || !currentIsAuth) {
                const userDetails = {
                    name: activeAccount.name || "",
                    email: newEmail
                };
                document.cookie = `userEmail=${encodeURIComponent(userDetails.email)}; path=/; max-age=86400; SameSite=Lax`;
                setAuthState({
                    isAuthenticated: true,
                    user: userDetails,
                    activeAccount
                });
            }
        } else {
            // Only update if state was previously authenticated
            if (currentIsAuth) {
                document.cookie = "userEmail=; path=/; max-age=0; SameSite=Lax";
                setAuthState({
                    isAuthenticated: false,
                    user: null,
                    activeAccount: null
                });
            }
        }
    }, [instance, authState.activeAccount, authState.isAuthenticated, authState.user?.email]);

    // Effect to initialize auth state and set up MSAL event listeners
    useEffect(() => {
        updateAuthState();

        // Listen for various MSAL events to keep auth state synced
        const callbackId = instance.addEventCallback(event => {
            if (
                event.eventType === EventType.LOGIN_SUCCESS ||
                event.eventType === EventType.LOGIN_FAILURE ||
                event.eventType === EventType.LOGOUT_SUCCESS ||
                event.eventType === EventType.LOGOUT_FAILURE ||
                event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
                event.eventType === EventType.ACQUIRE_TOKEN_FAILURE ||
                event.eventType === EventType.SSO_SILENT_SUCCESS ||
                event.eventType === EventType.SSO_SILENT_FAILURE ||
                event.eventType === EventType.HANDLE_REDIRECT_END
            ) {
                updateAuthState();
            }
        });

        // Listen for custom event dispatched after specific login flows
        const handleCustomLoginEvent = () => {
            updateAuthState();
        };
        // Listen for browser tab visibility changes to re-check auth state
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                updateAuthState();
            }
        };

        window.addEventListener('msal:login:complete', handleCustomLoginEvent);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup listeners on component unmount
        return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
            window.removeEventListener('msal:login:complete', handleCustomLoginEvent);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [instance, updateAuthState]);

    // Function to initiate the MSAL logout redirect flow
    const logout = useCallback(() => {
        document.cookie = "userEmail=; path=/; max-age=0; SameSite=Lax"; // Ensure cookie is cleared immediately
        instance.logoutRedirect().catch((e) => console.error("Logout failed:", e));
    }, [instance]);

    // Function to acquire a token silently for background API calls
    const acquireTokenSilent = useCallback(async (scopes: string[]): Promise<string | null> => {
        if (!authState.activeAccount) return null;
        try {
            const response = await instance.acquireTokenSilent({
                scopes,
                account: authState.activeAccount
            });
            return response.accessToken;
        } catch (error) {
            // This can happen if user interaction is required, e.g., consent or MFA
            // It's not necessarily a critical error for all silent token calls.
            console.warn("Silent token acquisition failed (may require interaction):", error);
            return null;
        }
    }, [instance, authState.activeAccount]);

    // Provide the authentication state and actions to consuming components
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

// Custom hook to easily consume the UserContext. Throws an error if used outside of a UserProvider.
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        // This error is critical as it indicates a fundamental setup problem.
        throw new Error("useUser must be used within a UserProvider. Ensure your component tree is correctly wrapped.");
    }
    return context;
}; 