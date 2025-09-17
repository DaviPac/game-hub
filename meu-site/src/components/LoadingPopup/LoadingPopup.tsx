import Popup from "../Popup/Popup";
import styles from "./LoadingPopup.module.css";

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
            </div>
        </Popup>
    )
}

export default LoadingPopup;