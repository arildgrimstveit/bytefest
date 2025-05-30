import { ReactNode } from "react";
import { AccountInfo } from "@azure/msal-browser";

export interface User {
  name: string;
  email: string;
  phoneNumber?: string;
  department?: string;
  officeLocation?: string;
}

export interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  activeAccount: AccountInfo | null;
  isAuthStatusKnown: boolean;
  logout: () => void;
  acquireTokenSilent: (scopes: string[]) => Promise<string | null>;
}

export interface UserProviderProps {
  children: ReactNode;
}
