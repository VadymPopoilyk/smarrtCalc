export function converterInputValidator() {
    document.querySelectorAll('.converter-number-input').forEach(input => {
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
}
