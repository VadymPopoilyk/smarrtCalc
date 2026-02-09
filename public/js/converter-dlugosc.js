document.querySelectorAll('.numbers').forEach(input => {
    input.addEventListener('input', e => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
});

   document.addEventListener("DOMContentLoaded", function() {
    const inputStart = document.getElementById("number_start");
    const inputEnd = document.getElementById("number_end");
    const selectFrom = document.getElementById("from_unit");
    const selectTo = document.getElementById("to_unit");

    // Sprawdź, czy elementy istnieją
    if (!inputStart || !inputEnd || !selectFrom || !selectTo) {
        console.error("Nie znaleziono elementów konwertera w DOM!");
        return; // przerywamy, żeby nie było błędu
    }   

    const units = ["km", "m", "cm", "mm"];
    const factors = { km: 1, m: 10, cm: 1000, mm: 1000000 };

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
        
        const rawValue = inputStart.value.replace(/[^\d.,]/g, '').replace(',', '.');
        const value = parseFloat(rawValue);
        if (isNaN(value)) {
            //console.log("trhre");
            inputEnd.value = "";
            return;
        }
        inputEnd.value = (value * factors[selectFrom.value]) / factors[selectTo.value];
    }

    inputStart.addEventListener("input", convert);
    selectFrom.addEventListener("change", convert);
    selectTo.addEventListener("change", convert);
});
