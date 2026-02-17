export function convert(value, fromUnit, toUnit, factors, precision = 6, isCurrency = false) {
    const numericValue = parseFloat(
        value.replace(/[^\d.,]/g, '').replace(',', '.')
    );

    if (isNaN(numericValue)) return "";

    let result = 0;

    if(isCurrency === true){
        result = (numericValue * factors[fromUnit]) * factors[toUnit];
    }else{
        result = (numericValue * factors[fromUnit]) / factors[toUnit];
    }


    const fixed = Number(result).toFixed(precision);

    return fixed.replace(/\.?0+$/, "");
}