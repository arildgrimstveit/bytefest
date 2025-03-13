import { ReactNode } from "react";
import { AccountInfo } from "@azure/msal-browser";

/**
 * User interface representing the authenticated user information
 */
export interface User {
  name: string;
  email: string;
  // Note: We're using UI Avatars for profile pictures in B2C tenants
  // instead of the avatar property
}

/**
 * Context type for user authentication state and methods
 */
export interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
  getProfilePicture: () => Promise<string | null>;
  acquireTokenSilent: (scopes: string[]) => Promise<string | null>;
  activeAccount: AccountInfo | null;
  /** Generated avatar URL using UI Avatars service for B2C tenants */
  profilePic: string | null;
}

export interface UserProviderProps {
  children: ReactNode;
}
