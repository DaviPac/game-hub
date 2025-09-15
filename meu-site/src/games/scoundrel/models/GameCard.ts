export enum Naipe {
    Copas,
    Paus,
    Ouros,
    Espadas,
}

export class GameCard {
    public valor: number;
    public naipe: Naipe;

    constructor(valor: number, naipe: Naipe) {
        if (valor > 13) valor = 13;
        else if (valor < 1) valor = 1;
        this.valor = valor;
        this.naipe = naipe;
    }
}