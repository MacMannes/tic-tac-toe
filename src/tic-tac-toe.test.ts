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

        const state = ticTacToe.getGameState().state;

        expect(state).toBe('InProgress');
    });

    it('should let player X win with the a vertical line in the first column', () => {
        ticTacToe.makeMove('TOP_LEFT');
        ticTacToe.makeMove('MIDDLE_CENTER');

        ticTacToe.makeMove('MIDDLE_LEFT');
        ticTacToe.makeMove('BOTTOM_RIGHT');

        ticTacToe.makeMove('BOTTOM_LEFT');

        const game = ticTacToe.getGameState();

        expect(game.state).toBe('Won');
        expect(game.player).toBe('X');
    });

    it('should let player X win with the a vertical line in the third column', () => {
        ticTacToe.makeMove('TOP_RIGHT');
        ticTacToe.makeMove('MIDDLE_CENTER');

        ticTacToe.makeMove('MIDDLE_RIGHT');
        ticTacToe.makeMove('BOTTOM_LEFT');

        ticTacToe.makeMove('BOTTOM_RIGHT');

        const game = ticTacToe.getGameState();

        expect(game.state).toBe('Won');
        expect(game.player).toBe('X');
    });

    it('should let player O win with a horizontal line', () => {
        ticTacToe.makeMove('TOP_LEFT');
        ticTacToe.makeMove('MIDDLE_CENTER');

        ticTacToe.makeMove('TOP_CENTER');
        ticTacToe.makeMove('MIDDLE_RIGHT');

        ticTacToe.makeMove('BOTTOM_RIGHT');
        ticTacToe.makeMove('TOP_RIGHT');

        ticTacToe.makeMove('BOTTOM_LEFT');
        ticTacToe.makeMove('MIDDLE_LEFT');

        const game = ticTacToe.getGameState();

        expect(game.state).toBe('Won');
        expect(game.player).toBe('O');
    });

    it('should let player X win with a diagonal line', () => {
        ticTacToe.makeMove('TOP_LEFT');
        ticTacToe.makeMove('TOP_RIGHT');

        ticTacToe.makeMove('BOTTOM_LEFT');
        ticTacToe.makeMove('MIDDLE_LEFT');

        ticTacToe.makeMove('BOTTOM_RIGHT');
        ticTacToe.makeMove('MIDDLE_RIGHT');

        ticTacToe.makeMove('MIDDLE_CENTER');

        const game = ticTacToe.getGameState();

        expect(game.state).toBe('Won');
        expect(game.player).toBe('X');
    });

    it('should end the game with a draw', () => {
        /**
         *     X|O|X
         *     -+-+-
         *     O|O|X
         *     -+-+-
         *     X|X|O
         */

        ticTacToe.makeMove('TOP_LEFT');
        ticTacToe.makeMove('TOP_CENTER');

        ticTacToe.makeMove('TOP_RIGHT');
        ticTacToe.makeMove('MIDDLE_LEFT');

        ticTacToe.makeMove('MIDDLE_RIGHT');
        ticTacToe.makeMove('MIDDLE_CENTER');

        ticTacToe.makeMove('BOTTOM_LEFT');
        ticTacToe.makeMove('BOTTOM_RIGHT');

        ticTacToe.makeMove('BOTTOM_CENTER');

        const game = ticTacToe.getGameState();

        expect(game.state).toBe('Draw');
        expect(game.player).toBe('None');
    });

    it('should not allow invalid moves', () => {
        ticTacToe.makeMove('TOP_LEFT');
        const validMove = ticTacToe.makeMove('TOP_LEFT');

        const game = ticTacToe.getGameState();

        expect(game.player).toBe('O');
        expect(validMove).toBeFalsy();
    });
});
