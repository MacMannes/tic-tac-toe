import { Player } from './player';

export type GameState = {
    state: 'InProgress' | 'Won' | 'Draw';
    player: Player;
};
