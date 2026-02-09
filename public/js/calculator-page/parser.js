export function calculateExpression(expr) {
  expr = expr.replace(/\s+/g, '');

  expr = expr
    .replace(/^\-/g, '0-')    
    .replace(/\(\-/g, '(0-')  
    .replace(/\*\-/g, '*(0-') 
    .replace(/\/\-/g, '/(0-')  
    .replace(/\+\-/g, '+(0-')     
    .replace(/\-\-/g, '-(0-');    

  const tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/|\(|\))/g);
  if (!tokens) return 'Error';

  const output = [];
  const ops = [];
  const prec = { '+': 1, '-': 1, '*': 2, '/': 2 };

  tokens.forEach(token => {
    if (!isNaN(token)) {
      output.push(token);
    } 
    else if ('+-*/'.includes(token)) {
      while (
        ops.length &&
        '+-*/'.includes(ops[ops.length - 1]) &&
        prec[ops[ops.length - 1]] >= prec[token]
      ) {
        output.push(ops.pop());
      }
      ops.push(token);
    } 
    else if (token === '(') {
      ops.push(token);
    } 
    else if (token === ')') {
      while (ops.length && ops[ops.length - 1] !== '(') {
        output.push(ops.pop());
      }
      ops.pop();
    }
  });

  while (ops.length) output.push(ops.pop());

  // RPN evaluate
  const stack = [];

  output.forEach(token => {
    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();

      switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(b === 0 ? "Error" : a / b); break;
      }
    }
  });

  return stack[0];
}
