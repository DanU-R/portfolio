# Danu Ranggana — Portofolio Web Developer

Portofolio pribadi **Danu Ranggana**: fresh graduate S1 Teknik Informatika (IPK 3,53 · Dengan Pujian) yang membangun aplikasi web dan memanfaatkan AI untuk mempercepat kerja.

Situs satu halaman, statis, tanpa framework: **HTML + CSS + JavaScript murni**. Tidak ada build tool dan tidak ada dependensi eksternal — seluruh aset (ikon, gambar latar) disajikan sendiri, hanya berkas font yang diambil dari Google Fonts. Satu halaman memuat seluruh profil — dari hero sampai kontak — dan **halaman yang sama bisa dicetak langsung jadi CV A4**.

## Isi halaman

| Bagian | Isi |
|--------|-----|
| Hero | Latar bergradasi gelap, tagline, dan aksi cepat: **Jelajahi Karya**, **Download CV**, **Hubungi Saya** |
| Project Pilihan | 4 proyek: Website Profil Sekolah, Temanten (Undangan Digital), Readmeify, Traffic Index |
| Tentang | Ringkasan profil singkat |
| Pengalaman | Magang pengolahan data & IT support di BPS Kabupaten Pemalang (2024) |
| Teknologi | Frontend · Backend & Data · Workflow |
| Education | S1 Teknik Informatika, SMK TKJ, sertifikasi CCNAv7 & BNSP TKJ |
| Contact | Email, LinkedIn, GitHub, WhatsApp, telepon |

## Fitur

- **Tema gelap/terang** — mengikuti preferensi sistem (`prefers-color-scheme`), bisa diganti manual lewat tombol di navbar.
- **CV sekali klik** — tombol *Download CV* memanggil `window.print()`; stylesheet `@media print` menyusun ulang halaman jadi CV: header profil + baris kontak, lalu About → Education → Experience → Projects → Skills → Contact. Hasil print-to-PDF terverifikasi **2 halaman A4**.
- **Navigasi lengket** dengan penanda posisi antar bagian, smooth scroll, dan menu lipat di layar kecil.
- **Kartu proyek** yang bisa dibuka untuk detail; tautan repo muncul hanya untuk proyek yang repositorinya memang publik.
- **Animasi halus** (latar bergerak, kilau skill) yang otomatis meredup saat pengguna mengaktifkan *reduce motion*.
- **Aksesibilitas dasar**: label ARIA pada ikon, kontras aman, target sentuh lega, fokus keyboard terlihat.

## Teknologi & keputusan

- **Tanpa framework, tanpa build** — berkas statis yang bisa dilayani langsung oleh hosting mana pun.
- **Nol permintaan eksternal untuk aset** — ikon berupa inline SVG, latar hero berupa WebP lokal, sehingga waktu muat tetap ringan.
- **Konten terpusat** — `prd.md` §5 adalah sumber data tunggal; perubahan teks mengikuti dokumen itu.
- **Aset dioptimalkan** — latar hero dikecilkan ke WebP (957 KB → 409 KB).

## Berkas

```
index.html            seluruh konten halaman
styles.css            tampilan, responsif, + stylesheet print (CV)
script.js             tema, navigasi, scroll, expand proyek, tombol CV
favicon.svg           ikon SVG
favicon-32.png        ikon raster
apple-touch-icon.png  ikon iOS
og-image.jpg          gambar pratinjau saat dibagikan (1200×630)
assets/
  hero-bg.webp        latar hero
prd.md                PRD: requirement + data konten
todo.md               catatan pengerjaan
```
