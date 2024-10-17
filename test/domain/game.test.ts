import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { Game } from '../../src/domain/game'; // Update the import path as necessary
import { UserIO } from '../../src/domain/user-io';
import { TicTacToe } from '../../src/domain/tic-tac-toe'; // Ensure this import is correct
import { CLI } from '../../src/domain/cli'; // Ensure this import is correct

describe('Game', () => {
    let mockIO: UserIO;
    let mockCLI: CLI;
    let mockGame: TicTacToe;
    let game: Game;

    beforeEach(() => {
        mockIO = {
            print: vi.fn(),
            question: vi.fn((query, callback) => callback('1 1')), // Simulate user input
            close: vi.fn(),
        };

        // Mocking the TicTacToe class methods
        mockGame = {
            getBoard: vi.fn(),
            makeMove: vi.fn(),
            checkWin: vi.fn(),
            isBoardFull: vi.fn(),
            botMove: vi.fn(),
        } as unknown as TicTacToe;

        // Mocking the CLI
        mockCLI = {
            displayBoard: vi.fn(),
            getPlayerMove: vi.fn(),
            endGame: vi.fn(),
            displayBotMove: vi.fn(),
        } as unknown as CLI;

        // Override implementation in the Game class
        game = new Game(mockIO);
        // Replace internal instances with mocks
        (game as any).game = mockGame;
        (game as any).ui = mockCLI;
    });

    afterEach(() => {
        vi.clearAllMocks(); // Reset mocks after each test
    });

    describe('start', () => {
        it('should greet the player and display the initial board', () => {
            game.start();

            expect(mockIO.print).toHaveBeenCalledWith("Welcome to Tic-Tac-Toe!");
            expect(mockCLI.displayBoard).toHaveBeenCalledWith(mockGame.getBoard());
        });
    });

    describe('playerTurn', () => {
        it('should allow the player to make a move and check for a win', () => {
            (mockGame.makeMove as Mock).mockReturnValue(true);
            (mockGame.checkWin as Mock).mockReturnValue(true); // Simulate a win scenario

            game['playerTurn']();

            expect(mockCLI.displayBoard).toHaveBeenCalledWith(mockGame.getBoard());
            expect(mockCLI.endGame).toHaveBeenCalledWith("Congratulations, you win!");
        });

        it('should prompt again when invalid move is made', () => {
            (mockGame.makeMove as Mock).mockReturnValue(false); // Move failed

            // Simulate invalid move and then a valid move
            (mockGame.makeMove as Mock).mockReturnValueOnce(false).mockReturnValueOnce(true);
            (mockGame.checkWin as Mock).mockReturnValue(false); // No win
            (mockGame.isBoardFull as Mock).mockReturnValue(false); // Not full

            game['playerTurn']();

            expect(mockIO.print).toHaveBeenCalledWith("That space is already taken. Try again.");
            expect(mockCLI.displayBoard).toHaveBeenCalledWith(mockGame.getBoard()); // After the valid move
        });
    });

    describe('botTurn', () => {
        it('should let the bot make a move and check for a win', () => {
            (mockGame.botMove as Mock).mockReturnValue({ row: 1, col: 1 });
            (mockGame.checkWin as Mock).mockReturnValue(false); // Simulate no win
            (mockGame.isBoardFull as Mock).mockReturnValue(false); // Not full

            game['botTurn']();

            expect(mockCLI.displayBotMove).toHaveBeenCalledWith(1, 1);
            expect(mockCLI.displayBoard).toHaveBeenCalledWith(mockGame.getBoard());
        });

        it('should declare bot win', () => {
            (mockGame.botMove as Mock).mockReturnValue({ row: 1, col: 1 });
            (mockGame.checkWin as Mock).mockReturnValue(true); // Bot wins

            game['botTurn']();

            expect(mockCLI.endGame).toHaveBeenCalledWith("Bot wins!");
        });

        it('should declare a draw if the board is full', () => {
            (mockGame.botMove as Mock).mockReturnValue({ row: 1, col: 1 });
            (mockGame.isBoardFull as Mock).mockReturnValue(true); // Board is full

            game['botTurn']();

            expect(mockCLI.endGame).toHaveBeenCalledWith("It's a draw!");
        });
    });
});