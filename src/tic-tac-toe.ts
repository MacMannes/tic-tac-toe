import { Player } from './player';
import { GameState } from './game-state';

export class TicTacToe {
    private gameState: GameState = { state: 'InProgress', player: 'X' };

    public getCurrentPlayer(): Player {
        return this.gameState.player;
    }

    public makeMove() {
        this.gameState.player = this.gameState.player === 'X' ? 'O' : 'X';
    }

    public getGameState(): GameState {
        return this.gameState;
    }
}
