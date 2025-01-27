import { Player } from './player';

export type GameState = {
    state: 'InProgress' | 'Won';
    player: Player;
};
