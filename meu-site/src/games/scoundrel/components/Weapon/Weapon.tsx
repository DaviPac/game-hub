import { ScoundrelGame } from "../../ScoundrelGame"
import { Carta } from "../Carta/Carta"
import styles from "./Weapon.module.css"

export interface WeaponProps {
    gameState: ScoundrelGame;
}

function Weapon({ gameState }: WeaponProps) {
    return (
        <div className={styles.fixedWeapon}>
                <span>⚔️</span>
                {gameState.weapon && (
                    <>
                        <Carta className={styles.weaponCard} carta={gameState.weapon} />
                        {gameState.weaponLimit && (
                            <Carta className={styles.weaponLimitCard} carta={gameState.weaponLimit} />
                        )}
                    </>
                )}
        </div>
    )
}

export default Weapon;