import styles from "./HpBar.module.css";

export interface HpBarProps {
    hp: number;
    maxHp: number;
}

function HpBar({ hp, maxHp }: HpBarProps) {
    return (
        <div className={styles.container}>
            <div className={styles.hpBar}>
                <div
                    className={styles.hpFill}
                    style={{ width: `${(hp / maxHp) * 100}%` }}
                />
                <span>HP: {hp}/{maxHp}</span>
            </div>
        </div>
    )
}

export default HpBar;