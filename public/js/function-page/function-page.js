document.querySelectorAll('.numbers.function').forEach(input => {
  input.addEventListener('input', e => {
    let v = e.target.value;

    v = v.replace(/[^0-9.,-]/g, '');

    v = v.replace(/,/g, '.');

    v = v.replace(/(?!^)-/g, '');

    const parts = v.split('.');
    if (parts.length > 2) {
      v = parts[0] + '.' + parts.slice(1).join('');
    }

    e.target.value = v;
  });
});

const aInput = document.getElementById('a');
const bInput = document.getElementById('b');
const cInput = document.getElementById('c');

const x0Input = document.getElementById('zero'); // x₀
const x1Input = document.getElementById('one');  // x₁
const x2Input = document.getElementById('two');  // x₂
const deltaInput = document.getElementById('delta-input');  // x₂

const formResultXLessZero = document.querySelector('.form-result-x-less-zero');
const formResultX0 = document.querySelector('.form-result-x0');
const formResultX1X2 = document.querySelector('.form-result-x1-x2');
const formDeltaResult = document.querySelector('.delta-result');

const calculateBtn = document.getElementById('calculate');
const clearBtn = document.querySelector('.clear-btn');

document.addEventListener("DOMContentLoaded", function () {
    if (!calculateBtn || !aInput || !bInput || !cInput) return;

    clearBtn.addEventListener('click', () => {

        formResultXLessZero.style.display = 'none';
        formResultX0.style.display = 'none';
        formResultX1X2.style.display = 'none';
        formDeltaResult.style.display = 'none';

        x1Input.value = '';
        x2Input.value = '';
        x0Input.value = '';
        deltaInput.value = '';

        aInput.value = '';
        bInput.value = '';
        cInput.value = '';
    })



    calculateBtn.addEventListener('click', () => {
        const a = Number(aInput.value);
        const b = Number(bInput.value);
        const c = Number(cInput.value);

        x1Input.value = '';
        x2Input.value = '';
        x0Input.value = '';

        // reset wszystkich wyników


        formResultXLessZero.style.display = 'none';
        formResultX0.style.display = 'none';
        formResultX1X2.style.display = 'none';

        const delta = (b) * (b) - 4 * (a) * (c);

        deltaInput.value = delta;

        if (delta < 0) {
            formResultXLessZero.style.display = 'block';
            formDeltaResult.style.display = 'flex';
            return;
        }

        else if (Math.abs(delta) < 0.0000000001) {
            x0Input.value = (-b / (2 * a)).toFixed(2);
            formResultX0.style.display = 'flex';
            formDeltaResult.style.display = 'flex';

            if (x0Input.value === 'NaN') {
                x0Input.value = 'n/a';
                deltaInput.value = 'n/a';
            }
        }

        else if (delta > 0) {
            const sqrtDelta = Math.sqrt(delta);
            x1Input.value = ((-b - sqrtDelta) / (2 * a)).toFixed(2);
            x2Input.value = ((-b + sqrtDelta) / (2 * a)).toFixed(2);
            formResultX1X2.style.display = 'flex';
            formDeltaResult.style.display = 'flex';

            if (x1Input.value === 'NaN') {
                x0Input.value = 'Błąd';
            }
        }

        else {
            console.log("error");
            return;
        }
    });
});

