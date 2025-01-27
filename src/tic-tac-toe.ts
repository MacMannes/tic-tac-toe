import { Player } from './player';
import { GameState } from './game-state';

export class TicTacToe {
    private player: Player = 'X';
    private gameState: GameState = { state: 'InProgress' };

    public getCurrentPlayer(): Player {
        return this.player;
    }

    public makeMove() {
        this.player = this.player === 'X' ? 'O' : 'X';
    }

    public getGameState(): GameState {
        return this.gameState;
    }
}
