import { convert } from "./convert.js";
import { converterInputValidator } from './converter-input-validator.js';

export function initConverter(config) {
    if (!config) return;
    const {
        inputStartId,
        textEndId,
        selectFromId,
        selectToId,
        units,
        factors,
        defaultFrom,
        defaultTo,
        precision,
        isCurrency
    } = config;


    if (!inputStartId) return;

    const inputStart = document.getElementById(inputStartId);
    const textEnd = document.getElementById(textEndId)
    const selectFrom = document.getElementById(selectFromId);
    const selectTo = document.getElementById(selectToId);

    if (!inputStart || !selectFrom || !selectTo || !textEnd) return;

    converterInputValidator();

    if (selectFrom.options.length === 0) {
        units.forEach(u => {
            selectFrom.appendChild(new Option(u, u));
            selectTo.appendChild(new Option(u, u));
        });
    }


    selectFrom.value = defaultFrom;
    selectTo.value = defaultTo;

    function handleConvert() {
        const result = convert(
            inputStart.value,
            selectFrom.value,
            selectTo.value,
            factors,
            precision,
            isCurrency,
        );
        textEnd.textContent = result;
    }

    inputStart.addEventListener("input", handleConvert);
    selectFrom.addEventListener("change", handleConvert);
    selectTo.addEventListener("change", handleConvert);
}