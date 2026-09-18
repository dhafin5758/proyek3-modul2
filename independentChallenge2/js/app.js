'use strict';

const tombolFaq = document.querySelectorAll('.faq-pertanyaan');

tombolFaq.forEach((tombol) => {
  tombol.addEventListener('click', () => {
    const sudahTerbuka = tombol.getAttribute('aria-expanded') === 'true';

    tombolFaq.forEach((t) => {
      t.setAttribute('aria-expanded', 'false');
      t.parentElement.nextElementSibling.classList.remove('terbuka');
    });

    if (!sudahTerbuka) {
      tombol.setAttribute('aria-expanded', 'true');
      tombol.parentElement.nextElementSibling.classList.add('terbuka');
    }
  });
});
