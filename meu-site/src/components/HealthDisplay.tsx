import { ApiHealth, usePingInterval } from "../services/HealthService";
import styles from "./HealthDisplay.module.css";

function HealthDisplay() {
    const health = usePingInterval(10000);

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