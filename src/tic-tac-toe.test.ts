import { beforeEach, describe, expect, it } from 'vitest';
import { TicTacToe } from './tic-tac-toe';

describe('Tic Tac Toe', () => {
    let ticTacToe: TicTacToe;

    beforeEach(() => {
        ticTacToe = new TicTacToe();
    });

    it('Should create an instance of the TicTacToe class', () => {
        expect(ticTacToe).toBeDefined();
    });

    it('Should make first player X', () => {
        const player = ticTacToe.getCurrentPlayer();

        expect(player).toBe('X');
    });

    it('Should make second player O', () => {
        ticTacToe.makeMove();

        const player = ticTacToe.getCurrentPlayer();

        expect(player).toBe('O');
    });
});
