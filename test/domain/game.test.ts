import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { Game } from '../../src/domain/game'; // Update the import path as necessary
import { UserIO } from '../../src/domain/user-io';
import { TicTacToe } from '../../src/domain/tic-tac-toe'; // Ensure this import is correct
import { CLI } from '../../src/domain/cli'; // Ensure this import is correct

describe('Game', () => {
    let mockIO: UserIO;
    let mockCLI: CLI;
    let mockTicTacToe: TicTacToe;
    let game: Game;

    beforeEach(() => {
        // Mocking the TicTacToe class methods
        mockTicTacToe = {
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
            showMessage: vi.fn(),
            displayBotMove: vi.fn(),
        } as unknown as CLI;

        // Override implementation in the Game class
        game = new Game(mockIO);
        // Replace internal instances with mocks
        game['ticTacToe'] = mockTicTacToe;
        game['ui'] = mockCLI;
    });

    afterEach(() => {
        vi.clearAllMocks(); // Reset mocks after each test
    });

    describe('start', () => {
        it('should greet the player and display the initial board', () => {
            game.start()

            expect(mockCLI.showMessage).toHaveBeenCalledWith("Welcome to Tic-Tac-Toe!");
            expect(mockCLI.displayBoard).toHaveBeenCalledWith(mockTicTacToe.getBoard());
        });
    });

    describe('playerTurn', () => {
        it('should allow the player to make a move and check for a win', () => {
            (mockCLI.getPlayerMove as Mock).mockImplementation((callback) => {
                callback({ row: 1, col: 1 }); // Simulating user input
            });
            (mockTicTacToe.makeMove as Mock).mockReturnValueOnce(true);
            (mockTicTacToe.checkWin as Mock).mockReturnValue(true);
            (mockTicTacToe.getBoard as Mock).mockReturnValue([[]])

            game['playerTurn']();

            expect(mockCLI.displayBoard).toHaveBeenCalled();
            expect(mockCLI.showMessage).toHaveBeenCalledWith("Congratulations, you win!");
        });

        it('should allow the player to make a move and check for a draw', () => {
            (mockCLI.getPlayerMove as Mock).mockImplementation((callback) => {
                callback({ row: 1, col: 1 }); // Simulating user input
            });
            (mockTicTacToe.makeMove as Mock).mockReturnValueOnce(true);
            (mockTicTacToe.checkWin as Mock).mockReturnValue(false);
            (mockTicTacToe.isBoardFull as Mock).mockReturnValue(true);
            (mockTicTacToe.getBoard as Mock).mockReturnValue([[]])

            game['playerTurn']();

            expect(mockCLI.displayBoard).toHaveBeenCalled();
            expect(mockCLI.showMessage).toHaveBeenCalledWith("It's a draw!");
        });

        it('should prompt again when invalid move is made', () => {
            (mockCLI.getPlayerMove as Mock).mockImplementationOnce((callback) => {
                callback({ row: 1, col: 1 }); // Simulating user input
            });
            (mockCLI.getPlayerMove as Mock).mockImplementationOnce((callback) => {
                callback({ row: 1, col: 2 }); // Simulating user input
            });

            // Simulate invalid move and then a valid move
            (mockTicTacToe.makeMove as Mock).mockReturnValueOnce(false).mockReturnValue(true);
            (mockTicTacToe.checkWin as Mock).mockReturnValue(false); // No win
            (mockTicTacToe.getBoard as Mock).mockReturnValue([[]]);
            (mockTicTacToe.isBoardFull as Mock).mockReturnValue(false); // Not full

            game['playerTurn']();

            expect(mockCLI.showMessage).toHaveBeenCalledWith("That space is already taken. Try again.");
            expect(mockCLI.displayBoard).toHaveBeenCalled(); // After the valid move
        });
    });

    describe('botTurn', () => {
        it('should let the bot make a move and check for a win', () => {
            (mockTicTacToe.botMove as Mock).mockReturnValue({ row: 1, col: 1 });
            (mockTicTacToe.checkWin as Mock).mockReturnValue(false); // Simulate no win
            (mockTicTacToe.isBoardFull as Mock).mockReturnValue(false); // Not full

            game['botTurn']();

            expect(mockCLI.displayBotMove).toHaveBeenCalledWith({ row: 1, col: 1 });
            expect(mockCLI.displayBoard).toHaveBeenCalledWith(mockTicTacToe.getBoard());
        });

        it('should declare bot win', () => {
            (mockTicTacToe.botMove as Mock).mockReturnValue({ row: 1, col: 1 });
            (mockTicTacToe.checkWin as Mock).mockReturnValue(true); // Bot wins

            game['botTurn']();

            expect(mockCLI.showMessage).toHaveBeenCalledWith("Bot wins!");
        });

        it('should declare a draw if the board is full', () => {
            (mockTicTacToe.botMove as Mock).mockReturnValue({ row: 1, col: 1 });
            (mockTicTacToe.isBoardFull as Mock).mockReturnValue(true); // Board is full

            game['botTurn']();

            expect(mockCLI.showMessage).toHaveBeenCalledWith("It's a draw!");
        });
    });
});