import { Cell } from './cell';

export const winScenarios: Cell[][] = [
    // Horizontal
    ['TOP_LEFT', 'TOP_CENTER', 'TOP_RIGHT'],
    ['MIDDLE_LEFT', 'MIDDLE_CENTER', 'MIDDLE_RIGHT'],
    ['BOTTOM_LEFT', 'BOTTOM_CENTER', 'BOTTOM_RIGHT'],

    // Vertical
    ['TOP_LEFT', 'MIDDLE_LEFT', 'BOTTOM_LEFT'],
    ['TOP_CENTER', 'MIDDLE_CENTER', 'BOTTOM_CENTER'],
    ['TOP_RIGHT', 'MIDDLE_RIGHT', 'BOTTOM_RIGHT'],

    // Diagonal
    ['TOP_LEFT', 'MIDDLE_CENTER', 'BOTTOM_RIGHT'],
    ['TOP_RIGHT', 'MIDDLE_CENTER', 'BOTTOM_LEFT'],
];
