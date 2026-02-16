console.log("JS works");

//main
import './partials.js';
import './navigations.js';

//function-page
import './function-page/function-page-main.js';
import './function-page/function-page-validator.js';
import './function-page/function-calculating.js';

//calculator-page
import './calculator-page/state.js';
import './calculator-page/parser.js';
import './calculator-page/ui.js';
import './calculator-page/handlers.js';
import './calculator-page/events.js';
import './calculator-page/normalizer.js';

//converter-page
import './converter-page/converter-length/converter-length.js';

import './converter-page/converter-date/converter-date-main.js';
import './converter-page/converter-date/converter-date-validator.js';


import { initLayout } from './partials.js';
import { initNavigation } from './navigations.js';
import { initConverterNav } from './navigations.js';

import { initCalculatorMode } from './navigations.js';

import {initFunctionPage} from './function-page/function-page-main.js';
import {initConverterLength} from './converter-page/converter-length/converter-length.js';
import {initConverterDate} from './converter-page/converter-date/converter-date-main.js';

async function initApp() {
  await initLayout();

  initNavigation();  
  initConverterNav();

  initCalculatorMode();

  initFunctionPage();

  initConverterLength();
  initConverterDate();
}

initApp();