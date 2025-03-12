'use client';

import { useMsal } from "@azure/msal-react";
import React, { createContext, ReactNode, useContext, useState, useEffect, useCallback } from "react";
import { EventType } from "@azure/msal-browser";

interface User {
    name: string;
    email: string;
    avatar: string;
}

interface UserContextType {
    user: User | null;
    isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const { instance } = useMsal();
    const [authState, setAuthState] = useState<{
        isAuthenticated: boolean;
        user: User | null;
    }>({
        isAuthenticated: false,
        user: null
    });
    
    // Update authentication state based on MSAL - wrapped in useCallback
    const updateAuthState = useCallback(() => {
        const activeAccount = instance.getActiveAccount();
        
        console.log("UserContext: updateAuthState called, active account:", activeAccount);
        
        if (activeAccount) {
            setAuthState({
                isAuthenticated: true,
                user: {
                    name: activeAccount.name || "",
                    email: activeAccount.username,
                    avatar: ""
                }
            });
        } else {
            setAuthState({
                isAuthenticated: false,
                user: null
            });
        }
    }, [instance]);
    
    // Initialize auth state and set up event listeners
    useEffect(() => {
        // Initial state update
        updateAuthState();
        
        // Set up event listeners for auth state changes - ensure we catch all relevant events
        const callbackId = instance.addEventCallback(event => {
            console.log("UserContext: MSAL event received:", event.eventType);
            
            // Handle all auth-related events that might change user state
            // Check for specific event types that affect authentication state
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
                console.log("UserContext: Processing authentication event");
                updateAuthState();
            }
        });
        
        // Listen for custom login event from bli-foredragsholder page
        const handleCustomLoginEvent = () => {
            console.log("UserContext: Received custom login event");
            updateAuthState();
        };
        
        // Listen for page visibility changes (when user returns to the app)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                console.log("UserContext: Page became visible, checking auth state");
                updateAuthState();
            }
        };
        
        window.addEventListener('msal:login:complete', handleCustomLoginEvent);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // Clean up event listeners
        return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
            window.removeEventListener('msal:login:complete', handleCustomLoginEvent);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [instance, updateAuthState]);

    return (
        <UserContext.Provider value={{ 
            user: authState.user, 
            isAuthenticated: authState.isAuthenticated 
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}; 