import Multiplier, { MultiplierType, centro, comum, palavraDupla, palavraTripla, letraDupla, letraTripla } from "./models/Multiplier";
import Letra from "./models/Letra";

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

// Função mockada para simular a verificação no dicionário
function checkDictionary(word: string) {
    console.log(`Verificando a palavra: "${word}"...`);
    // Em uma implementação real, esta função faria uma consulta a um dicionário.
    // Para este exemplo, vamos assumir que todas as palavras são válidas.
    return true;
}

class ScrabbleGame {
    boardMultipliers: Multiplier[][];
    board: (Letra | null)[][];
    selectedTile: Letra | null;
    previewBoard: PreviewTile[];
    playerRack: Letra[];
    isFirstMove: boolean;
    statusMessage: string;
    playerScore: number;
    setSelf: (scrabbleGame: ScrabbleGame) => any = () => null;

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
        this.playerRack = [Letra.A, Letra.C, Letra.A, Letra.D, Letra.A, Letra.C, Letra.D, Letra.E, Letra.F]; // Rack inicial para teste
        this.isFirstMove = true;
        this.statusMessage = "Bem vindo ao jogo de Scrabble!";
        this.playerScore = 0;
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
        }

        return wordScore * wordMultiplier;
    }

    /**
     * Valida e confirma a jogada atual no previewBoard.
     */
    confirm() {
        if (this.previewBoard.length === 0) {
            this.statusMessage = "Nenhuma peça foi colocada no tabuleiro.";
            this.update();
            return;
        }

        // --- 1. Determinar a orientação da jogada ---
        const rows = new Set(this.previewBoard.map(p => p.row));
        const cols = new Set(this.previewBoard.map(p => p.col));
        const isHorizontal = rows.size === 1;
        const isVertical = cols.size === 1;

        if (!isHorizontal && !isVertical) {
            this.statusMessage = "As peças devem ser colocadas em uma única linha ou coluna.";
            this.update();
            return;
        }

        // --- 2. Ordenar as peças e obter a linha/coluna da jogada ---
        if (isHorizontal) this.previewBoard.sort((a, b) => a.col - b.col);
        else this.previewBoard.sort((a, b) => a.row - b.row);
        
        const mainRow = this.previewBoard[0].row;
        const mainCol = this.previewBoard[0].col;

        // --- 3. Validações específicas da primeira jogada ---
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

        // --- 4. Encontrar todas as palavras formadas pela jogada ---

        const allWordsData: { letra: Letra, row: number, col: number }[][] = [];
        let touchesExistingTile = false;

        // Função auxiliar para obter a letra em uma posição, considerando o preview e o tabuleiro
        const getLetterAt = (r: number, c: number): Letra | null => {
            const preview = this.findPreview(r, c);
            return preview ? preview.letra : this.board[r][c];
        }

        // 4a. Encontrar a palavra principal
        let start = isHorizontal ? mainCol : mainRow;
        let end = isHorizontal ? this.previewBoard[this.previewBoard.length - 1].col : this.previewBoard[this.previewBoard.length - 1].row;

        // Expande para encontrar a palavra completa, incluindo letras já no tabuleiro
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
                // Se houver um buraco na palavra principal, a jogada é inválida
                this.statusMessage = "A palavra principal não pode ter buracos.";
                this.update();
                return;
            }
        }
        if (!this.isFirstMove && mainWordData.length > 1 && mainWordData.length == this.previewBoard.length) { this.statusMessage = "A palavra deve cruzar com outra existente"; this.update(); return; }
        if (mainWordData.length > 1) allWordsData.push(mainWordData);

        // 4b. Encontrar palavras secundárias (perpendiculares à jogada)
        for (const tile of this.previewBoard) {
            const secondaryWordData: { letra: Letra, row: number, col: number }[] = [{letra: tile.letra, row: tile.row, col: tile.col}];
            let start = isHorizontal ? tile.row : tile.col;

            // Procura para cima/esquerda
            for (let i = start - 1; i >= 0; i--) {
                const r = isHorizontal ? i : tile.row;
                const c = isHorizontal ? tile.col : i;
                const letter = this.board[r][c];
                if (!letter) break;
                secondaryWordData.unshift({ letra: letter, row: r, col: c })
                touchesExistingTile = true;
            }
            // Procura para baixo/direita
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

        // --- 5. Validar conexão para jogadas subsequentes ---
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

        // --- 7. Se tudo for válido, confirmar a jogada ---
        this.previewBoard.forEach(tile => this.board[tile.row][tile.col] = tile.letra);
        this.previewBoard = [];
        this.isFirstMove = false;
        this.statusMessage = `Jogada confirmada! +${totalMoveScore} pontos. Palavras formadas:${validatedWordStrings.join(", ")}.`;
        this.playerScore += totalMoveScore;
        
        // TODO: Calcular pontos e reabastecer o rack do jogador.

        this.update();
    }
}

export default ScrabbleGame;