import { handleInput } from './handlers.js';

const buttons = document.querySelectorAll('.calculator-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    handleInput(btn.textContent.trim());
  });
});
