import { calculateExpression } from './parser.js';

function normalizeUnaryMinus(expr) {
    // замінюємо початковий - на (0-...)
    expr = expr.replace(/^-\s*/g, '0-');

    // замінюємо (+- , *- , /- , (- ) на (0-...)
    expr = expr.replace(/([\+\-\*\/\(])\s*-\s*(\d+\.?\d*|\()/g, '$1(0-$2)');

    return expr;
}