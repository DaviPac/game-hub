import { GuessWord, randomWord, submitWord, wordExists } from "./useTermo";
import { useState } from "react";
import { TermoRow } from "./TermoRow";
import { FormError } from "../../components/Messages/FormErrror/FormError";

export function TermoPage() {
    const [finish, setFinish] = useState(false);
    const [word] = useState(randomWord());
    const [currentGuess, setCurrentGuess] = useState("");
    const [rows, setRows] = useState<GuessWord[]>([]);
    const [error, setError] = useState<string | null>(null);

    if (!word) return <p>Carregando...</p>;

    const handleEnviar = (e: React.FormEvent) => {
        e.preventDefault();
        if (finish) return;
        if (currentGuess.length !== word.length) return;
        if (!wordExists(currentGuess)) {
            setError(`A palavra ${currentGuess} não existe.`);
            console.log(JSON.stringify(currentGuess));
            console.log(JSON.stringify(word));
            return;
        }
        setError(null);
        const guess = submitWord(currentGuess, word);
        setRows([...rows, guess]);
        setCurrentGuess("");
        if (guess.isCorrect) setFinish(true);
    }

    return (
        <div className="termo">
            <form onSubmit={handleEnviar}>
                <FormError message={error}></FormError>
                {rows.map((row, index) => (
                    <TermoRow key={index} letters={row.letters}/>
                ))}
                <input
                    type="text"
                    value={currentGuess}
                    onChange={(e) => {if (e.target.value.length <= word.length) setCurrentGuess(e.target.value.toUpperCase())}}
                />
                <br />
                <br />
                <button>Enviar</button>
            </form>
        </div>
    );
}