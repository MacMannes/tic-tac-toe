import { Player } from './player';
import { GameState } from './game-state';
import { Cell } from './cell';

export class TicTacToe {
    private gameState: GameState = { state: 'InProgress', player: 'X' };
    private board: Map<Cell, Player> = new Map<Cell, Player>();

    public getCurrentPlayer(): Player {
        return this.gameState.player;
    }

    public makeMove(cell: Cell) {
        this.board.set(cell, this.gameState.player);

        this.gameState = this.getNewGameState();
    }

    private getNewGameState(): GameState {
        const winner = this.checkWinner();
        if (winner) {
            return { state: 'Won', player: winner };
        }

        if (this.board.size === 9) {
            return { state: 'Draw', player: 'None' };
        }

        return { state: 'InProgress', player: this.gameState.player === 'X' ? 'O' : 'X' };
    }

    public getGameState(): GameState {
        return this.gameState;
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

        // First diagonal line
        if (
            board.get('TOP_LEFT') === board.get('MIDDLE_CENTER') &&
            board.get('TOP_LEFT') === board.get('BOTTOM_RIGHT')
        ) {
            return board.get('TOP_LEFT');
        }

        return undefined;
    }
}
