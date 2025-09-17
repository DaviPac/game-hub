import ScrabbleGame from "../ScrabbleGame";
import ScrabbleTile from "./ScrabbleTile";
import styles from "./ScrabbleBoard.module.css"

export interface ScrabbleBoardProps {
    scrabbleGame: ScrabbleGame;
}

function ScrabbleBoard({ scrabbleGame }: ScrabbleBoardProps) {
    return (
        <div className={styles.board}>
            {scrabbleGame.boardMultipliers.map((row, rowIdx) => 
                row.map((mult, colIdx) => (
                    (!scrabbleGame.findPreview(rowIdx, colIdx) && (
                        <ScrabbleTile key={`${rowIdx} - ${colIdx}`} mult={mult} letra={scrabbleGame.board[rowIdx][colIdx]} onClick={() => {
                            scrabbleGame.placeTile(rowIdx, colIdx);
                        }}/>) || (
                        <ScrabbleTile key={`${rowIdx} - ${colIdx}`} mult={mult} letra={
                            scrabbleGame.findPreview(rowIdx, colIdx)?.letra!
                        } onClick={() => scrabbleGame.removeTile(rowIdx, colIdx) } preview={true}/>))
                ))
        )}
        </div>
    )
}

export default ScrabbleBoard;