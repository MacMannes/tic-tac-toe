import { Player } from './player';

export class TicTacToe {
    private player: Player = 'X';

    public getCurrentPlayer(): Player {
        return this.player;
    }

    makeMove() {
        this.player = 'O';
    }
}
