import { Player } from './player';

export type Game = {
    state: 'InProgress' | 'Won';
    board: Record<string, Player>;
    player: Player;
};
