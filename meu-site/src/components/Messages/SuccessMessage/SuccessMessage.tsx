import styles from "./SuccessMessage.module.css"

export interface SuccessMessageProps {
    message: string | null;
}

function SuccessMessage({ message }: SuccessMessageProps) {
    if (!message) return <></>

    return (
        <div className={styles.success}>{message}</div>
    )
}

export default SuccessMessage;