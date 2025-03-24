'use client';

import { useMsal } from "@azure/msal-react";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { EventType, AccountInfo } from "@azure/msal-browser";
import { User, UserContextType, UserProviderProps } from "@/types/user";

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Cache for generated avatars to avoid regeneration during session
 * Uses the user's email as the key and the avatar URL as the value
 */
const profilePictureCache = new Map<string, string | null>();

/**
 * Generates an avatar URL for a user based on their name
 * @param name The user's display name
 * @returns A URL to a generated avatar from UI Avatars
 */
const generateAvatarUrl = (name: string): string => {
    // Extract first letter of last name, or first letter of name if no space
    const lastInitial = name.includes(' ') ? name.split(' ').pop()?.[0] || name[0] : name[0];
    return `data:image/svg+xml;base64,${Buffer.from(`
        <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <rect width="256" height="256" fill="#2A1449"/>
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
                  fill="white" font-family="Arial" font-size="120" font-weight="bold">
                ${lastInitial.toUpperCase()}
            </text>
        </svg>
    `).toString('base64')}`;
};

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
    
    // Add profilePic state
    const [profilePic, setProfilePic] = useState<string | null>(null);
    
    // Update authentication state based on MSAL - wrapped in useCallback
    const updateAuthState = useCallback(() => {
        const activeAccount = instance.getActiveAccount();
        
        if (activeAccount) {
            setAuthState({
                isAuthenticated: true,
                user: {
                    name: activeAccount.name || "",
                    email: activeAccount.username
                },
                activeAccount
            });
            
            // Generate avatar immediately for B2C tenants
            if (activeAccount.name) {
                const avatarUrl = generateAvatarUrl(activeAccount.name);
                setProfilePic(avatarUrl);
                
                // Also cache it to avoid regeneration
                profilePictureCache.set(activeAccount.username, avatarUrl);
            }
        } else {
            setAuthState({
                isAuthenticated: false,
                user: null,
                activeAccount: null
            });
            setProfilePic(null);
        }
    }, [instance]);
    
    // Initialize auth state and set up event listeners
    useEffect(() => {
        // Initial state update
        updateAuthState();
        
        // Set up event listeners for auth state changes - ensure we catch all relevant events
        const callbackId = instance.addEventCallback(event => {
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
                updateAuthState();
            }
        });
        
        // Listen for custom login event from bli-foredragsholder page
        const handleCustomLoginEvent = () => {
            updateAuthState();
        };
        
        // Listen for page visibility changes (when user returns to the app)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
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

    // Logout function
    const logout = useCallback(() => {
        instance.logoutRedirect().catch(() => {
            // Silently handle logout errors
        });
    }, [instance]);

    // Acquire token silently for Graph API calls
    const acquireTokenSilent = useCallback(async (scopes: string[]): Promise<string | null> => {
        try {
            if (!authState.activeAccount) return null;
            
            const response = await instance.acquireTokenSilent({
                scopes,
                account: authState.activeAccount
            });
            
            return response.accessToken;
        } catch {
            // Silently fail and return null
            return null;
        }
    }, [instance, authState.activeAccount]);

    // Get user's profile picture with caching - simplified for B2C tenant
    const getProfilePicture = useCallback(async (): Promise<string | null> => {
        try {
            // Check cache first using email as key
            const cacheKey = authState.user?.email;
            if (cacheKey && profilePictureCache.has(cacheKey)) {
                const cachedPic = profilePictureCache.get(cacheKey) || null;
                setProfilePic(cachedPic);
                return cachedPic;
            }
            
            // For B2C tenants, generate avatar from name
            if (authState.user?.name) {
                const avatarUrl = generateAvatarUrl(authState.user.name);
                setProfilePic(avatarUrl);
                
                // Cache the result
                if (cacheKey) {
                    profilePictureCache.set(cacheKey, avatarUrl);
                }
                
                return avatarUrl;
            }
            
            return null;
        } catch (error) {
            console.error("Error generating avatar:", error);
            return null;
        }
    }, [authState.user]);

    return (
        <UserContext.Provider value={{ 
            user: authState.user, 
            isAuthenticated: authState.isAuthenticated,
            activeAccount: authState.activeAccount,
            logout,
            acquireTokenSilent,
            getProfilePicture,
            profilePic
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        console.error(
            "useUser hook was called outside of UserProvider. " +
            "Make sure your component is wrapped in UserProvider " +
            "or check your component hierarchy."
        );
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}; 