import { useEffect } from "react";
import { ApiHealth, usePingInterval } from "../../services/HealthService";
import styles from "./HealthDisplay.module.css";

interface HealthDisplayProps {
  statusRef?: React.RefObject<ApiHealth>; // torna opcional
}

function HealthDisplay({ statusRef }: HealthDisplayProps) {
    const health = usePingInterval(10000);
    
    useEffect(() => {
        if (statusRef) {
            statusRef.current = health
        }
    }, [health, statusRef]);

    return (
        <div className={styles.container}>
            <span className={health === ApiHealth.online ? styles.online
                : health === ApiHealth.offline ? styles.offline
                : styles.pending
            }></span>
            <span>API {health.toString()}</span>
        </div>
    );
}

export default HealthDisplay;