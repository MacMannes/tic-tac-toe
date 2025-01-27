import { Player } from './player';
import { GameState } from './game-state';

export class TicTacToe {
    private player: Player = 'X';

    public getCurrentPlayer(): Player {
        return this.player;
    }

    public makeMove() {
        this.player = this.player === 'X' ? 'O' : 'X';
    }

    public getGameState(): GameState {
        return 'InProgress';
    }
}
