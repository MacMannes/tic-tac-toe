import { Board, Move } from './models';
import { UserIO } from './user-io';

export class CLI {
    private io: UserIO;

    constructor(io: UserIO) {

    }

    public displayBoard(board: Board): void {

    }

    public getPlayerMove(callback: (move: Move) => void): void {

    }

    public displayBotMove(move: Move): void {

    }

    public endGame(message: string): void {

    }
}
