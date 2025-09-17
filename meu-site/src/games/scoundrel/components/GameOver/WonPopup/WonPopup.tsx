import Popup from "../../../../../components/Popup/Popup";
import { ScoundrelGame } from "../../../ScoundrelGame";

export interface WonPopupProps {
    gameState: ScoundrelGame;
    setGameState: React.Dispatch<React.SetStateAction<ScoundrelGame>>;
}

function WonPopup({ gameState, setGameState }: WonPopupProps) {
    return (
        <Popup isOpen={gameState.won} onClose={() => {
            setGameState(new ScoundrelGame());}}>
            <div>
                Você venceu!!!
            </div>
        </Popup>
    )
}

export default WonPopup;