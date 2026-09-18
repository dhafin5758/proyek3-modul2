'use strict';

function hitungSubtotal(harga, jumlah) {
  return harga * jumlah;
}

function hitungPersenDiskon(subtotal, anggota) {
  let diskon = 0;
  if (subtotal >= 200000) {
    diskon = 0.20;
  } else if (subtotal >= 100000) {
    diskon = 0.10;
  }
  if (anggota) {
    diskon += 0.05;
  }
  return Math.min(diskon, 0.25);
}

function buatRingkasanPembayaran(harga, jumlah, anggota) {
  if (harga <= 0 || jumlah <= 0) {
    return { status: 'Data tidak valid', alasan: 'Harga dan jumlah harus lebih besar dari nol.' };
  }
  const subtotal = hitungSubtotal(harga, jumlah);
  const persenDiskon = hitungPersenDiskon(subtotal, anggota);
  const nilaiDiskon = subtotal * persenDiskon;
  const total = subtotal - nilaiDiskon;

  return {
    status: 'Berhasil',
    subtotal,
    persenDiskon: `${Math.round(persenDiskon * 100)}%`,
    nilaiDiskon,
    total,
  };
}

const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

async function main() {
  let lagi = true;
  while (lagi) {
    const harga = Number(await rl.question('harga: '));
    const jumlah = Number(await rl.question('jumlah: '));
    const anggota = (await rl.question('anggota (y/n): ')).trim() === 'y';

    console.log(buatRingkasanPembayaran(harga, jumlah, anggota));

    lagi = (await rl.question('lagi (y/n): ')).trim() === 'y';
  }
  rl.close();
}

main();