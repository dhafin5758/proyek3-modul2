'use strict';

const tombolNav = document.querySelector('.nav-toggle');
const navUtama = document.querySelector('#nav-utama');

tombolNav.addEventListener('click', () => {
  const terbuka = navUtama.classList.toggle('terbuka');
  tombolNav.setAttribute('aria-expanded', String(terbuka));
});

navUtama.querySelectorAll('.nav-link').forEach((tautan) => {
  tautan.addEventListener('click', () => {
    navUtama.classList.remove('terbuka');
    tombolNav.setAttribute('aria-expanded', 'false');
  });
});

const materi = [
  {
    judul: 'Web Exploitation',
    tingkat: 'Dasar',
    deskripsi: 'Mengenali kerentanan umum pada aplikasi web di lingkungan latihan resmi, sambil memahami kenapa kerentanan itu bisa terjadi.',
  },
  {
    judul: 'Cryptography',
    tingkat: 'Dasar',
    deskripsi: 'Memecahkan pesan yang disandikan dengan skema klasik hingga modern, plus intuisi kapan sebuah skema terlihat lemah.',
  },
  {
    judul: 'Forensics',
    tingkat: 'Lanjutan',
    deskripsi: 'Menganalisis berkas, gambar, dan lalu lintas jaringan untuk menemukan jejak informasi yang disembunyikan.',
  },
  {
    judul: 'Reverse Engineering',
    tingkat: 'Lanjutan',
    deskripsi: 'Membaca alur program terkompilasi untuk memahami logika di baliknya, dimulai dari contoh-contoh sederhana.',
  },
];

const daftarMateri = document.querySelector('#daftar-materi');
const filterTingkat = document.querySelector('#filter-tingkat');
const statusFilter = document.querySelector('#status-filter');

function buatKartuMateri(item) {
  const article = document.createElement('article');
  const tag = document.createElement('span');
  const judul = document.createElement('h3');
  const deskripsi = document.createElement('p');

  article.classList.add('feature-card');
  tag.classList.add('feature-tingkat');
  tag.textContent = item.tingkat;
  judul.textContent = item.judul;
  deskripsi.textContent = item.deskripsi;

  article.append(tag, judul, deskripsi);
  return article;
}

function renderMateri(data) {
  if (data.length === 0) {
    const kosong = document.createElement('p');
    kosong.textContent = 'Tidak ada kategori pada tingkat ini.';
    daftarMateri.replaceChildren(kosong);
    statusFilter.textContent = 'Tidak ada kategori yang cocok dengan filter.';
    return;
  }
  const kartuList = data.map((item) => buatKartuMateri(item));
  daftarMateri.replaceChildren(...kartuList);
  statusFilter.textContent = `Menampilkan ${data.length} dari ${materi.length} kategori.`;
}

filterTingkat.addEventListener('change', () => {
  const nilai = filterTingkat.value;
  const hasil = nilai === 'semua'
    ? materi
    : materi.filter((item) => item.tingkat === nilai);
  renderMateri(hasil);
});

renderMateri(materi);

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

const formDaftar = document.querySelector('#form-daftar');
const namaDaftar = document.querySelector('#nama-daftar');
const emailDaftar = document.querySelector('#email-daftar');
const motivasiDaftar = document.querySelector('#motivasi-daftar');
const errorNamaDaftar = document.querySelector('#error-nama-daftar');
const errorEmailDaftar = document.querySelector('#error-email-daftar');
const errorMotivasiDaftar = document.querySelector('#error-motivasi-daftar');
const statusDaftar = document.querySelector('#status-daftar');

function validasiDaftar(data) {
  const errors = { nama: '', email: '', motivasi: '' };

  if (data.nama.length < 3) {
    errors.nama = 'Nama minimal 3 karakter.';
  }
  if (!data.email.includes('@') || !data.email.includes('.')) {
    errors.email = 'Format email tidak valid.';
  }
  if (data.motivasi.length < 10) {
    errors.motivasi = 'Ceritakan alasanmu, minimal 10 karakter.';
  }

  return {
    valid: !errors.nama && !errors.email && !errors.motivasi,
    errors,
  };
}

formDaftar.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    nama: namaDaftar.value.trim(),
    email: emailDaftar.value.trim(),
    motivasi: motivasiDaftar.value.trim(),
  };

  const { valid, errors } = validasiDaftar(data);

  namaDaftar.setAttribute('aria-invalid', String(Boolean(errors.nama)));
  emailDaftar.setAttribute('aria-invalid', String(Boolean(errors.email)));
  motivasiDaftar.setAttribute('aria-invalid', String(Boolean(errors.motivasi)));
  errorNamaDaftar.textContent = errors.nama;
  errorEmailDaftar.textContent = errors.email;
  errorMotivasiDaftar.textContent = errors.motivasi;

  if (!valid) {
    statusDaftar.textContent = 'Periksa kembali data yang ditandai.';
    return;
  }

  statusDaftar.textContent = `Terima kasih, ${data.nama}. Pendaftaranmu sudah kami terima.`;
  formDaftar.reset();
  namaDaftar.removeAttribute('aria-invalid');
  emailDaftar.removeAttribute('aria-invalid');
  motivasiDaftar.removeAttribute('aria-invalid');
});

const tombolTema = document.querySelector('.tema-toggle');

tombolTema.addEventListener('click', () => {
  const aktif = document.body.classList.toggle('tema-gelap');
  tombolTema.textContent = aktif ? 'light mode' : 'dark mode';
});

const tombolKeAtas = document.querySelector('#tombol-ke-atas');

window.addEventListener('scroll', () => {
  tombolKeAtas.hidden = window.scrollY < 400;
});

tombolKeAtas.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
