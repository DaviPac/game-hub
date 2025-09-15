import type { ScoundrelGame } from "../../Scoundrel";
import { Carta } from "../Carta/Carta";
import { Naipe } from "../../models/GameCard";
import styles from "./Dungeon.module.css"

export interface DungeonProps {
    gameState: ScoundrelGame;
    setGameState: React.Dispatch<React.SetStateAction<ScoundrelGame>>;
}

function Dungeon({ gameState, setGameState }: DungeonProps) {
    return (
        <div className={styles.container}>
            {gameState.dungeon.map((carta, idx) => (
                <div
                    key={idx}
                    className={`${styles.card} ${
                        carta.naipe === Naipe.Copas ? styles.heal :
                        carta.naipe === Naipe.Espadas || carta.naipe === Naipe.Paus ? styles.monster :
                        styles.weapon
                    }`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    onClick={() => {
                        gameState.useCard(idx);
                        setGameState(gameState.update());
                    }}
                >
                    <Carta carta={carta} hover={true} />
                </div>
            ))}
        </div>
    )
}

export default Dungeon;