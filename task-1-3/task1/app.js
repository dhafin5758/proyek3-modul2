'use strict';

function validasiNilai(nilai) {
  return typeof nilai === 'number'
    && Number.isFinite(nilai)
    && nilai >= 0
    && nilai <= 100;
}

function tentukanKategori(nilai) {
  if (!validasiNilai(nilai)) {
    return null;
  }
  if (nilai >= 85) return 'A';
  if (nilai >= 70) return 'B';
  if (nilai >= 60) return 'C';
  return 'D';
}

function tentukanStatus(nilai) {
  if (!validasiNilai(nilai)) {
    return 'Data tidak valid';
  }
  return nilai >= 60 ? 'Lulus' : 'Tidak lulus';
}

function buatRingkasan(nama, nilai) {
  return {
    nama,
    nilai,
    kategori: tentukanKategori(nilai),
    status: tentukanStatus(nilai)
  };
}

const kasusUji = [
  { nama: 'Alya', nilai: 0 },
  { nama: 'Bima', nilai: 59 },
  { nama: 'Citra', nilai: 60 },
  { nama: 'Danu', nilai: 69 },
  { nama: 'Eka', nilai: 70 },
  { nama: 'Fani', nilai: 85 },
  { nama: 'Gilang', nilai: 101 },
  // Dua kasus tambahan (salah satunya menguji nilai 84):
  { nama: 'Hana', nilai: 84 },
  { nama: 'Indra', nilai: '80' },
];

const hasilUji = kasusUji.map(({ nama, nilai }) =>
  buatRingkasan(nama, nilai)
);

console.table(hasilUji);

// Uji terpisah untuk konversi/validasi tipe data
console.log('--- Uji validasiNilai tambahan ---');
console.log('validasiNilai(-1):', validasiNilai(-1));
console.log('validasiNilai(0):', validasiNilai(0));
console.log('validasiNilai(100):', validasiNilai(100));
console.log('validasiNilai(101):', validasiNilai(101));
console.log('validasiNilai(NaN):', validasiNilai(NaN));
console.log('validasiNilai("80"):', validasiNilai('80'));

module.exports = {
  validasiNilai,
  tentukanKategori,
  tentukanStatus,
  buatRingkasan
};
