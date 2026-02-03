// fetch('../partials/header.html')
//   .then(res => res.text())
//   .then(html => {
//     document.getElementById('header').innerHTML = html;
//   });

// fetch('../partials/footer.html')
//   .then(res => res.text())
//   .then(html => {
//     document.getElementById('footer').innerHTML = html;
//   });


async function loadPartial(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  return await res.text();
}

export async function initLayout() {
  const headerHTML = await loadPartial('../partials/header.html');
  const footerHTML = await loadPartial('../partials/footer.html');

  document.querySelector('#header').innerHTML = headerHTML;
  document.querySelector('#footer').innerHTML = footerHTML;

    initDynamicData();
}

function initDynamicData() {
    const page = document.body.dataset.page;   // home, about, contact
    const title = document.body.dataset.title; // Назва сторінки
    // 🔹 Заголовок у хедері
    const titleEl = document.querySelector('.page-title');
    if (titleEl) titleEl.textContent = title;

    // 🔹 Активні кнопки (header + footer)
    document.querySelectorAll('[data-link]').forEach(link => {
        if (link.dataset.link === page) {
        link.classList.add('active');
        }
    });

    
  
}




  
