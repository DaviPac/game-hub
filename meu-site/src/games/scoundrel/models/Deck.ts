import { Naipe, GameCard } from "./GameCard";

export class Deck {
    cards: GameCard[] = new Array<GameCard>();

    constructor() {
        const copas = [2, 3, 4, 5, 6, 7, 8, 9, 10, 91];
        const espadas = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 92];
        const ouros = [2, 3, 4, 5, 6, 7, 8, 9, 10, 93];
        const paus = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 94];

        const naipes = [copas, espadas, ouros, paus];

        while (naipes.length) {
            const randomNaipe = Math.round(Math.random() * 100) % naipes.length;
            const arr = naipes[randomNaipe];
            const naipe = arr === copas ? Naipe.Copas
                        : arr === espadas ? Naipe.Espadas
                        : arr === ouros ? Naipe.Ouros
                                        : Naipe.Paus;
            const valorIdx = Math.round(Math.random() * 100) % (arr.length - 1)
            const valor = arr[valorIdx];
            arr.splice(valorIdx, 1);
            if (arr.length === 1) naipes.splice(randomNaipe, 1);
            this.cards.push(new GameCard(valor, naipe));
        }
    }

    pop() {
        const carta = this.cards[0];
        this.cards.splice(0, 1);
        return carta;
    }

    push(carta: GameCard) {
        this.cards.push(carta);
    }

    length() {
        return this.cards.length;
    }
}