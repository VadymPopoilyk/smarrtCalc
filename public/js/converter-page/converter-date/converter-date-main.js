import { validateBlock, validateRange, parseBlock, diffDates } from './converter-date-validator.js';

export function initConverterDate() {
  const dayOutput = document.querySelector('.output.day');
  const monthOutput = document.querySelector('.output.month');
  const yearOutput = document.querySelector('.output.year');

  const submitBtn = document.querySelector('.submit-btn');
  const clearBtn = document.querySelector('.clear-btn');

  if (!submitBtn) return;
  document.querySelectorAll('.date-part').forEach(input => {
    input.addEventListener('input', () => {
      // only numbers
      input.value = input.value.replace(/\D/g, '');
    });
  });
  document.querySelectorAll('.date-input').forEach(block => {

    const nativeInput = block.querySelector('.native-date');
    const calendarBtn = block.querySelector('.calendar-btn');

    const dayInput = block.querySelector('.day');
    const monthInput = block.querySelector('.month');
    const yearInput = block.querySelector('.year');


    // date picker btn
    calendarBtn.addEventListener('click', () => {
      if (nativeInput.showPicker) {
        nativeInput.showPicker();   // Chrome
      } else {
        nativeInput.click();        // fallback
      }
    });

    nativeInput.addEventListener('change', () => {
      if (!nativeInput.value) return;

      const [year, month, day] = nativeInput.value.split('-');

      dayInput.value = day;
      monthInput.value = month;
      yearInput.value = year;

      block.querySelectorAll('.text-error').forEach(el => {
        el.classList.remove('text-error');
      });
    });
  });

  // clear btn
  clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.date-input').forEach(block => {
      const nativeInput = block.querySelector('.native-date');
      const dayInput = block.querySelector('.day');
      const monthInput = block.querySelector('.month');
      const yearInput = block.querySelector('.year');

      nativeInput.value = '';
      dayInput.value = '';
      monthInput.value = '';
      yearInput.value = '';
      block.classList.remove('box-error');

      block.querySelectorAll('.text-error').forEach(el => {
        el.classList.remove('text-error');
      });
    });

    // outputs
    dayOutput.value = '';
    monthOutput.value = '';
    yearOutput.value = '';
  });

  //date validator
  const blocks = document.querySelectorAll('.date-input');
  const fromBlock = blocks[0];
  const tillBlock = blocks[1];

  blocks.forEach(block => {
    const inputs = block.querySelectorAll('.date-part');

    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateBlock(block);
        validateRange(fromBlock, tillBlock);
      });
    });
  });

  //main function

  submitBtn.addEventListener('click', () => {
    const blocks = document.querySelectorAll('.date-input');

    const fromBlock = blocks[0];
    const tillBlock = blocks[1];

    const validFrom = validateBlock(fromBlock);
    const validTill = validateBlock(tillBlock);
    const validRange = validateRange(fromBlock, tillBlock);

    if (!validFrom || !validTill || !validRange) return;

    const fromDate = parseBlock(fromBlock);
    const tillDate = parseBlock(tillBlock);

    if (!fromDate || !tillDate) {
      !fromDate && fromBlock.classList.add('box-error');
      !tillDate && tillBlock.classList.add('box-error');
      return;
    }

    [fromBlock, tillBlock].forEach(b => b.classList.remove('box-error'));

    const diff = diffDates(fromDate, tillDate);

    yearOutput.value = diff.years;
    monthOutput.value = diff.months;
    dayOutput.value = diff.days;
  });

}
