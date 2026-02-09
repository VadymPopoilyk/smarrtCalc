document.querySelectorAll('.numbers').forEach(input => {
    input.addEventListener('input', e => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
});

document.addEventListener('DOMContentLoaded', () => {

const aInput = document.getElementById('a');
const bInput = document.getElementById('b');
const cInput = document.getElementById('c');

const x0Input = document.getElementById('zero'); // x₀
const x1Input = document.getElementById('one');  // x₁
const x2Input = document.getElementById('two');  // x₂

document.getElementById('calculate').addEventListener('click', () => {
    const a = Number(aInput.value);
    const b = Number(bInput.value);
    const c = Number(cInput.value);

    x1Input.value = '';
    x2Input.value = '';
    x0Input.value = '';

    // reset wszystkich wyników
    const formResultXLessZero = document.querySelector('.form-result-x-less-zero');
    const formResultX0 = document.querySelector('.form-result-x0');
    const  formResultX1X2 = document.querySelector('.form-result-x1-x2');

    formResultXLessZero.style.display = 'none';
    formResultX0.style.display = 'none';
    formResultX1X2.style.display = 'none';

    const delta = b * b - 4 * a * c;

    if(delta < 0){
        formResultXLessZero.style.display = 'block';
        return;
    }

    else if (Math.abs(delta) < 0.000001) {
        x0Input.value = (-b / (2 * a)).toFixed(2);
        formResultX0.style.display = 'flex';
    } 

    else {
        const sqrtDelta = Math.sqrt(delta);
        x1Input.value = ((-b - sqrtDelta) / (2 * a)).toFixed(2);
        x2Input.value = ((-b + sqrtDelta) / (2 * a)).toFixed(2);
        formResultX1X2.style.display = 'flex';
    }

});
});