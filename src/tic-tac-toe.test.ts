import { beforeEach, describe, expect, it } from 'vitest';
import { TicTacToe } from './tic-tac-toe';

describe('Tic Tac Toe', () => {
    let ticTacToe: TicTacToe;

    beforeEach(() => {
        ticTacToe = new TicTacToe();
    });

    it('should create an instance of the TicTacToe class', () => {
        expect(ticTacToe).toBeDefined();
    });

    it('should make first player X', () => {
        const player = ticTacToe.getCurrentPlayer();

        expect(player).toBe('X');
    });

    it('should make second player O', () => {
        ticTacToe.makeMove('TOP_LEFT');

        const player = ticTacToe.getCurrentPlayer();

        expect(player).toBe('O');
    });

    it('should switch players after each move', () => {
        ticTacToe.makeMove('TOP_LEFT');
        ticTacToe.makeMove('MIDDLE_CENTER');

        const player = ticTacToe.getCurrentPlayer();

        expect(player).toBe('X');
    });

    it('should have state `InProgress` when no player has won', () => {
        ticTacToe.makeMove('TOP_LEFT');
        ticTacToe.makeMove('MIDDLE_CENTER');

        const state = ticTacToe.getGame().state;

        expect(state).toBe('InProgress');
    });

    it('should let player X win with a vertical line', () => {
        ticTacToe.makeMove('TOP_LEFT');
        ticTacToe.makeMove('MIDDLE_CENTER');
        ticTacToe.makeMove('MIDDLE_LEFT');
        ticTacToe.makeMove('BOTTOM_RIGHT');
        ticTacToe.makeMove('BOTTOM_LEFT');

        const game = ticTacToe.getGame();

        expect(game.state).toBe('Won');
        expect(game.player).toBe('X');
    });

    it('should let player O win with a horizontal line', () => {
        /**
         *     X|X|O
         *     -+-+-
         *     O|O|O
         *     -+-+-
         *     X| |X
         */

        ticTacToe.makeMove('TOP_LEFT');
        ticTacToe.makeMove('MIDDLE_CENTER');
        ticTacToe.makeMove('TOP_CENTER');
        ticTacToe.makeMove('MIDDLE_RIGHT');
        ticTacToe.makeMove('BOTTOM_RIGHT');
        ticTacToe.makeMove('TOP_RIGHT');
        ticTacToe.makeMove('BOTTOM_LEFT');
        ticTacToe.makeMove('MIDDLE_LEFT');

        const game = ticTacToe.getGame();

        expect(game.state).toBe('Won');
        expect(game.player).toBe('O');
    });
});
