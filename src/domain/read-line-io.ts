import { UserIO } from './user-io';
import * as readline from 'node:readline';

export class ReadLineIO implements UserIO {
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    question(query: string, callback: (answer: string) => void): void {
        this.rl.question(query, callback);
    }

    print(message: string): void {
        console.log(message);
    }

    close(): void {
        this.rl.close();
    }
}