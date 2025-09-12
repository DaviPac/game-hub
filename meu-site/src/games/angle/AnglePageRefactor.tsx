import { useState } from "react";
import AngleDisplay from "./AngleDisplay";
import { randomAngle } from "./useAngle";
import AngleGuessRow from "./AngleGuessRow";
import { FormError } from "../../components/Messages/FormErrror/FormError";

function AnglePageRefactor() {

    const [angleProps] = useState(randomAngle());

    const [currentGuess, setCurrentGuess] = useState<number | null>(null);

    const [guesses, setGuesses] = useState<number[]>([]);

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (currentGuess === null) return setError("Digite um número entre 0 - 360.");
        if (guesses.includes(currentGuess)) return setError(`Você já tentou ${currentGuess}!`);
        if (currentGuess > 360 || currentGuess < 0) return setError("Digite um número entre 0 - 360.");
        if (currentGuess) setGuesses([...guesses, currentGuess]);
        setCurrentGuess(null);
    }

    return (
        <div className="anglePage">
            <AngleDisplay
                startAngle={angleProps.startAngle}
                endAngle={angleProps.endAngle}
                showAngle={angleProps.showAngle}
            />
            <form onSubmit={handleSubmit} className="angleForm">
                <FormError message={error}></FormError>
                <input 
                    type="number"
                    value={currentGuess ?? ''}
                    onChange={(e) => setCurrentGuess(e.target.value === '' ? null : parseInt(e.target.value))}
                />
                {guesses?.map((guess) => (
                    <AngleGuessRow
                        key={guess}
                        guess={guess}
                        targetAngle={(angleProps.endAngle - angleProps.startAngle + 360) % 360}
                    />
                ))}
                <button>
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default AnglePageRefactor;