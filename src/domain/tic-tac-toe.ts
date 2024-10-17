import { Board, Move } from './models';

export class TicTacToe {
    private board: Board;
    private playerSymbol: string;
    private botSymbol: string;

    constructor(playerSymbol: string = 'X', botSymbol: string = 'O') {
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
        this.playerSymbol = playerSymbol;
        this.botSymbol = botSymbol;
    }

    public getBoard(): Board {
        return this.board;
    }

    public makeMove(move: Move, symbol: string): boolean {
        if (this.board[move.row][move.col] === ' ') {
            this.board[move.row][move.col] = symbol;
            return true;
        }
        return false;
    }

    // Bot makes a random move
    public botMove(): Move {
        let row, col;
        do {
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 3);
        } while (this.board[row][col] !== ' ');

        this.board[row][col] = this.botSymbol;
        return { row, col };
    }

    public checkWin(symbol: string): boolean {
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] === symbol && this.board[i][1] === symbol && this.board[i][2] === symbol) return true;
            if (this.board[0][i] === symbol && this.board[1][i] === symbol && this.board[2][i] === symbol) return true;
        }

        if (this.board[0][0] === symbol && this.board[1][1] === symbol && this.board[2][2] === symbol) return true;

        return this.board[0][2] === symbol && this.board[1][1] === symbol && this.board[2][0] === symbol;
    }

    public isBoardFull(): boolean {
        return this.board.flat().every(cell => cell !== ' ');
    }
}

