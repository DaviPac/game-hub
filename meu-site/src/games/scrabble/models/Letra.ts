class Letra {
    char: string;
    value: number;

    constructor(char: string, value: number) {
        this.char = char;
        this.value = value;
    }

    static A = new Letra("A", 1);
    static B = new Letra("B", 3);
    static C = new Letra("C", 2);
    static D = new Letra("D", 2);
    static E = new Letra("E", 1);
    static F = new Letra("F", 4);
}

export default Letra;