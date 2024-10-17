import { beforeEach, describe, expect, it } from 'vitest';
import { TicTacToe } from '../../src/domain/tic-tac-toe';

describe('TicTacToe', () => {
    describe('constructor', () => {
        it('should create an empty board', () => {
            const ticTacToe = new TicTacToe()
            expect(ticTacToe.getBoard()).toStrictEqual([
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ])
        });

        it('should assign the default user and bot symbols when none are provided', () => {
            const ticTacToe = new TicTacToe()
            expect(ticTacToe['playerSymbol']).toBe('X')
            expect(ticTacToe['botSymbol']).toBe('O')
        });

        it('should assign provided symbols', () => {
            const ticTacToe = new TicTacToe('⚔︎', '⚾︎')
            expect(ticTacToe['playerSymbol']).toBe('⚔︎')
            expect(ticTacToe['botSymbol']).toBe('⚾︎')
        });
    });

    describe('makeMove', () => {
        it('should fill the symbol in the correct board position and return true for a valid move', () => {
            const ticTacToe = new TicTacToe()
            const result = ticTacToe.makeMove({ row: 1, col: 1 }, 'X');
            expect(result).toBeTruthy();
            expect(ticTacToe.getBoard()).toStrictEqual([
                [' ', ' ', ' '],
                [' ', 'X', ' '],
                [' ', ' ', ' ']
            ])
        });

        it('should return false for an invalid move and not overwrite the ', () => {
            const ticTacToe = new TicTacToe()
            ticTacToe['board'] = [
                [' ', ' ', ' '],
                [' ', 'X', ' '],
                [' ', ' ', ' ']
            ]

            const result = ticTacToe.makeMove({ row: 1, col: 1 }, 'O');
            expect(result).toBeFalsy();
            expect(ticTacToe.getBoard()).toStrictEqual([
                [' ', ' ', ' '],
                [' ', 'X', ' '],
                [' ', ' ', ' ']
            ])
        });
    });

    describe('botMove', () => {
        it('should create a random move and fill the bot symbol in the board', () => {
            const ticTacToe = new TicTacToe('👨🏻‍', '🤖');
            const move = ticTacToe.botMove();
            const board = ticTacToe.getBoard();
            expect(board[move.row][move.col]).toBe('🤖')
        });

        it('should take the lost possible move', () => {
            const ticTacToe = new TicTacToe()
            ticTacToe['board'] = [
                ['O', 'O', 'X'],
                ['X', 'X', 'O'],
                ['O', ' ', 'X']
            ]
            const move = ticTacToe.botMove();
            expect(move).toStrictEqual({ row: 2, col: 1 })
        });
    });

    describe('isBoardFull', () => {
        it('should return false when the board is not full', () => {
            const ticTacToe = new TicTacToe()
            ticTacToe['board'] = [
                ['O', 'O', 'X'],
                ['X', 'X', 'O'],
                ['O', ' ', 'X']
            ]
            const result = ticTacToe.isBoardFull();
            expect(result).toBeDefined();
            expect(result).toBeFalsy();
        });

        it('should return true when the board is full', () => {
            const ticTacToe = new TicTacToe()
            ticTacToe['board'] = [
                ['O', 'O', 'X'],
                ['X', 'X', 'O'],
                ['O', 'O', 'X']
            ]
            const result = ticTacToe.isBoardFull();
            expect(result).toBeDefined();
            expect(result).toBeTruthy();
        });
    });

    describe('checkWin', () => {
        const ticTacToe = new TicTacToe();

        beforeEach(() => {
            // Reset the board before each test
            ticTacToe['board'] = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ];
        });

        it('should return false when the specified symbol did not win yet', () => {
            ticTacToe['board'][0] = ['O', ' ', 'X'];
            ticTacToe['board'][1] = ['X', 'X', ' '];
            ticTacToe['board'][2] = ['O', 'O', 'O'];

            const result = ticTacToe.checkWin('X');
            expect(result).toBeFalsy();
        });

        it('should return true when the specified symbol has won horizontally', () => {
            ticTacToe['board'][0] = ['X', 'X', 'X']; // Winning row
            const result = ticTacToe.checkWin('X');
            expect(result).toBeTruthy();
        });

        it('should return true when the specified symbol has won vertically', () => {
            ticTacToe['board'][0][0] = 'O';
            ticTacToe['board'][1][0] = 'O';
            ticTacToe['board'][2][0] = 'O'; // Winning column
            const result = ticTacToe.checkWin('O');
            expect(result).toBeTruthy();
        });

        it('should return true when the specified symbol has won diagonally (top-left to bottom-right)', () => {
            ticTacToe['board'][0][0] = 'X';
            ticTacToe['board'][1][1] = 'X';
            ticTacToe['board'][2][2] = 'X'; // Winning diagonal
            const result = ticTacToe.checkWin('X');
            expect(result).toBeTruthy();
        });

        it('should return true when the specified symbol has won diagonally (top-right to bottom-left)', () => {
            ticTacToe['board'][0][2] = 'O';
            ticTacToe['board'][1][1] = 'O';
            ticTacToe['board'][2][0] = 'O'; // Winning diagonal
            const result = ticTacToe.checkWin('O');
            expect(result).toBeTruthy();
        });

        it('should return false when no win condition is met', () => {
            ticTacToe['board'][0] = ['O', 'X', ' '];
            ticTacToe['board'][1] = ['X', 'O', 'O'];
            ticTacToe['board'][2] = ['X', ' ', 'O'];

            const result = ticTacToe.checkWin('X');
            expect(result).toBeFalsy();
        });
    });
});