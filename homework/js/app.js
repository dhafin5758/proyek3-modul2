'use strict';

const status = document.querySelector('#status');
const profilInti = document.querySelector('#profil-inti');
const profilNama = document.querySelector('#profil-nama');
const profilPeran = document.querySelector('#profil-peran');
const profilBio = document.querySelector('#profil-bio');
const daftarKeterampilan = document.querySelector('#daftar-keterampilan');
const tombolToggleDetail = document.querySelector('#toggle-detail');
const tombolToggleTema = document.querySelector('#toggle-tema');
const tombolCobaLagi = document.querySelector('#coba-lagi');
const detail = document.querySelector('#profil-detail');
const formKeterampilan = document.querySelector('#form-keterampilan');
const inputKeterampilanBaru = document.querySelector('#keterampilan-baru');
const errorKeterampilan = document.querySelector('#error-keterampilan');

let profilData = null;

function aturState(state, pesan) {
  status.dataset.state = state;
  status.textContent = pesan;
  status.hidden = state === 'success';
  profilInti.hidden = state !== 'success';
  tombolCobaLagi.hidden = state !== 'error';
}

async function ambilProfil() {
  const response = await fetch('data/profile.json');
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

function buatItemKeterampilan(nama) {
  const li = document.createElement('li');
  const teks = document.createElement('span');
  const tombolHapus = document.createElement('button');

  teks.textContent = nama;
  tombolHapus.type = 'button';
  tombolHapus.textContent = 'Hapus';
  tombolHapus.setAttribute('aria-label', `Hapus keterampilan ${nama}`);

  tombolHapus.addEventListener('click', () => {
    profilData.keterampilan = profilData.keterampilan.filter((k) => k !== nama);
    renderKeterampilan();
  });

  li.append(teks, tombolHapus);
  return li;
}

function renderKeterampilan() {
  if (profilData.keterampilan.length === 0) {
    const kosong = document.createElement('li');
    kosong.textContent = 'Belum ada keterampilan.';
    daftarKeterampilan.replaceChildren(kosong);
    return;
  }
  const items = profilData.keterampilan.map((k) => buatItemKeterampilan(k));
  daftarKeterampilan.replaceChildren(...items);
}

function renderProfil(data) {
  profilData = data;
  profilNama.textContent = data.nama;
  profilPeran.textContent = data.peran;
  profilBio.textContent = data.bio;
  renderKeterampilan();
}

async function muatProfil() {
  aturState('loading', 'Memuat profil...');
  try {
    const data = await ambilProfil();
    const kosong = !data || Object.keys(data).length === 0;
    if (kosong) {
      aturState('empty', 'Profil belum tersedia.');
      return;
    }
    renderProfil(data);
    aturState('success', 'Profil dimuat.');
  } catch (error) {
    console.error(error);
    aturState('error', `Gagal memuat profil: ${error.message}`);
  }
}

tombolToggleDetail.addEventListener('click', () => {
  const terbuka = detail.classList.toggle('terbuka');
  tombolToggleDetail.setAttribute('aria-expanded', String(terbuka));
  tombolToggleDetail.textContent = terbuka ? 'Sembunyikan detail' : 'Lihat detail';
});

tombolToggleTema.addEventListener('click', () => {
  document.body.classList.toggle('tema-gelap');
});

tombolCobaLagi.addEventListener('click', muatProfil);

formKeterampilan.addEventListener('submit', (event) => {
  event.preventDefault();
  const nilai = inputKeterampilanBaru.value.trim();

  if (nilai === '') {
    errorKeterampilan.textContent = 'Nama keterampilan tidak boleh kosong.';
    return;
  }
  if (profilData.keterampilan.includes(nilai)) {
    errorKeterampilan.textContent = 'Keterampilan tersebut sudah ada.';
    return;
  }

  errorKeterampilan.textContent = '';
  profilData.keterampilan.push(nilai);
  renderKeterampilan();
  formKeterampilan.reset();
});

muatProfil();
