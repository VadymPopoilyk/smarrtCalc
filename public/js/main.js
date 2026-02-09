console.log("JS works");

import './partials.js';
import './navigations.js';
import './function-page.js';
import './calculator-page/state.js';
import './calculator-page/parser.js';
import './calculator-page/ui.js';
import './calculator-page/handlers.js';
import './calculator-page/events.js';
import './calculator-page/normalizer.js';
import './function-page.js';
import './converter-dlugosc.js';

import { initLayout } from './partials.js';
import { initNavigation } from './navigations.js';
import { initCalculatorMode } from './navigations.js';

async function initApp() {
  await initLayout();   // вставка DOM
  initNavigation();     // логіка після DOM
  initCalculatorMode();
}

initApp();