import { useRef, useState } from "react";
import styles from "./AuthPage.module.css";
import { register } from "../services/AuthService";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import HealthDisplay from "../components/HealthDisplay/HealthDisplay";
import SuccessMessage from "../components/Messages/SuccessMessage/SuccessMessage";
import { FormError } from "../components/Messages/FormErrror/FormError";
import { ApiHealth } from "../services/HealthService";
import LoadingPopup from "../components/LoadingPopup/LoadingPopup";

export function Auth() {
    const login = useAuth()?.login;
    if (!login) return<>ERRO</>;
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const apiStatus = useRef(ApiHealth.starting);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        setSuccessMessage("");
        setIsLoading(apiStatus.current !== ApiHealth.online);
        try {
            if (isRegister && password !== confirmPassword) {
                setError("As senhas não conferem!");
                return;
            }
            if (isRegister) {
                const result = await register(name, username, password);
                if (!result) {
                    setError("Já existe um usuário com este email");
                    return;
                }
                setSuccessMessage("Conta criada com sucesso!");
            }
            await login(username, password);
            navigate(from, { replace: true });
        }
        catch (error) {
            if (isRegister) setIsRegister(false);
            else if (error instanceof Error) setError(error.message || "Email ou senha incorretos");
            else setError("Email ou senha incorretos");
        }
    }

    return (
        <>
            <LoadingPopup isLoading={ isLoading }/>
            <div className={styles.auth}>
                <h2>Bem vindo ao hub de jogos! Faça login para continuar.</h2>
                <form onSubmit={handleSubmit}>
                    <FormError message={error} />
                    <SuccessMessage message={successMessage} />
                    {isRegister && (
                        <input
                            type="text"
                            value={name}
                            className="email"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}
                    <input
                        type="text"
                        value={username}
                        className="email"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        value={password}
                        className="password"
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {isRegister && (
                        <input
                            type="password"
                            value={confirmPassword}
                            className="confirmPassword"
                            placeholder="Confirmar senha"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    )}
                    <button>
                        {isRegister ? "Registrar" : "Entrar"}
                    </button>
                </form>
                <button onClick={() => {
                    setError("");
                    setIsRegister(!isRegister);
                }}>
                    {isRegister ? "Já possui conta? Faça login!" : "Não tem conta? Registre-se!"}
                </button>
                <HealthDisplay statusRef={apiStatus}/>
            </div>
        </>
    );
}