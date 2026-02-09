import { state } from './state.js';

export const screen = document.querySelector('.result');


export function updateScreen() {
    screen.textContent = state.expression || '0';
    screen.parentElement.scrollLeft = screen.parentElement.scrollWidth;
}
