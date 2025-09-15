import type { ScoundrelGame } from "../../Scoundrel";
import styles from "./Actions.module.css"

export interface ActionsProps {
    gameState: ScoundrelGame;
    setGameState: React.Dispatch<React.SetStateAction<ScoundrelGame>>;
}

function Actions({ gameState, setGameState }: ActionsProps) {
    return (
        <div className={styles.container}>
                <button
                    className={gameState.canRun ? styles.fleeButton : styles.staleButton}
                    onClick={() => {
                        if (gameState.canRun) {
                            gameState.flee();
                            setGameState(gameState.update());
                        }
                    }}
                >
                    Fugir
                </button>
        </div>
    )
}

export default Actions;