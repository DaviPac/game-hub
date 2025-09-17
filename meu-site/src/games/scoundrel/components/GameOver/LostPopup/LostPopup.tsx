import Popup from "../../../../../components/Popup/Popup";
import { ScoundrelGame } from "../../../ScoundrelGame";

export interface LostPopupProps {
    gameState: ScoundrelGame;
    setGameState: React.Dispatch<React.SetStateAction<ScoundrelGame>>;
}

function LostPopup({ gameState, setGameState }: LostPopupProps) {
    return (
        <Popup isOpen={gameState.lost} onClose={() => {
            setGameState(new ScoundrelGame());
        }}>
            <div>
                Você perdeu!!!
            </div>
        </Popup>
    )
}

export default LostPopup;