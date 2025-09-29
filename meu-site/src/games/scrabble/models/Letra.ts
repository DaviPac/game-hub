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
    static G = new Letra("G", 4);
    static H = new Letra("H", 6);
    static I = new Letra("I", 1);
    static J = new Letra("J", 5);
    static L = new Letra("L", 2);
    static M = new Letra("M", 2);
    static N = new Letra("N", 3);
    static O = new Letra("O", 1);
    static P = new Letra("P", 2);
    static Q = new Letra("Q", 8);
    static R = new Letra("R", 1);
    static S = new Letra("S", 1);
    static T = new Letra("T", 1);
    static U = new Letra("U", 1);
    static V = new Letra("V", 4);
    static X = new Letra("X", 8);
    static Z = new Letra("Z", 8);

    static aAmount = 10;
    static bAmount = 5;
    static cAmount = 6;
    static dAmount = 6;
    static eAmount = 8;
    static fAmount = 4;
    static gAmount = 4;
    static hAmount = 2;
    static iAmount = 6;
    static jAmount = 2;
    static lAmount = 5;
    static mAmount = 4;
    static nAmount = 3;
    static oAmount = 7;
    static pAmount = 5;
    static qAmount = 2;
    static rAmount = 6;
    static sAmount = 8;
    static tAmount = 4;
    static uAmount = 8;
    static vAmount = 2;
    static xAmount = 1;
    static zAmount = 1;
}

export default Letra;