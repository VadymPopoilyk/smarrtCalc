//date helpers

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(month, year) {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

function format2(val) {
  return val.padStart(2, '0');
}

function isValidDate(day, month, year) {
  if (!day || !month || !year) return false;

  day = Number(day);
  month = Number(month);
  year = Number(year);

  if (month < 1 || month > 12) return false;
  if (year < 0 || year > 9999) return false;

  const maxDays = getDaysInMonth(month, year);
  if (day < 1 || day > maxDays) return false;

  return true;
}
//date object

function toDate(day, month, year) {
  return new Date(year, month - 1, day);
}

//valide block

export function validateBlock(block) {
  const d = block.querySelector('.day');
  const m = block.querySelector('.month');
  const y = block.querySelector('.year');

  const day = d.value;
  const month = m.value;
  const year = y.value;

  // якщо не все заповнено — не валідимо
  if (!(day && month && year)) return true;

  if (!isValidDate(day, month, year)) {
    [d, m, y].forEach(i => i.classList.add('date-error'));
    return false;
  }

  // автоформат
  d.value = format2(day);
  m.value = format2(month);

  [d, m, y].forEach(i => i.classList.remove('date-error'));
  return true;
}

// from <= till

export function validateRange(fromBlock, tillBlock) {
  const fd = fromBlock.querySelector('.day').value;
  const fm = fromBlock.querySelector('.month').value;
  const fy = fromBlock.querySelector('.year').value;

  const td = tillBlock.querySelector('.day').value;
  const tm = tillBlock.querySelector('.month').value;
  const ty = tillBlock.querySelector('.year').value;

  if (!(fd && fm && fy && td && tm && ty)) return true;

  if (!isValidDate(fd, fm, fy) || !isValidDate(td, tm, ty)) return false;

  const fromDate = toDate(fd, fm, fy);
  const tillDate = toDate(td, tm, ty);

  if (fromDate > tillDate) {
    [fromBlock, tillBlock].forEach(b => b.classList.add('error'));
    return false;
  }

  [fromBlock, tillBlock].forEach(b => b.classList.remove('error'));
  return true;
}


export function parseBlock(block) {
  const d = block.querySelector('.day').value;
  const m = block.querySelector('.month').value;
  const y = block.querySelector('.year').value;

  if (!(d && m && y)) return null;
  return new Date(y, m - 1, d);
}

export function diffDates(fromDate, tillDate) {
  if (fromDate > tillDate) {
    [fromDate, tillDate] = [tillDate, fromDate];
  }

  let years = tillDate.getFullYear() - fromDate.getFullYear();
  let months = tillDate.getMonth() - fromDate.getMonth();
  let days = tillDate.getDate() - fromDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(tillDate.getFullYear(), tillDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}
