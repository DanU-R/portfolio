# TODO — Portfolio Website Danu Ranggana

**Status:** Selesai — desain import terpasang, konten & fitur wajib dipulihkan
**Ref:** `prd.md` (v1.1) — sumber requirement & data

---

## A. Keputusan teknis

### A1. Print → CV PDF (P0-3)
- `@page{size:A4;margin:12mm 14mm}`; margin via `@page`, bukan padding body.
- Urutan print **berbeda** dari urutan layar: About → Education → Experience → Projects → Skills → Contact (diatur lewat `order` + `display:contents` pada pembungkus `.story`/`.lower`).
- Hero tidak dicetak — hero hanya menghasilkan noise di kertas. Diganti `<header class="cv-head">` (print-only, anak pertama `<main>`) berisi nama, tagline, dan baris kontak; `#home{display:none!important}`.
- `.contact-links` disembunyikan saat print: barisnya ikon-saja sehingga tercetak sebagai kotak kosong. Baris kontak teks tetap ada via `.cv-head` dan `.contact-note`.
- Detail proyek dipaksa statis (`opacity:1`, `transform:none`) agar tidak hilang di kertas.
- Hasil terverifikasi: **2 halaman A4** (Chrome/Edge `--print-to-pdf`).

### A2. Tema & palet
- Palet desain import: latar gelap `#061018`, aksen cyan `#55e4ec` + gold `#e7bc69`.
- Tema gelap default mengikuti sistem; `body.light-view` / `body.dark-view` di-set JS dari `prefers-color-scheme`, tombol navbar menimpanya. → **P2-1 kini terimplementasi** (dulu non-goal v1).
- Font: `Outfit` + `Noto Sans SC` (aksen glyph CJK pada seal/nav/ilustrasi).

### A3. Ilustrasi hero
- Berkas desain import **menyembunyikan** ilustrasinya di blok *"Clean single-subject coder layer"* (`.coder-scene{display:none}` + `.coder-scene:before{display:none}` + `.hero-roof-foreground{display:none}`).
- Keputusan: tiga deklarasi itu dihapus, **seluruh geometri lain dipertahankan apa adanya** — box `300×225` (desktop) / `345×370` (`@900`) / `215×250` (`@640`), layer `.coder-glow` (96/55 + 70/104), `.holo-link` (183/126 + 342/290), `.coder-caption` (152/8 + 270/14), dan `object-position:center bottom` pada gambar.
- `.hero-roof-foreground` tidak dihidupkan: elemennya memang tidak punya `background-image` di sumber (murni `display:none`), jadi tidak ada yang hilang.
- CSS mati yang benar-benar tanpa konsumen dihapus: `.rooftop-perch`, `.dragon-aura*`, `.dragon-motion`, `.temple-motion`, figur coder gambar-CSS (`.coder-person` … `.code-line`), `@keyframes typeArm/blink/auraChase/auraPulse`.
- Aset: `coder-figure.png` 1280×1920 (1956 KB) → `coder-figure.webp` 800×1200 (148 KB); `hero-bg.webp` 957 KB → 409 KB. Gabungan 2,9 MB → 557 KB.

### A4. QA tooling
- Headless Edge (`--print-to-pdf`, `--dump-dom`) untuk verifikasi layout print & DOM tanpa membuka browser manual.
- Deploy Vercel auto dari push ke `main` → verifikasi akhir di URL produksi, bukan di lokal.

---

## B. Task List

### Fase 1 — Audit desain import
- [x] B1. Inventaris section & jumlah elemen sumber (`#home #projects #about #experience #skills #contact`, 4 `.project`, 3 `.skill-group`, 4 `.panel`, 4 `.contact-link` `aria-disabled`)
- [x] B2. Konfirmasi `index.html`/`css`/`js`/`assets` sumber identik dengan arsipnya (sha256)
- [x] B3. Temukan penyebab ilustrasi hilang (override `display:none`) + layer tanpa elemen HTML

### Fase 2 — Konten & fitur wajib (PRD §5)
- [x] B4. Hero: headline, eyebrow, 3 aksi (Jelajahi Karya · Download CV · Hubungi Saya)
- [x] B5. About: paragraf profil PRD §5.2 apa adanya
- [x] B6. Experience: BPS Pemalang + 5 poin
- [x] B7. Projects: 4 kartu, stack diverifikasi dari metadata repo, link repo publik saja
- [x] B8. Skills: 3 grup (Frontend 5, Backend & Data 6, Workflow 4)
- [x] B9. Education: panel `#education` baru (S1 · SMK · Sertifikasi)
- [x] B10. Contact: mailto, LinkedIn, GitHub, WhatsApp, tel (link hidup, bukan `aria-disabled`)

### Fase 3 — Styling
- [x] C1. Adopsi `styles.css` desain import + perbaikan jalur `url('assets/hero-bg.webp')` (semula `../assets/…` → rusak di root)
- [x] C2. Hapus override yang mematikan ilustrasi + CSS mati
- [x] C3. Print stylesheet A4 (P0-3)
- [x] C4. Gaya tambahan: tombol CV, tautan repo, bullet pengalaman, panel education, fokus keyboard

### Fase 4 — JS
- [x] D1. Handler `[data-print]` → `window.print()`
- [x] D2. Klik `.plink` tidak lagi ikut membuka kartu proyek
- [x] D3. Tema, nav toggle, scrollspy, reveal (bawaan desain import) tetap utuh

### Fase 5 — QA
- [x] E1. Layout 360–1440px: 0 overflow horizontal, 0 gambar rusak, 0 anchor mati, 0 ID duplikat
- [x] E2. Konsol bersih (0 error) setelah load
- [x] E3. Semua tautan proyek dicek HTTP; Temanten sengaja tanpa link (repositori privat)
- [x] E4. Print-to-PDF: 2 halaman A4, urutan section benar, tidak ada elemen layar bocor

### Fase 6 — Deploy
- [x] F1. Commit + push `main` (Vercel auto-deploy)
- [ ] F2. Verifikasi 200 di URL produksi

---

## C. Catatan
| # | Item | Status |
|---|------|--------|
| 1 | Q5 (tema) berubah: dark default + toggle, bukan light-only | Diterapkan |
| 2 | Q7 (WhatsApp) dipakai → P2-6 terimplementasi | Diterapkan |
| 3 | Temanten: organisasi GitHub tidak punya repo publik → tanpa tautan, detail menyebut repositori privat | Final |
| 4 | `.superdesign/` = keluaran tooling agen, bukan konten situs | Dibiarkan (di luar scope) |
