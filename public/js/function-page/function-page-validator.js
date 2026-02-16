export function validateFunctionInputs(aRaw, bRaw, cRaw) {

  const errors = {
    a: false,
    isValid: true
  };

  const a = Number(aRaw);

  if (aRaw.trim() === '' || isNaN(a) || a === 0) {
    errors.a = true;
    errors.isValid = false;
  }

  return errors;
}