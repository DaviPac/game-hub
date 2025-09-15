import { useState } from "react";
import { ScoundrelGame } from "../Scoundrel";
import styles from "./ScoundrelUI.module.css";
import Dungeon from "./Dungeon/Dungeon";
import HpBar from "./HpBar/HpBar";
import Weapon from "./Weapon/Weapon";
import Actions from "./Actions/Actions";

function ScoundrelUI() {
    const [gameState, setGameState] = useState<ScoundrelGame>(new ScoundrelGame());

    return (
        <div className={styles.scoundrelContainer}>
            <HpBar hp={gameState.hp} maxHp={ScoundrelGame.maxHp} />

            <Dungeon gameState={gameState} setGameState={setGameState} />

            <Weapon gameState={gameState} />

            <Actions gameState={gameState} setGameState={setGameState} />
            
        </div>
    );
}

export default ScoundrelUI;