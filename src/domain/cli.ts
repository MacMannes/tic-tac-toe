import { Board, Move } from './models';
import { UserIO } from './user-io';

export class CLI {
    private io: UserIO;

    constructor(io: UserIO) {
        this.io = io;
    }

    public displayBoard(board: Board): void {
        this.io.print(this.formatBoard(board))
    }

    public getPlayerMove(callback: (move: Move) => void): void {
        this.io.question('Enter your move (row and column separated by a space, e.g., "1 1"): ', (input) => {
            const [row, col] = input.split(" ").map(Number);
            if (row > 0 && row <= 3 && col > 0 && col <= 3) {
                callback({ row: row - 1, col: col - 1 });
            } else {
                this.io.print("Invalid input. Try again.");
                this.getPlayerMove(callback);
            }
        });
    }

    public displayBotMove(move: Move): void {
        this.io.print(`Bot placed at (${move.row + 1}, ${move.col + 1})`)
    }

    public endGame(message: string): void {
        this.io.print(message)
    }

    private formatBoard(board: Board): string {
        const rowSeparator = '\n-+-+-\n'
        return board.map((columns) => columns.join('|')).join(rowSeparator)
    }
}
