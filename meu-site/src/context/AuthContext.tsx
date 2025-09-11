import { createContext, useContext, useState, type ReactNode } from "react";
import { login as loginService } from "../services/AuthService";

export type AuthProviderProps = {
    children: ReactNode;
};

type AuthContextType = {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<string | null>(() => {
        try {
            const data = localStorage.getItem("userData");
            return data ? JSON.parse(data) : null;
        }
        catch {
            console.log("Erro ao carregar userData.");
            return null;
        }
    });

    const login = async (username: string, password: string) => {
        try {
            const userData = await loginService(username, password);
            if (!userData) throw Error;
            setUser(username);
            localStorage.setItem("userData", JSON.stringify(userData));
        }
        catch (error: unknown) {
            if (error instanceof Error) console.log("Erro no login: " + error.message);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("userData");
    }

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}