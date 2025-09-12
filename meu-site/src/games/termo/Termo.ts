import wordslist from "./words.txt?raw";

export enum LetterLocation {
    Correct,
    Wrong,
    Missplaced
}

export class GuessLetter {
    public letter: string;
    public location: LetterLocation

    private constructor(letter: string, location: LetterLocation) {
        this.letter = letter;
        this.location = location
    }

    public static correct(letter: string) {
        return new GuessLetter(letter, LetterLocation.Correct);
    }

    public static wrong(letter: string) {
        return new GuessLetter(letter, LetterLocation.Wrong);
    }

    public static missplaced(letter: string) {
        return new GuessLetter(letter, LetterLocation.Missplaced);
    }

    public isCorrect() {
        return this.location === LetterLocation.Correct;
    }

    public isWrong() {
        return this.location === LetterLocation.Wrong;
    }

    public isMissplaced() {
        return this.location === LetterLocation.Missplaced;
    }
}

export class GuessWord {
    public letters: GuessLetter[];
    public isCorrect: boolean;

    public constructor(guess: string, answer: string) {
        const answerChars = answer.split("");
        const guessChars = guess.split("");
        const letters: GuessLetter[] = [];
        let correctGuesses = 0;

        const usedIndices: boolean[] = new Array(answerChars.length).fill(false);

        guessChars.forEach((char, index) => {
            if (char === answerChars[index]) {
                letters.push(GuessLetter.correct(char));
                usedIndices[index] = true;
                correctGuesses++;
            }
            else letters.push(null!)
        });

        guessChars.forEach((char, index) => {
            if (letters[index]) return;
            const foundIndex = answerChars.findIndex((ch, idx) => ch === char && !usedIndices[idx]);
            if (foundIndex !== -1) {
                letters[index] = GuessLetter.missplaced(char);
                usedIndices[foundIndex] = true;
            }
            else letters[index] = GuessLetter.wrong(char);
        });

        this.letters = letters;
        this.isCorrect = (correctGuesses === answer.length);
    }
}

export function loadWordList() {
    return wordslist
        .split(/\r?\n/)
        .map(w => w.trim())
        .filter(Boolean)
        .map(w => w.toUpperCase());
}

export function randomWord() {
    const words = loadWordList();
    return words[Math.floor(Math.random() * words.length)];
}

export function submitWord(word: string, answer: string) {
    const guess = new GuessWord(word.toUpperCase(), answer);
    guess.letters.forEach(letter => {
        if (letter.isCorrect()) console.log(`${letter.letter} is correct`);
        else if (letter.isMissplaced()) console.log(`${letter.letter} is missplaced`);
        else console.log(`${letter.letter} is wrong`);
    });
    return guess;
}

export function wordExists(word: string) {
    const words = loadWordList();
    return words.some(w => w === word);
}