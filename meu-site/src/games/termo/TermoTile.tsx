import { LetterLocation } from "./useTermo";
import styles from "./TermoTile.module.css";

interface TermoTileProps {
  letter: string;
  location: LetterLocation;
}

export function TermoTile({ letter, location }: TermoTileProps ) {
    return (
        <div className={`${styles.tile} ${styles[LetterLocation[location].toLowerCase()]}`}>
            {letter}
        </div>
    )
}