import { Player } from './player';
import { Cell } from './cell';

export type Game = {
    state: 'InProgress' | 'Won';
    board: Map<Cell, Player>;
    player: Player;
};
