import styles from "./FormError.module.css"

export interface FormErrorProps {
    message: string | null;
}

export function FormError({ message }: FormErrorProps) {
    if (!message) return <></>

    return (
        <div className={styles.error}>{message}</div>
    )
}