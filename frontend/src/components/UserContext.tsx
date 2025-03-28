'use client';

import { useMsal } from "@azure/msal-react";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { EventType, AccountInfo } from "@azure/msal-browser";
import { User, UserContextType, UserProviderProps } from "@/types/user";

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Generates an avatar URL for a user based on their name
 * @param name The user's display name
 * @param type The type of avatar to generate ('circle' or 'profile')
 * @returns A URL to a generated avatar from UI Avatars
 */
const generateAvatarUrl = (name: string, type: 'circle' | 'profile' = 'profile'): string => {
    // Split name into parts and handle LASTNAME Firstname format
    const parts = name.split(' ');
    const lastName = parts[0]; // First part is last name
    const firstName = parts[1] || ''; // Second part is first name, or empty if not present
    
    if (type === 'circle') {
        return `data:image/svg+xml;base64,${Buffer.from(`
            <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                <rect width="256" height="256" rx="128" fill="#2A1449"/>
                <text x="128" y="140" dominant-baseline="middle" text-anchor="middle" 
                      fill="white" font-family="Arial" font-size="120" font-weight="bold">
                    ${lastName.charAt(0).toUpperCase()}
                </text>
            </svg>
        `).toString('base64')}`;
    } else {
        // For the profile display, use initials (first letter of first name and last name)
        const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
        return `data:image/svg+xml;base64,${Buffer.from(`
            <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                <rect width="256" height="256" fill="#2A1449"/>
                <text x="128" y="140" dominant-baseline="middle" text-anchor="middle" 
                      fill="white" font-family="Arial" font-size="90" font-weight="normal">
                    ${initials}
                </text>
            </svg>
        `).toString('base64')}`;
    }
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
            const user = {
                name: activeAccount.name || "",
                email: activeAccount.username
            };
            
            setAuthState({
                isAuthenticated: true,
                user,
                activeAccount
            });
            
            // Fetch avatar for B2C tenants
            if (activeAccount.name) {
                const name = activeAccount.name;
                // Split name and get first letter of last name
                const lastName = name.split(' ')[0];
                const firstLetter = lastName.charAt(0).toUpperCase();
                fetch(`https://ui-avatars.com/api/?name=${encodeURIComponent(firstLetter)}&background=2A1449&color=fff&size=256&bold=false`)
                    .then(response => response.blob())
                    .then(blob => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setProfilePic(reader.result as string);
                        };
                        reader.readAsDataURL(blob);
                    })
                    .catch(error => {
                        console.error("Error fetching avatar:", error);
                        // Fallback to generated avatar if fetch fails
                        const avatarUrl = generateAvatarUrl(name, 'circle');
                        setProfilePic(avatarUrl);
                    });
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
    const getProfilePicture = useCallback(async (type: 'circle' | 'profile' = 'profile'): Promise<string | null> => {
        try {
            // For B2C tenants, generate avatar from name
            if (authState.user?.name) {
                return generateAvatarUrl(authState.user.name, type);
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