# Homework - Interactive Profile Card

## Cara menjalankan


```bash
cd homework-profile-card
python3 -m http.server 5500
# lalu buka http://127.0.0.1:5500/index.html
```

Atau gunakan ekstensi Live Server pada VS Code.

## Fitur
- Profil dan daftar keterampilan awal dimuat secara asinkron dari `data/profile.json`.
- State idle, loading, success, empty, dan error tersedia, lengkap dengan tombol "Coba lagi".
- Tombol "Lihat detail" membuka/menutup detail profil menggunakan `classList` dan memperbarui `aria-expanded`.
- Tombol "Ganti tema" mengganti tema gelap/terang dengan `classList.toggle` pada `<body>`.
- Form menambah keterampilan menolak input kosong dan keterampilan duplikat.
- Setiap item keterampilan memiliki tombol hapus.
- Klik berulang tidak menggandakan data karena data disimpan pada satu array (`profilData.keterampilan`)
  yang di-render ulang seluruhnya (`replaceChildren`) setiap kali berubah.

