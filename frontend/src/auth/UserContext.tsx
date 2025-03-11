import { useMsal } from "@azure/msal-react";
import React, { createContext, ReactNode, useContext } from "react";

interface User {
    name: string;
    email: string;
    avatar: string;
}

interface UserContextType {
    user: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = (children: ReactNode) => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();
    const user = activeAccount
        ? {
            name: activeAccount.name || "",
            email: activeAccount.username,
            avatar: "",
        }
        : null;

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};