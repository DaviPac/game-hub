import { useEffect, useState } from "react";
import ScrabbleBoard from "./components/ScrabbleBoard";
import ScrabbleGame from "./ScrabbleGame";
import PlayerRack from "./components/PlayerRack";

function ScrabblePage() {
    const [scrabbleGame, setScrabbleGame] = useState(() => new ScrabbleGame());
    useEffect(() => {
        ScrabbleGame.load(1).then((game) => {
            game.setSelf = (gameState) => setScrabbleGame(gameState);
            game.update();
        });
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