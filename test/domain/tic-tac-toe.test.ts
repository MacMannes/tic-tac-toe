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
        it('should fill the symbol in the correct board position', () => {
            const ticTacToe = new TicTacToe()
            ticTacToe.makeMove({ row: 1, col: 1 }, 'X');
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
            expect(result).toBeFalsy();
        });
    });

    describe('checkWin', () => {
        const ticTacToe = new TicTacToe()
        ticTacToe['board'] = [
            ['O', ' ', 'X'],
            ['X', 'X', ' '],
            ['O', 'O', 'O']
        ]

        it('should return false when the specified symbol did not win yet', () => {
            const result = ticTacToe.checkWin('X');
            expect(result).toBeDefined();
            expect(result).toBeFalsy();
        });

        it('should return true when the specified symbol has wun', () => {
            const result = ticTacToe.checkWin('O');
            expect(result).toBeDefined();
            expect(result).toBeTruthy();
        });
    });
});