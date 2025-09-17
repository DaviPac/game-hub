import { useState } from "react";
import { ScoundrelGame } from "../ScoundrelGame";
import styles from "./ScoundrelUI.module.css";
import Dungeon from "./Dungeon/Dungeon";
import HpBar from "./HpBar/HpBar";
import Weapon from "./Weapon/Weapon";
import Actions from "./Actions/Actions";
import WonPopup from "./GameOver/WonPopup/WonPopup";
import LostPopup from "./GameOver/LostPopup/LostPopup";

function ScoundrelUI() {
    const [gameState, setGameState] = useState<ScoundrelGame>(new ScoundrelGame());
    const [useWeapon, setUseWeapon] = useState(true);

    return !gameState.started ? (
        <div className={styles.scoundrelContainer}>
            <h1 className={styles.title}>⚔️ Scoundrel</h1>
            <p className={styles.subtitle}>
                Sobreviva à masmorra. Equipe armas, lute contra monstros e use cura com sabedoria!
            </p>
            <button 
            className={styles.startButton}
            onClick={() => {
                gameState.init();
                setGameState(gameState.update());
            }}
            >
                ▶ Começar
            </button>
        </div>
    ) :
    (
        <div className={styles.scoundrelContainer}>
            <WonPopup gameState={gameState} setGameState={setGameState} />
            <LostPopup gameState={gameState} setGameState={setGameState} />
            {gameState.deck.length() + gameState.dungeon.length} / {gameState.maxCards}
            <HpBar hp={gameState.hp} maxHp={ScoundrelGame.maxHp} />

            <Dungeon gameState={gameState} setGameState={setGameState} useWeapon={useWeapon} />

            {useWeapon && <Weapon gameState={gameState} />}

            CardPopup

            <Actions gameState={gameState} setGameState={setGameState} />
            <button onClick={() => setUseWeapon(!useWeapon)}>toggleWeapon</button>
            
        </div>
    );
}

export default ScoundrelUI;