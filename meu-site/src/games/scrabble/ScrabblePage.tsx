import { useEffect, useState } from "react";
import ScrabbleBoard from "./components/ScrabbleBoard";
import ScrabbleGame from "./ScrabbleGame";
import PlayerRack from "./components/PlayerRack";

function ScrabblePage() {
    const [scrabbleGame, setScrabbleGame] = useState(() => new ScrabbleGame());
    useEffect(() => {
            scrabbleGame.setSelf = (gameState) => setScrabbleGame(gameState);
            scrabbleGame.update();
    }, []);
    return (
        <div>
            <ScrabbleBoard scrabbleGame={scrabbleGame} />
            <button onClick={() => scrabbleGame.clear() }>Limpar</button>
            <button onClick={() => scrabbleGame.confirm() }>Confirmar</button>
            <PlayerRack gameState={scrabbleGame} />
            <span>{scrabbleGame.statusMessage}</span>
            <span>{scrabbleGame.playerScore}</span>
        </div>
    )
}

export default ScrabblePage;