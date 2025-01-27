import { describe, expect, it } from 'vitest';
import { TicTacToe } from './tic-tac-toe';

describe('Tic Tac Toe', () => {
    it('Should create an instance of the TicTacToe class', () => {
        const ticTacToe = new TicTacToe();
        expect(ticTacToe).toBeDefined();
    });

    it('Should make first player X', () => {
        const ticTacToe = new TicTacToe();

        const player = ticTacToe.getCurrentPlayer();
        expect(player).toBe('X');
    });
});
