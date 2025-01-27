import { Player } from './player';
import { Cell } from './cell';

export type Game = {
    state: 'InProgress' | 'Won';
    board: Record<Cell, Player>;
    player: Player;
};
