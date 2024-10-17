import { UserIO } from './user-io';
import * as readline from 'node:readline';

export class ReadLineIO implements UserIO {
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    question(query: string, callback: (answer: string) => void): void {
        throw new Error('Method not implemented.');
    }

    print(message: string): void {
        throw new Error('Method not implemented.');
    }

    close(): void {
        throw new Error('Method not implemented.');
    }
}