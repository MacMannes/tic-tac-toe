import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import * as readline from "readline";
import { ReadLineIO } from "../../src/domain/read-line-io";

// Mock readline
vi.mock("readline");

describe("ReadlineIO", () => {
    let readlineIO: ReadLineIO;
    let mockQuestion: Mock;
    let mockClose: Mock;
    let mockCreateInterface: Mock;

    beforeEach(() => {
        // Mock readline.createInterface
        mockQuestion = vi.fn();
        mockClose = vi.fn();
        mockCreateInterface = vi.fn().mockReturnValue({
            question: mockQuestion,
            close: mockClose,
        });

        (readline.createInterface as Mock) = mockCreateInterface;

        // Create an instance of ReadlineIO
        readlineIO = new ReadLineIO();
    });

    afterEach(() => {
        vi.clearAllMocks(); // Reset mocks after each test
    });

    it("should call question method with correct arguments", () => {
        const mockCallback = vi.fn();

        // Call the question method
        readlineIO.question("Enter your move: ", mockCallback);

        // Check if readline.question was called correctly
        expect(mockQuestion).toHaveBeenCalledWith("Enter your move: ", mockCallback);
    });

    it("should print message to console", () => {
        const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

        // Call the print method
        readlineIO.print("Test message");

        // Check if console.log was called with the correct message
        expect(consoleSpy).toHaveBeenCalledWith("Test message");

        consoleSpy.mockRestore(); // Restore original console.log
    });

    it("should close the readline interface", () => {
        // Call the close method
        readlineIO.close();

        // Check if readline.close was called
        expect(mockClose).toHaveBeenCalled();
    });
});
