import Popup from "./Popup";
import styles from "./LoadingPopup.module.css";
import LoadingGame from "../games/loadingGame/LoadingGame";

export interface LoadingPopupProps {
    isLoading: boolean;
    message?: string;
}

function LoadingPopup({ isLoading, message = "Carregando..." }: LoadingPopupProps) {
    return (
        <Popup isOpen={isLoading} closable={false}>
            <div className={styles.container}>
                <div className={styles.spinner}></div>
                <p className={styles.message}>{message}</p>
                {false && (<LoadingGame />)}
            </div>
        </Popup>
    )
}

export default LoadingPopup;