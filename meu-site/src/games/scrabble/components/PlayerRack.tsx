import type ScrabbleGame from "../ScrabbleGame";
import styles from "./PlayerRack.module.css"

export interface PlayerRackProps {
    gameState: ScrabbleGame;
}

function PlayerRack({ gameState }: PlayerRackProps) {
    return (
        <div className={styles.rack}>
            {gameState.playerRack.map((letra, idx) => (
                <button key={idx} className={styles.tile} onClick={() => gameState.selectedTile = letra }>{letra.char}</button>
            ))}
        </div>
    );
}

export default PlayerRack;