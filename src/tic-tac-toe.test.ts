import { describe, expect, it } from 'vitest';
import { TicTacToe } from './tic-tac-toe';

describe('Tic Tac Toe', () => {
    it('Creating an instance of the TicTacToe class should work', () => {
        const ticTacToe = new TicTacToe();
        expect(ticTacToe).toBeDefined();
    });
});
