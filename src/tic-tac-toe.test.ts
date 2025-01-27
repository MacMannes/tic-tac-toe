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
        ticTacToe.makeMove();

        const player = ticTacToe.getCurrentPlayer();

        expect(player).toBe('O');
    });

    it('should switch players after each move', () => {
        ticTacToe.makeMove();
        ticTacToe.makeMove();

        const player = ticTacToe.getCurrentPlayer();

        expect(player).toBe('X');
    });

    it('should have state `InProgress` when no player has won', () => {
        ticTacToe.makeMove();
        ticTacToe.makeMove();

        const state = ticTacToe.getGameState();

        expect(state).toBe('InProgress');
    });
});
