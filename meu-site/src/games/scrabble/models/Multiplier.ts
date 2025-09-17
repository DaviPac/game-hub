export enum MultiplierType {
    letra,
    palavra,
    centro,
    comum
}

class Multiplier {
    multiplierType: MultiplierType;
    value: number;

    constructor(multiplierType: MultiplierType, value: number) {
        this.multiplierType = multiplierType;
        this.value = value;
    }
}

export const palavraDupla = new Multiplier(MultiplierType.palavra, 2);
export const palavraTripla = new Multiplier(MultiplierType.palavra, 3);
export const letraDupla = new Multiplier(MultiplierType.letra, 2);
export const letraTripla = new Multiplier(MultiplierType.letra, 3);
export const centro = new Multiplier(MultiplierType.centro, 1);
export const comum = new Multiplier(MultiplierType.comum, 1);

export default Multiplier;