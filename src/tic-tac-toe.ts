import { Player } from './player';
import { GameState } from './game-state';
import { Cell } from './cell';
import { winScenarios } from './win-scenarios';
import { isDefined } from './array-utils';

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

    public getGameState(): GameState {
        return this.gameState;
    }

    private getNewGameState(): GameState {
        const winner = this.getWinner();
        if (winner) {
            return { state: 'Won', player: winner };
        }

        if (this.board.size === 9) {
            return { state: 'Draw', player: 'None' };
        }

        return { state: 'InProgress', player: this.getNextPlayer() };
    }

    private getNextPlayer() {
        return this.gameState.player === 'X' ? 'O' : 'X';
    }

    private getWinner(): Player | undefined {
        for (const scenario of winScenarios) {
            // No forEach here, because we want to return early
            const players = scenario.map((cell) => this.board.get(cell)).filter(isDefined);

            if (players.length === 3 && players.every((player) => player === players[0])) {
                return players[0];
            }
        }

        return undefined;
    }
}
