// Start the game
import { Game } from './domain/game';
import { ReadLineIO } from './domain/read-line-io';

const game = new Game(new ReadLineIO());
game.start();