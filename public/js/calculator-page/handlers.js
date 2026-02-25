import { state } from './state.js';
import { calculateExpression } from './parser.js';
import { updateScreen } from './ui.js';

//helpers
const OPERATORS = new Set(['+', '-', '*', '/', '^', '%']);

const normalize = v => v
  .replace('÷', '/')
  .replace('×', '*')
  .replace(',', '.')
  .replace('√', 'sqrt')
  .replace('∛', 'cbrt');

const lastChar = () => state.expression?.slice(-1) || '';
const isLastCharOperator = () => OPERATORS.has(lastChar());
const isLastCharOpenParen = () => lastChar() === '(';

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

const getLastNumberOrGroup = expr => expr.match(/(\d+\.?\d*|\([^()]+\))$/);

const extractValue = target =>
  target.startsWith('(')
    ? calculateExpression(target.slice(1, -1))
    : parseFloat(target);

const isPureNumber = expr => /^-?\d+(\.\d+)?$/.test(expr);

const lastNumberHasDot = () => {
  const m = state.expression.match(/(\d+\.?\d*)$/);
  return m ? m[0].includes('.') : false;
};

const canApplyPercent = () => /[0-9)]/.test(lastChar());

const replaceLast = (regex, value) => {
  state.expression = state.expression.replace(regex, value);
};

const safeCalc = expr => {
  try { return calculateExpression(expr); }
  catch { return NaN; }
};

//handle input
export function handleInput(raw) {
  const value = normalize(raw);

  //NaN lock
  if (state.expression === 'NaN') {
    if (value === 'AC') {
      state.expression = '';
      updateScreen();
    }
    return;
  }

  //AC
  if (value === 'AC') {
    Object.assign(state, {
      expression: '',
      powerMode: false,
      baseValue: null
    });
    updateScreen();
    return;
  }

  //DOT
  if (value === '.') {
    if (!state.expression) return;
    if (isLastCharOperator() || isLastCharOpenParen()) return;
    if (lastNumberHasDot()) return;
    state.expression += '.';
    updateScreen();
    return;
  }

  //POWER MODE (=)
  if (value === '=' && state.powerMode) {
    const exp = parseFloat(state.expression || '0');
    state.expression = Math.pow(state.baseValue, exp).toString();
    state.powerMode = false;
    state.baseValue = null;
    updateScreen();
    return;
  }

  if (state.powerMode && OPERATORS.has(value) && value !== '=') return;

  //EQUAL
  if (value === '=') {
    if (!isLastCharOperator()) {
      const res = safeCalc(state.expression);
      state.expression = isNaN(res) ? '' : res.toString();
      updateScreen();
    }
    return;
  }

  //+/-
  if (value === '+/-') {
    if (!state.expression) {
      state.expression = '0-';
      updateScreen();
      return;
    }

    const m = getLastNumberOrGroup(state.expression);
    if (!m) return;

    const target = m[1];

    if (target.startsWith('(0-')) {
      replaceLast(/\(0\-(\d+\.?\d*|\([^()]+\))\)$/, '$1');
    } else {
      replaceLast(/(\d+\.?\d*|\([^()]+\))$/, `(0-${target})`);
    }

    updateScreen();
    return;
  }

  //%
  if (value === '%') {
    if (!canApplyPercent()) return;

    const expr = state.expression;
    const rules = [
      { r: /(\d+\.?\d*)\-(\d+\.?\d*)$/, f: (A,B)=>`(${A}-(${A}*${B}/100))` },
      { r: /(\d+\.?\d*)\+(\d+\.?\d*)$/, f: (A,B)=>`(${A}+(${A}*${B}/100))` },
      { r: /(\d+\.?\d*)\*(\d+\.?\d*)$/, f: (A,B)=>`(${A}*(${B}/100))` },
      { r: /(\d+\.?\d*)\/(\d+\.?\d*)$/, f: (A,B)=>`(${A}/(${B}/100))` },
    ];

    for (const {r,f} of rules) {
      const m = expr.match(r);
      if (m) {
        const [,A,B] = m;
        state.expression = f(A,B);
        updateScreen();
        return;
      }
    }

    replaceLast(/(\d+\.?\d*)$/, '($1/100)');
    updateScreen();
    return;
  }

  //POWERS
  if (value === 'x²' || value === 'x³') {
    const pow = value === 'x²' ? 2 : 3;
    const m = getLastNumberOrGroup(state.expression);
    if (!m) return;

    const num = extractValue(m[1]);
    replaceLast(/(\d+\.?\d*|\([^()]+\))$/, Math.pow(num, pow).toString());
    updateScreen();
    return;
  }

  //x^n
  if (value === 'xⁿ') {
    const m = getLastNumberOrGroup(state.expression);
    if (!m) return;

    state.baseValue = extractValue(m[1]);
    state.powerMode = true;

    replaceLast(/(\d+\.?\d*|\([^()]+\))$/, '');
    updateScreen();
    return;
  }

  //LOG
  if (value === 'log') {
    const m = getLastNumberOrGroup(state.expression);
    if (!m) return;

    const num = extractValue(m[1]);
    if (num <= 0) {
      state.expression = 'NaN';
      updateScreen();
      return;
    }

    replaceLast(/(\d+\.?\d*|\([^()]+\))$/, Math.log10(num).toString());
    updateScreen();
    return;
  }

  //SQRT
  if (value === 'sqrt') {
    const expr = state.expression.trim();
    if (!isPureNumber(expr)) return;

    const num = Number(expr);
    if (num < 0) return;

    state.expression = Math.sqrt(num).toString();
    updateScreen();
    return;
  }

  //CBRT
  if (value === 'cbrt') {
    const expr = state.expression.trim();
    if (!isPureNumber(expr)) {
      state.expression = 'NaN';
      updateScreen();
      return;
    }

    const num = Number(expr);
    if (num < 0) {
      state.expression = 'NaN';
      updateScreen();
      return;
    }

    state.expression = Math.cbrt(num).toString();
    updateScreen();
    return;
  }

  //OPERATORS
  if (['+', '-', '*', '/'].includes(value)) {
    if (!state.expression) return;

    const expr = state.expression;
    const lastChar = expr.slice(-1);
    const prevChar = expr.slice(-2, -1);

    // 🔹 якщо останній символ оператор
    if (isOperator(lastChar)) {
        // ❗ якщо це випадок типу 5*-  (унарний мінус)
        if (lastChar === '-' && isOperator(prevChar)) {
            // замінюємо тільки мінус
            state.expression = expr.slice(0, -1) + value;
        } else {
            // звичайна заміна оператора
            state.expression = expr.slice(0, -1) + value;
        }

        updateScreen();
        return;
    }

    // якщо все ок — просто додаємо оператор
    state.expression += value;
    updateScreen();
    return;
}

  //DEFAULT
  state.expression += value;
  updateScreen();
}
