async function loadPartial(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  return await res.text();
}

let headerCache = null;
let footerCache = null;

export async function initLayout() {
  if (!headerCache) {
    headerCache = await loadPartial('../partials/header.html');
  }

  if (!footerCache) {
    footerCache = await loadPartial('../partials/footer.html');
  }

  document.getElementById('header').innerHTML = headerCache;
  document.getElementById('footer').innerHTML = footerCache;

  initDynamicData();
}

function initDynamicData() {
  const page = document.body.dataset.page;
  const title = document.body.dataset.title;

  const titleEl = document.querySelector('.page-title');
  if (titleEl) titleEl.textContent = title;

  document.querySelectorAll('[data-link]').forEach(link => {
    if (link.dataset.link === page) {
      link.classList.add('active-nav-item');
    }
  });
}
