'use strict';

let peserta = [
  { id: 1, nama: 'Alya', prodi: 'Teknik Informatika' },
  { id: 2, nama: 'Bima', prodi: 'Sistem Informasi' },
];

const form = document.querySelector('#form-peserta');
const namaInput = document.querySelector('#nama');
const prodiInput = document.querySelector('#prodi');
const filterInput = document.querySelector('#filter-prodi');
const daftar = document.querySelector('#daftar-peserta');
const status = document.querySelector('#status');
const errorNama = document.querySelector('#error-nama');
const errorProdi = document.querySelector('#error-prodi');

function validasiPeserta(calon) {
  let errNama = '';
  let errProdi = '';

  if (calon.nama.trim().length < 3) {
    errNama = 'Nama minimal 3 karakter.';
  }
  if (!calon.prodi) {
    errProdi = 'Program studi wajib dipilih.';
  }

  return {
    valid: errNama === '' && errProdi === '',
    errorNama: errNama,
    errorProdi: errProdi,
  };
}

function buatKartuPeserta(item) {
  const article = document.createElement('article');
  const heading = document.createElement('h2');
  const description = document.createElement('p');

  article.classList.add('kartu');
  heading.textContent = item.nama;
  description.textContent = item.prodi;
  article.append(heading, description);
  return article;
}

function renderPeserta(data) {
  if (data.length === 0) {
    const kosong = document.createElement('p');
    kosong.textContent = 'Tidak ada peserta.';
    daftar.replaceChildren(kosong);
    return;
  }
  const kartuList = data.map((item) => buatKartuPeserta(item));
  daftar.replaceChildren(...kartuList);
}

function pesertaSesuaiFilter() {
  const nilaiFilter = filterInput.value;
  if (nilaiFilter === 'semua') {
    return peserta;
  }
  return peserta.filter((item) => item.prodi === nilaiFilter);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const calon = {
    nama: namaInput.value.trim(),
    prodi: prodiInput.value,
  };

  const hasilValidasi = validasiPeserta(calon);

  namaInput.setAttribute('aria-invalid', String(Boolean(hasilValidasi.errorNama)));
  prodiInput.setAttribute('aria-invalid', String(Boolean(hasilValidasi.errorProdi)));
  errorNama.textContent = hasilValidasi.errorNama;
  errorProdi.textContent = hasilValidasi.errorProdi;

  if (!hasilValidasi.valid) {
    status.textContent = 'Periksa kembali data yang ditandai.';
    return;
  }

  peserta.push({
    id: Date.now(),
    nama: calon.nama,
    prodi: calon.prodi,
  });

  form.reset();
  namaInput.removeAttribute('aria-invalid');
  prodiInput.removeAttribute('aria-invalid');
  errorNama.textContent = '';
  errorProdi.textContent = '';
  status.textContent = 'Peserta berhasil ditambahkan.';

  renderPeserta(pesertaSesuaiFilter());
});

filterInput.addEventListener('change', () => {
  const hasil = pesertaSesuaiFilter();
  status.textContent = hasil.length === 0
    ? 'Tidak ada peserta.'
    : `Menampilkan ${hasil.length} peserta.`;
  renderPeserta(hasil);
});

renderPeserta(peserta);
