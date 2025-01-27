import { Player } from './player';
import { GameState } from './game-state';
import { Cell } from './cell';

export class TicTacToe {
    private game: GameState = { state: 'InProgress', player: 'X' };
    private board: Map<Cell, Player> = new Map<Cell, Player>();

    public getCurrentPlayer(): Player {
        return this.game.player;
    }

    public makeMove(cell: Cell) {
        this.board.set(cell, this.game.player);

        const winner = this.checkWinner();
        if (winner) {
            this.game.state = 'Won';
            this.game.player = winner;
        } else {
            this.game.player = this.game.player === 'X' ? 'O' : 'X';
        }
    }

    public getGameState(): GameState {
        return this.game;
    }

    private checkWinner(): Player | undefined {
        const board = this.board;

        // First vertical line
        if (board.get('TOP_LEFT') === board.get('MIDDLE_LEFT') && board.get('TOP_LEFT') === board.get('BOTTOM_LEFT')) {
            return board.get('TOP_LEFT');
        }

        // Second horizontal line
        if (
            board.get('MIDDLE_LEFT') === board.get('MIDDLE_CENTER') &&
            board.get('MIDDLE_LEFT') === board.get('MIDDLE_RIGHT')
        ) {
            return board.get('MIDDLE_LEFT');
        }

        return undefined;
    }
}
