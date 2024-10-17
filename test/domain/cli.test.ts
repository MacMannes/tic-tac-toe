import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { CLI } from '../../src/domain/cli';
import { UserIO } from '../../src/domain/user-io';

describe('CLI', () => {
    const board = [
        ['X', ' ', ' '],
        [' ', 'O', ' '],
        [' ', ' ', 'X']
    ];

    let mockIO: UserIO;
    let cli: CLI;

    beforeEach(() => {
        mockIO = {
            print: vi.fn(),
            question: vi.fn(),
            close: vi.fn(),
        } as unknown as UserIO;

        cli = new CLI(mockIO);
    });

    afterEach(() => {
        vi.clearAllMocks(); // Reset mocks after each test
    });

    describe('formatBoard', () => {
        it('should format the Board as expected', () => {
            const cli = new CLI(mockIO);
            const result = cli['formatBoard'](board);
            expect(result).toBe('X| | \n-+-+-\n |O| \n-+-+-\n | |X');
        });
    });

    describe('displayBoard', () => {
        it('should call the io.print method with the formatted board', () => {
            const formattedBoard = cli['formatBoard'](board);
            cli.displayBoard(board);

            expect(mockIO.print).toHaveBeenCalledWith(formattedBoard);
        });
    });

    describe('endGame', () => {
        it('should call the io.print method with the supplied message', () => {
            cli.endGame('You win!');

            expect(mockIO.print).toHaveBeenCalledWith('You win!');
        });
    });

    describe('getPlayerMove', () => {
        const callback = vi.fn();

        it('should ask the player for a move', () => {
            cli.getPlayerMove(callback)
            expect(mockIO.question).toHaveBeenCalledWith('Enter your move (row and column separated by a space, e.g., "1 1"): ');
        });

        it('should call callback with correct row and column for valid input', () => {
            const callback = vi.fn();

            // Mock the `question` method to provide valid input
            (mockIO.question as Mock).mockImplementation((question, callback) => {
                callback('1 2'); // Simulating user input
            });

            cli.getPlayerMove(callback);

            expect(callback).toHaveBeenCalledWith(0, 1); // (row - 1, col - 1)
        });

        it('should prompt again for invalid input', () => {
            const callback = vi.fn();

            // Mock the `question` method for invalid input first
            (mockIO.question as Mock).mockImplementation((question, callback) => {
                callback('5 5'); // Simulating user input
            });

            // Mock the `question` method again for valid input
            (mockIO.question as Mock).mockImplementationOnce((question, callback) => {
                callback('2 3'); // Simulating another user input
            });

            cli.getPlayerMove(callback);

            expect(callback).toHaveBeenCalledTimes(1); // Callback should not be called yet
            expect(mockIO.print).toHaveBeenCalledWith("Invalid input. Try again."); // Check for error message

            // Now call the second implementation
            cli.getPlayerMove(callback);

            expect(callback).toHaveBeenCalledWith(1, 2); // (row - 1, col - 1)
            expect(callback).toHaveBeenCalledTimes(2); // Callback should be called now
        });
    });

    describe('displayBotMove', () => {
        it('should display the move of the bot', () => {
            cli.displayBotMove({ row: 0, col: 1 })
            expect(mockIO.print).toHaveBeenCalledWith('Bot placed at (1, 2)');
        });
    });
});