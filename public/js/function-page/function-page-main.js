import { calculateFunction } from './function-calculating.js';
import { validateFunctionInputs } from './function-page-validator.js';

export function initFunctionPage() {

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

    if (!aInput) return;

    const deltaBlock = document.querySelector('.delta-result');
    const deltaInput = deltaBlock.querySelector('.result-input');

    const resultError = document.querySelector('.result-error');
    const x0Block = document.querySelector('.x0');
    const x1Block = document.querySelector('.x1');
    const x2Block = document.querySelector('.x2');

    const x0Input = x0Block.querySelector('.result-input');
    const x1Input = x1Block.querySelector('.result-input');
    const x2Input = x2Block.querySelector('.result-input');

    const calculateBtn = document.querySelector('.submit');
    const clearBtn = document.querySelector('.clear-btn');

    function hideAll() {
        deltaBlock.classList.add('hidden');
        resultError.classList.add('hidden');
        x0Block.classList.add('hidden');
        x1Block.classList.add('hidden');
        x2Block.classList.add('hidden');
    }

    function setError(input) {
        input.closest('.form-container').classList.add('box-error');
    }

    function clearErrors() {
        document.querySelectorAll('.form-container')
            .forEach(el => el.classList.remove('box-error'));
    }

    function clearAll() {
        aInput.value = '';
        bInput.value = '';
        cInput.value = '';
        x0Input.value = '';
        x1Input.value = '';
        x2Input.value = '';
        deltaInput.value = '';
        hideAll();
        clearErrors();
    }

    clearBtn.addEventListener('click', clearAll);

    calculateBtn.addEventListener('click', () => {

        hideAll();
        clearErrors();

        const a = aInput.value.trim();
        const b = bInput.value.trim();
        const c = cInput.value.trim();

        const validation = validateFunctionInputs(a);


        if (!validation.isValid) {
            if (validation.a) setError(aInput);
            return;
        }

        const result = calculateFunction(
            Number(a),
            Number(b),
            Number(c)
        );

        deltaInput.value = result.delta.toFixed(2);
        deltaBlock.classList.remove('hidden');

        if (result.type === 'no-roots') {
            resultError.classList.remove('hidden');
            return;
        }

        if (result.type === 'one-root') {
            x0Input.value = result.x0.toFixed(2);
            x0Block.classList.remove('hidden');
            return;
        }

        if (result.type === 'two-roots') {
            x1Input.value = result.x1.toFixed(2);
            x2Input.value = result.x2.toFixed(2);
            x1Block.classList.remove('hidden');
            x2Block.classList.remove('hidden');
        }

    });

}
