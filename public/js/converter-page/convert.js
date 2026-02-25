export function convert(value, fromUnit, toUnit, factors, precision = 6, isCurrency = false) {
    function formatResult(result) {
        if (!isFinite(result)) return "";

        const abs = Math.abs(result);

        if (abs >= 1e15 || (abs > 0 && abs < 1e-6)) {
            return result.toExponential(6);
        }

        return result;
    }
    
    const numericValue = parseFloat(
        value.replace(/[^\d.,]/g, '').replace(',', '.')
    );

    if (isNaN(numericValue)) return "";

    let result = 0;

    if (isCurrency === true) {
        result = (numericValue / factors[fromUnit]) * factors[toUnit];
        return result.toFixed(precision);
    } else {
        result = (numericValue * factors[fromUnit]) / factors[toUnit];
        return formatResult(result);
    }
    
}