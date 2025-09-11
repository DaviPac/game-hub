import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export function HomePage() {
    const authContext = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        authContext?.logout();
        navigate("/login");
    }

    return (
        <div>
            <h1>Bem-vindo à Página Principal, {authContext?.user?.username}!</h1>
            <p>Seu login foi um sucesso.</p>
        </div>
    );
}