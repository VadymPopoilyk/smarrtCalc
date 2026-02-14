import { calculateExpression } from './parser.js';

function normalizeUnaryMinus(expr) {
    // замінюємо початковий - на (0-...)
    expr = expr.replace(/^-\s*/g, '0-');

    // замінюємо (+- , *- , /- , (- ) на (0-...)
    expr = expr.replace(/([\+\-\*\/\(])\s*-\s*(\d+\.?\d*|\()/g, '$1(0-$2)');

    return expr;
}

function normalizePercent(expr) {
    // 180-50% → 180-(180*50/100)
    expr = expr.replace(
        /(\d+\.?\d*)\s*-\s*(\d+\.?\d*)%/g,
        '($1-($1*$2/100))'
    );

    // 180+50%
    expr = expr.replace(
        /(\d+\.?\d*)\s*\+\s*(\d+\.?\d*)%/g,
        '($1+($1*$2/100))'
    );

    // 180*50%
    expr = expr.replace(
        /(\d+\.?\d*)\s*\*\s*(\d+\.?\d*)%/g,
        '($1*($2/100))'
    );

    // 180/50%
    expr = expr.replace(
        /(\d+\.?\d*)\s*\/\s*(\d+\.?\d*)%/g,
        '($1/($2/100))'
    );

    // %
    expr = expr.replace(/(\d+\.?\d*)%/g, '($1/100)');

    return expr;
}