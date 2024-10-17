import { Board, Move } from './models';

export class TicTacToe {
    private board: Board;
    private playerSymbol: string;
    private botSymbol: string;

    constructor(playerSymbol: string = 'X', botSymbol: string = 'O') {

    }

    public getBoard(): Board {

    }

    public makeMove(move: Move, symbol: string): boolean {

    }

    public botMove(): Move {

    }

    public checkWin(symbol: string): boolean {

    }

    public isBoardFull(): boolean {

    }
}

