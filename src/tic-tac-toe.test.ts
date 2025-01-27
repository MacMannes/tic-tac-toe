import { describe, expect, it } from 'vitest';
import { TicTacToe } from './tic-tac-toe';

describe('Tic Tac Toe', () => {
    it('Should create an instance of the TicTacToe class', () => {
        const ticTacToe = new TicTacToe();
        expect(ticTacToe).toBeDefined();
    });
});
