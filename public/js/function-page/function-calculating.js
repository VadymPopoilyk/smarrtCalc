export function calculateFunction(a, b, c) {
  const delta = b * b - 4 * a * c;

  if (delta < 0) {
    return {
      delta,
      type: 'no-roots'
    };
  }

  if (Math.abs(delta) < 0.0000000001) {
    return {
      delta,
      type: 'one-root',
      x0: -b / (2 * a)
    };
  }

  const sqrtDelta = Math.sqrt(delta);

  return {
    delta,
    type: 'two-roots',
    x1: (-b - sqrtDelta) / (2 * a),
    x2: (-b + sqrtDelta) / (2 * a)
  };
}
