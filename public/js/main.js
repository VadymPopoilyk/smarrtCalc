console.log("JS works");

import './partials.js';
import './navigations.js';
import './function-pages.js';
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