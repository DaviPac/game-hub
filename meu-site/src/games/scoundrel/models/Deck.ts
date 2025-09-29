import { Naipe, GameCard } from "./GameCard";

export class Deck {
    cards: GameCard[] = new Array<GameCard>();

    constructor() {

        const numerosVermelhos = [2, 3, 4, 5, 6, 7, 8, 9, 10];
        const numerosPretos = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        const cartas: Array<GameCard> = [];

        numerosVermelhos.forEach(n => cartas.push(new GameCard(n, Naipe.Copas)));
        numerosVermelhos.forEach(n => cartas.push(new GameCard(n, Naipe.Ouros)));
        numerosPretos.forEach(n => cartas.push(new GameCard(n, Naipe.Espadas)));
        numerosPretos.forEach(n => cartas.push(new GameCard(n, Naipe.Paus)));

        while (cartas.length > 0) {
            const indice = Math.floor(Math.random() * 100) % cartas.length;
            this.cards.push(cartas[indice]);
            cartas.splice(indice, 1);
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