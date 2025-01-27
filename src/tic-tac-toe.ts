import { Player } from './player';
import { Game } from './game';
import { Cell } from './cell';

export class TicTacToe {
    private game: Game = { state: 'InProgress', player: 'X', board: {} };

    public getCurrentPlayer(): Player {
        return this.game.player;
    }

    public makeMove(cell: Cell) {
        this.game.board[cell] = this.game.player;

        const winner = this.checkWinner();
        if (winner) {
            this.game.state = 'Won';
            this.game.player = winner;
        } else {
            this.game.player = this.game.player === 'X' ? 'O' : 'X';
        }
    }

    public getGame(): Game {
        return this.game;
    }

    private checkWinner(): Player | undefined {
        const board = this.game.board;

        if (board['TOP_LEFT'] === board['MIDDLE_LEFT'] && board['TOP_LEFT'] === board['BOTTOM_LEFT']) {
            return board['TOP_LEFT'];
        }

        return undefined;
    }
}
