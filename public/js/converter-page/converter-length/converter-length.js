document.querySelectorAll('.numbers.converter').forEach(input => {
    input.addEventListener('input', e => {
        let v = e.target.value;

        v = v.replace(/[^0-9.,]/g, '');

        v = v.replace(/,/g, '.');

        const parts = v.split('.');
        if (parts.length > 2) {
            v = parts[0] + '.' + parts.slice(1).join('');
        }

        e.target.value = v;
    });
});

export function initConverterLength(){
    const inputStart = document.getElementById("number_start");
    const inputEnd = document.getElementById("number_end");
    const selectFrom = document.getElementById("from_unit");
    const selectTo = document.getElementById("to_unit");

    // Sprawdź, czy elementy istnieją
    if (!inputStart || !inputEnd || !selectFrom || !selectTo) return;

    const units = ["km", "m", "cm", "mm"];
    const factors = { km: 1000000, m: 1000, cm: 10, mm: 1 };


    // Dodajemy opcje tylko raz
    if (selectFrom.options.length === 0) {
        units.forEach(u => {
            const optionFrom = document.createElement("option");
            optionFrom.value = u;
            optionFrom.textContent = u;
            selectFrom.appendChild(optionFrom);

            const optionTo = document.createElement("option");
            optionTo.value = u;
            optionTo.textContent = u;
            selectTo.appendChild(optionTo);
        });
    }

    selectFrom.value = "km";
    selectTo.value = "m";

    function convert() {
        function formatNumber(num, precision = 10) {
             return Number(num.toPrecision(precision));
        }

        const rawValue = inputStart.value.replace(/[^\d.,]/g, '').replace(',', '.');
        const value = parseFloat(rawValue);
        if (isNaN(value)) {
            //console.log("trhre");
            inputEnd.value = "";
            return;
        }
        const result = (value * factors[selectFrom.value]) / factors[selectTo.value];
        inputEnd.value = formatNumber(result, 3);
    }

    inputStart.addEventListener("input", convert);
    selectFrom.addEventListener("change", convert);
    selectTo.addEventListener("change", convert);
};
