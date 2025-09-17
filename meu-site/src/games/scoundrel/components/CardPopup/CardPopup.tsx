import Popup from "../../../../components/Popup/Popup";
import type { ScoundrelGame } from "../../ScoundrelGame";
import { Carta } from "../Carta/Carta"
import styles from "./CardPopup.module.css";

export interface CardPopupProps {
    gameState: ScoundrelGame;
    setGameState: React.Dispatch<React.SetStateAction<ScoundrelGame>>;
}

function CardPopup({ gameState, setGameState }: CardPopupProps) {
    return (
        <Popup isOpen={!!gameState.selectedCard} onClose={() => {gameState.selectedCard = null; setGameState(gameState.update())}}>
            <div className={styles.container}>
                <Carta carta={gameState.selectedCard!}/>
                <p className={styles.description}>descrição</p>
            </div>
        </Popup>
    )
}

export default CardPopup;