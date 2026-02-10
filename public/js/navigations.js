console.log("JS works3");

function setMode(activeBtn, inactiveBtn, showEl, hideEl) {
  activeBtn.classList.add('active');
  inactiveBtn?.classList.remove('active');
  showEl?.classList.remove('hidden');
  hideEl?.classList.add('hidden');
}

// basic/extended calculator

export function initCalculatorMode() {
  const navBasicBtn = document.querySelector('.nav-basic-btn');
  const navExtendedBtn = document.querySelector('.nav-extended-btn');

  if (!navBasicBtn || !navExtendedBtn) return;

  const calculatorBasic = document.querySelector('.calculator-basic');
  const calculatorExtended = document.querySelector('.calculator-extended');

  navBasicBtn.addEventListener("click", () => {
    setMode(navBasicBtn, navExtendedBtn, calculatorBasic, calculatorExtended);
  });

  navExtendedBtn.addEventListener("click", () => {
    setMode(navExtendedBtn, navBasicBtn, calculatorExtended);
  });
}

//converter-page nav

export function converterNav() {
  const buttons = document.querySelectorAll('.converter-btn');
  const sections = document.querySelectorAll('.converter-section');

  if (!buttons.length || !sections.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;

      // active кнопки
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // показ секцій
      sections.forEach(section => {
        section.classList.toggle(
          'hidden',
          section.dataset.section !== target
        );
      });
    });
  });
}


//footer nav

export function initNavigation() {
  const page = document.body.dataset.page;
  if (!page) return;

  document.querySelectorAll('[data-link]').forEach(link => {
    if (link.dataset.link === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}