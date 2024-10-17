import { TicTacToe } from './tic-tac-toe';
import { CLI } from './cli';
import { UserIO } from './user-io';


export class Game {
    private ticTacToe: TicTacToe;
    private ui: CLI;

    constructor(io: UserIO) {
        this.ticTacToe = new TicTacToe();
        this.ui = new CLI(io);
    }

    public start() {
        this.ui.showMessage("Welcome to Tic-Tac-Toe!");
        this.ui.displayBoard(this.ticTacToe.getBoard());
        this.playerTurn();
    }

    private playerTurn() {
        this.ui.getPlayerMove((move) => {
            if (this.ticTacToe.makeMove(move, this.ticTacToe.playerSymbol)) {
                this.ui.displayBoard(this.ticTacToe.getBoard());
                if (this.ticTacToe.checkWin(this.ticTacToe.playerSymbol)) {
                    this.ui.showMessage("Congratulations, you win!");
                    this.ui.close();
                } else if (this.ticTacToe.isBoardFull()) {
                    this.ui.showMessage("It's a draw!");
                    this.ui.close();
                } else {
                    this.botTurn();
                }
            } else {
                this.ui.showMessage("That space is already taken. Try again.");
                this.playerTurn();
            }
        });
    }

    private botTurn(): void {
        this.ui.displayBotMove(this.ticTacToe.botMove());
        this.ui.displayBoard(this.ticTacToe.getBoard());

        if (this.ticTacToe.checkWin(this.ticTacToe.botSymbol)) {
            this.ui.showMessage("Bot wins!");
        } else if (this.ticTacToe.isBoardFull()) {
            this.ui.showMessage("It's a draw!");
        } else {
            this.playerTurn();
        }
    }
}