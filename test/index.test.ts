import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { Game } from '../src/domain/game';
import { UserIO } from '../src/domain/user-io';

// Mock ReadlineIO
vi.mock("./ReadlineIO");

describe('index.ts (Game Start)', () => {
    let game: Game;
    let mockIO: UserIO;
    let mockQuestion: Mock;
    let mockPrint: Mock;
    let mockClose: Mock;

    beforeEach(() => {
        // Mock methods of ReadlineIO
        mockQuestion = vi.fn();
        mockPrint = vi.fn();
        mockClose = vi.fn();

        // Mock ReadlineIO constructor and methods
        mockIO = {
            question: mockQuestion,
            print: mockPrint,
            close: mockClose,
        } as unknown as UserIO;

        // Create a new game instance using the mocked ReadlineIO
        game = new Game(mockIO);
    });

    it('should start the game and print the initial board', () => {
        // Spy on the `print` method to check if the board is printed
        game.start();

        // Ensure the welcome message and the initial board are printed
        expect(mockPrint).toHaveBeenCalledWith('Welcome to Tic-Tac-Toe!');
        expect(mockPrint).toHaveBeenCalledWith(' | | \n-+-+-\n | | \n-+-+-\n | | '); // Ensure board lines are printed
    });

    it("should ask for the player's move", () => {
        // Start the game
        game.start();

        // The game should prompt the user for input
        expect(mockQuestion).toHaveBeenCalled();
    });

    it("should process the player's move", () => {
        // Simulate the player move by invoking the callback
        mockQuestion.mockImplementationOnce((query, callback) => {
            callback('1 1'); // Simulate user input
        });

        game.start();

        // Expect the move to be processed and printed
        expect(mockPrint).toHaveBeenCalledWith(expect.stringContaining('X')); // Expect player's move to show up on the board
    });

    it("should handle bot's move", () => {
        // Mock the `getPlayerMove` to immediately move to the bot's turn
        mockQuestion.mockImplementationOnce((query, callback) => {
            callback('1 1'); // Player's move
        });

        game.start();

        // Ensure bot's move is processed (you can adjust this to match the game logic)
        expect(mockPrint).toHaveBeenCalledWith(expect.stringContaining('Bot placed'));
    });
});
