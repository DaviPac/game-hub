import Multiplier, { MultiplierType, centro, comum, palavraDupla, palavraTripla, letraDupla, letraTripla } from "./models/Multiplier";
import Letra from "./models/Letra";
import wordslist from "./wordlist.txt?raw";
import * as api from "../../api/api"

export class PreviewTile {
    letra: Letra;
    row: number;
    col: number;

    constructor(row: number, col: number, letra: Letra) {
        this.row = row;
        this.col = col;
        this.letra = letra;
    }
}

export function loadWordList() {
    return wordslist
        .split(/\r?\n/)
        .map(w => w.trim())
        .filter(Boolean)
        .map(w => w.toUpperCase());
}

function checkDictionary(word: string) {
    console.log(`Verificando a palavra: "${word}"...`);
    const words = loadWordList();
    return words.some(w => w === word);
}

class ScrabbleGame {
    boardMultipliers: Multiplier[][];
    board: (Letra | null)[][];
    selectedTile: Letra | null;
    previewBoard: PreviewTile[];
    playerRack: Letra[] = new Array<Letra>();
    statusMessage: string;
    playerScore: number;
    setSelf: (scrabbleGame: ScrabbleGame) => any = () => null;
    letterBag: Letra[] = new Array<Letra>();
    players: number[] = new Array<number>();
    turn: number;
    id: number = 1;

    constructor() {
        this.boardMultipliers = [
            [palavraTripla, comum, comum, letraDupla, comum, comum, comum, palavraTripla, comum, comum, comum, letraDupla, comum, comum, palavraTripla],
            [comum, palavraDupla, comum, comum, comum, letraTripla, comum, comum, comum, letraTripla, comum, comum, comum, palavraDupla, comum],
            [comum, comum, palavraDupla, comum, comum, comum, letraDupla, comum, letraDupla, comum, comum, comum, palavraDupla, comum, comum],
            [letraDupla, comum, comum, palavraDupla, comum, comum, comum, letraDupla, comum, comum, comum, palavraDupla, comum, comum, letraDupla],
            [comum, comum, comum, comum, palavraDupla, comum, comum, comum, comum, comum, palavraDupla, comum, comum, comum, comum],
            [comum, letraTripla, comum, comum, comum, letraTripla, comum, comum, comum, letraTripla, comum, comum, comum, letraTripla, comum],
            [comum, comum, letraDupla, comum, comum, comum, letraDupla, comum, letraDupla, comum, comum, comum, letraDupla, comum, comum],
            [palavraTripla, comum, comum, letraDupla, comum, comum, comum, centro, comum, comum, comum, letraDupla, comum, comum, palavraTripla],
            [comum, comum, letraDupla, comum, comum, comum, letraDupla, comum, letraDupla, comum, comum, comum, letraDupla, comum, comum],
            [comum, letraTripla, comum, comum, comum, letraTripla, comum, comum, comum, letraTripla, comum, comum, comum, letraTripla, comum],
            [comum, comum, comum, comum, palavraDupla, comum, comum, comum, comum, comum, palavraDupla, comum, comum, comum, comum],
            [letraDupla, comum, comum, palavraDupla, comum, comum, comum, letraDupla, comum, comum, comum, palavraDupla, comum, comum, letraDupla],
            [comum, comum, palavraDupla, comum, comum, comum, letraDupla, comum, letraDupla, comum, comum, comum, palavraDupla, comum, comum],
            [comum, palavraDupla, comum, comum, comum, letraTripla, comum, comum, comum, letraTripla, comum, comum, comum, palavraDupla, comum],
            [palavraTripla, comum, comum, letraDupla, comum, comum, comum, palavraTripla, comum, comum, comum, letraDupla, comum, comum, palavraTripla]
        ];

        this.board = Array(15).fill(null).map(() => Array(15).fill(null));
        this.selectedTile = null;
        this.previewBoard = [];
        this.statusMessage = "Bem vindo ao jogo de Scrabble!";
        this.playerScore = 0;

        for (let i = 0; i < Letra.aAmount; i++) this.letterBag.push(Letra.A);
        for (let i = 0; i < Letra.bAmount; i++) this.letterBag.push(Letra.B);
        for (let i = 0; i < Letra.cAmount; i++) this.letterBag.push(Letra.C);
        for (let i = 0; i < Letra.dAmount; i++) this.letterBag.push(Letra.D);
        for (let i = 0; i < Letra.eAmount; i++) this.letterBag.push(Letra.E);
        for (let i = 0; i < Letra.fAmount; i++) this.letterBag.push(Letra.F);
        for (let i = 0; i < Letra.gAmount; i++) this.letterBag.push(Letra.G);
        for (let i = 0; i < Letra.hAmount; i++) this.letterBag.push(Letra.H);
        for (let i = 0; i < Letra.iAmount; i++) this.letterBag.push(Letra.I);
        for (let i = 0; i < Letra.jAmount; i++) this.letterBag.push(Letra.J);
        for (let i = 0; i < Letra.lAmount; i++) this.letterBag.push(Letra.L);
        for (let i = 0; i < Letra.mAmount; i++) this.letterBag.push(Letra.M);
        for (let i = 0; i < Letra.nAmount; i++) this.letterBag.push(Letra.N);
        for (let i = 0; i < Letra.oAmount; i++) this.letterBag.push(Letra.O);
        for (let i = 0; i < Letra.pAmount; i++) this.letterBag.push(Letra.P);
        for (let i = 0; i < Letra.qAmount; i++) this.letterBag.push(Letra.Q);
        for (let i = 0; i < Letra.rAmount; i++) this.letterBag.push(Letra.R);
        for (let i = 0; i < Letra.sAmount; i++) this.letterBag.push(Letra.S);
        for (let i = 0; i < Letra.tAmount; i++) this.letterBag.push(Letra.T);
        for (let i = 0; i < Letra.uAmount; i++) this.letterBag.push(Letra.U);
        for (let i = 0; i < Letra.vAmount; i++) this.letterBag.push(Letra.V);
        for (let i = 0; i < Letra.xAmount; i++) this.letterBag.push(Letra.X);
        for (let i = 0; i < Letra.zAmount; i++) this.letterBag.push(Letra.Z);

        this.fillPlayerRack();
        this.turn = 0;

    }

    get isFirstMove() { return this.turn === 0; }

    static async load(gameId: number) {
        const response = await api.getScrabbleGame(gameId);
        const game = new ScrabbleGame();
        game.board = response.board;
        game.turn = response.turn;
        game.playerRack = response.playerRack;
        game.playerScore = response.playerScore;
        game.letterBag = response.letterBag;
        game.players = response.players;
        return game;
    }

    async save() {
        const response = await api.saveScrabbleGame(this);
        if (!false) this.statusMessage = "Erro de servidor completar jogada, tente novamente.";
        else this.statusMessage = "Jogada concluída com sucesso!";
        this.update();
    }

    fillPlayerRack() {
        while (this.playerRack.length < 8 && this.letterBag.length) {
            const index = Math.floor(Math.random() * 100) % this.letterBag.length;
            this.playerRack.push(this.letterBag[index]);
            this.letterBag.splice(index, 1);
        }
    }

    update() {
        this.setSelf(Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this)));
    }

    placeTile(row: number, col: number) {
        if (this.selectedTile && !this.board[row][col] && !this.findPreview(row, col)) {
            this.previewBoard.push(new PreviewTile(row, col, this.selectedTile));
            this.playerRack.splice(this.playerRack.findIndex((tile) => tile === this.selectedTile), 1);
            this.selectedTile = null;
            this.update();
        }
    }

    removeTile(row: number, col: number) {
        const tileIndex = this.findPreviewIdx(row, col);
        if (tileIndex > -1) {
            const [removedTile] = this.previewBoard.splice(tileIndex, 1);
            this.playerRack.push(removedTile.letra);
            this.update();
        }
    }

    clear() {
        if (this.previewBoard.length > 0) {
            this.playerRack.push(...this.previewBoard.map(p => p.letra));
            this.previewBoard = [];
            this.update();
        }
    }

    findPreview(row: number, col: number) {return this.previewBoard.find(tile => tile.row === row && tile.col === col)};
    findPreviewIdx(row: number, col: number) {return this.previewBoard.findIndex(tile => tile.row === row && tile.col === col)};

    private _calculateWordScore(wordTiles: { letra: Letra, row: number, col: number }[]): number {
        let wordScore = 0;
        let wordMultiplier = 1;

        for (const tile of wordTiles) {
            let letterScore = tile.letra.value;

                const multiplier = this.boardMultipliers[tile.row][tile.col];
                
            switch (multiplier.multiplierType) {
                case MultiplierType.letra:
                    letterScore *= multiplier.value;
                    break;
                case MultiplierType.palavra:
                    wordMultiplier *= multiplier.value;
                    break;
            }

            wordScore += letterScore;
            console.log(`${tile.letra.char}: ${tile.letra.value} + `);
        }

        console.log(`${wordScore} * ${wordMultiplier}`);

        return wordScore * wordMultiplier;
    }

    confirm() {
        if (this.previewBoard.length === 0) {
            this.statusMessage = "Nenhuma peça foi colocada no tabuleiro.";
            this.update();
            return;
        }

        const rows = new Set(this.previewBoard.map(p => p.row));
        const cols = new Set(this.previewBoard.map(p => p.col));
        const isHorizontal = rows.size === 1;
        const isVertical = cols.size === 1;

        if (!isHorizontal && !isVertical) {
            this.statusMessage = "As peças devem ser colocadas em uma única linha ou coluna.";
            this.update();
            return;
        }

        if (isHorizontal) this.previewBoard.sort((a, b) => a.col - b.col);
        else this.previewBoard.sort((a, b) => a.row - b.row);
        
        const mainRow = this.previewBoard[0].row;
        const mainCol = this.previewBoard[0].col;

        if (this.isFirstMove) {
            if (this.previewBoard.length < 2) {
                this.statusMessage = "A primeira jogada deve ter pelo menos 2 letras.";
                this.update();
                return;
            }
            if (!this.findPreview(7, 7)) {
                this.statusMessage = "A primeira jogada deve passar pelo centro do tabuleiro (H8).";
                this.update();
                return;
            }
        }


        const allWordsData: { letra: Letra, row: number, col: number }[][] = [];
        let touchesExistingTile = false;

        const getLetterAt = (r: number, c: number): Letra | null => {
            const preview = this.findPreview(r, c);
            return preview ? preview.letra : this.board[r][c];
        }

        let start = isHorizontal ? mainCol : mainRow;
        let end = isHorizontal ? this.previewBoard[this.previewBoard.length - 1].col : this.previewBoard[this.previewBoard.length - 1].row;

        while (start > 0 && getLetterAt(isHorizontal ? mainRow : start - 1, isHorizontal ? start - 1 : mainCol)) start--;
        while (end < 14 && getLetterAt(isHorizontal ? mainRow : end + 1, isHorizontal ? end + 1 : mainCol)) end++;
        
        const mainWordData: { letra: Letra, row: number, col: number }[] = [];
        for (let i = start; i <= end; i++) {
            const row = isHorizontal ? mainRow : i;
            const col = isHorizontal ? i : mainCol;
            const letter = getLetterAt(row, col);
            
            if (letter) {
                mainWordData.push({ letra: letter, row, col })
                if (!this.findPreview(row, col)) touchesExistingTile = true;
            } else {
                this.statusMessage = "A palavra principal não pode ter buracos.";
                this.update();
                return;
            }
        }
        if (!this.isFirstMove && mainWordData.length > 1 && mainWordData.length == this.previewBoard.length) { this.statusMessage = "A palavra deve cruzar com outra existente"; this.update(); return; }
        if (mainWordData.length > 1) allWordsData.push(mainWordData);

        for (const tile of this.previewBoard) {
            const secondaryWordData: { letra: Letra, row: number, col: number }[] = [{letra: tile.letra, row: tile.row, col: tile.col}];
            let start = isHorizontal ? tile.row : tile.col;

            for (let i = start - 1; i >= 0; i--) {
                const r = isHorizontal ? i : tile.row;
                const c = isHorizontal ? tile.col : i;
                const letter = this.board[r][c];
                if (!letter) break;
                secondaryWordData.unshift({ letra: letter, row: r, col: c })
                touchesExistingTile = true;
            }

            for (let i = start + 1; i < 15; i++) {
                const r = isHorizontal ? i : tile.row;
                const c = isHorizontal ? tile.col : i;
                const letter = this.board[r][c];
                if (!letter) break;
                secondaryWordData.push({ letra: letter, row: r, col: c });
                touchesExistingTile = true;
            }

            if (secondaryWordData.length > 1) allWordsData.push(secondaryWordData);
        }

        if (!this.isFirstMove && !touchesExistingTile) {
            this.statusMessage = "Sua jogada deve se conectar a pelo menos uma peça já existente.";
            this.update();
            return;
        }

        let totalMoveScore = 0;
        const validatedWordStrings: string[] = [];

        for (const wordData of allWordsData) {
            const word = wordData.map(d => d.letra.char).join('');
            if (!checkDictionary(word)) {
                this.statusMessage = `A palavra "${word}" não é válida.`;
                this.update();
                return;
            }
            totalMoveScore += this._calculateWordScore(wordData);
            validatedWordStrings.push(word);
        }

        this.previewBoard.forEach(tile => this.board[tile.row][tile.col] = tile.letra);
        this.previewBoard = [];
        this.turn++;
        this.statusMessage = `Jogada confirmada! +${totalMoveScore} pontos. Palavras formadas:${validatedWordStrings.join(", ")}.`;
        this.playerScore += totalMoveScore;
        this.fillPlayerRack();

        this.update();
    }
}

export default ScrabbleGame;