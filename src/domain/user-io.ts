export interface UserIO {
    question(query: string, callback: (answer: string) => void): void;
    print(message: string): void;
    close(): void;
}