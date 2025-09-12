import { GuessLetter } from "../Termo";
import { TermoTile } from "./TermoTile";

interface TermoRowProps {
  letters?: GuessLetter[];
}

export function TermoRow({ letters }: TermoRowProps) {
    return (
        <div className="termo-row" style={{ display: "flex", gap: "4px" }}>
            {letters?.map((guessLetter, index) => (
                <TermoTile
                    key={index}
                    letter={guessLetter.letter}
                    location={guessLetter.location}
                />
            ))}
        </div>
    );
}