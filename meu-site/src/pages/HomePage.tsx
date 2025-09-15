import { useAuth } from "../context/AuthContext";

export function HomePage() {
    const authContext = useAuth();

    return (
        <div>
            <h1>Bem-vindo à Página Principal, {authContext?.user}!</h1>
            <p>Seu login foi um sucesso.</p>
        </div>
    );
}