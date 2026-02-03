console.log("JS works3");

function setMode(activeBtn, inactiveBtn, showEl, hideEl) {
  activeBtn.classList.add('active');
  inactiveBtn?.classList.remove('active');
  showEl?.classList.remove('hidden');
  hideEl?.classList.add('hidden');
}

// basic/extended calculator

export function initCalculatorMode() {
  const basicBtn = document.querySelector('.basic-btn');
  const extendedBtn = document.querySelector('.extended-btn');

  if (!basicBtn || !extendedBtn) return;

  const calculatorBasic = document.querySelector('.calculator-basic');
  const calculatorExtended = document.querySelector('.calculator-extended');

  basicBtn.addEventListener("click", () => {
      setMode(basicBtn, extendedBtn, calculatorBasic, calculatorExtended);
  });

  extendedBtn.addEventListener("click", () => {
      setMode(extendedBtn, basicBtn, calculatorExtended);
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