import { Navigate, useLocation } from "react-router";
import { useAuth, type AuthProviderProps } from "../context/AuthContext";

export function ProtectedRoute({ children }: AuthProviderProps) {
    const user = useAuth()?.user;
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return children;
}