# PRD — Portfolio Website Danu Ranggana

**Doc ID:** PRD-PORTFOLIO-001
**Version:** 1.1
**Status:** Ready for Build (Open Q1–Q2 resolved)
**Author:** Danu Ranggana
**Last updated:** 2026-08-22

---

## 1. Problem

Fresh graduate Teknik Informatika butuh portofolio profesional yang bisa diakses oleh recruiter/HR/tech interviewer sebagai pelengkap CV saat melamar posisi IT/web development. Aplikasi kerja umumnya meminta link portofolio + CV. Portofolio saat ini belum ada → perlu dibuat dari nol.

Website harus:
- Mudah di-deploy (target: Vercel).
- Ringan, fast, tanpa dependency berat (tanpa framework/build tool).
- Mudah di-update mandiri (HTML/CSS/JS polos).
- Profesional & kredibel untuk fresh grad.

---

## 2. Goals

| # | Goal | Terukur |
|---|------|---------|
| G1 | Satu halaman statis yang memuat seluruh identitas + karya | 7 section (Hero, About, Experience, Projects, Skills, Education, Contact) render lengkap |
| G2 | Deploy ke Vercel tanpa build step | Open `index.html` di browser langsung jalan; Vercel import repo = live |
| G3 | Fast & ringan | LCP < 1.5s, < 100KB transfer total, no external JS framework |
| G4 | Responsive (mobile-first) | Layout layak pakai di 360px–1440px, nav mobile-friendly |
| G5 | Kredibel & ATS-friendly | Struktur konten standar, data konsisten dengan CV, link CV + GitHub + LinkedIn valid |
| G6 | Mudah di-update | Konten dalam HTML, ubah = edit 1 file, no build |

## 3. Non-Goals (eksplicit)

| # | Non-Goal | Alasan |
|---|----------|--------|
| N1 | Framework (React/Vue/Next) | Brief: vanilla HTML/CSS/JS, no build tool |
| N2 | CMS / backend | Statis satu halaman, gak perlu dynamic |
| N3 | Multi-bahasa | Bahasa Indonesia + EN terms (IT industry) cukup |
| N4 | Dark/light toggle | Single theme (light) sudah cukup untuk v1 |
| N5 | SEO multi-page / blog | Satu halaman, tidak perlu Sitemap multi-page |
| N6 | Form kontak ke backend | Form kontak = mailto/tel link saja, no server |
| N7 | File CV PDF statis terpisah | CV dibuat via print-stylesheet dari website itu sendiri (keputusan user 2026-08-22) |

---

## 4. Users & Personas

| Persona | Kebutuhan | Prioritas |
|---------|-----------|-----------|
| **Recruiter / HR** | 10 detik skimming: nama, skill, kontak, link CV | P0 |
| **Tech interviewer** | Detail project, stack, link GitHub untuk cek kode | P0 |
| **Pengelola data (user ini)** | Gampang edit konten mandiri, no build step | P0 |
| **Mobile user (LinkedIn browse)** | Layout mobile rapi, tap target cukup besar | P1 |

**Primer persona:** Tech interviewer + recruiter. Konten di-arrange biar 10 detik pertama (Hero) udah jelas "siapa + bisa apa + hubungi".

---

## 5. Data & Content (single source of truth)

Semua konten di bawah = spec data yang HARUS muncul di site. Ubah di sini → ubah di HTML.

### 5.1 Hero
- Nama: **Danu Ranggana**
- Tagline: `Fresh Graduate Informatics | AI-Powered Problem Solver | Tech Enthusiast`
- CTA 1: **Download CV** → trigger `window.print()`; print stylesheet me-render ulang halaman jadi layout CV rapi (header profil + kontak, About, Education, Experience, Projects, Skills). User save as PDF dari dialog print browser. **Tanpa file PDF statis** — CV = website yang di-print. (Keputusan user 2026-08-22.)
- CTA 2: **Hubungi Saya** → anchor ke `#contact`
- (Opsional) Sub-text singkat 1 kalimat: fresh grad S1 TI, IPK 3,53 (Dengan Pujian), fokus web dev & AI agent.

### 5.2 About
Paragraf profil (1 paragraf, ~4-5 kalimat):
> Fresh graduate S1 Teknik Informatika dengan IPK 3,53 (Dengan Pujian). Fondasi kuat di pengembangan web (PHP, Laravel, JavaScript) dan pengelolaan database (MySQL, PostgreSQL). Berpengalaman magang di Badan Pusat Statistik (BPS) dalam pengolahan data & IT support. Teliti dan cepat belajar. Saat ini juga mendalami AI agent (Hermes) secara mandiri.

### 5.3 Experience
Satu kartu:
- Role: **Magang — Pengolahan Data & IT Support**
- Org: **Badan Pusat Statistik (BPS) Kabupaten Pemalang**
- Periode: **Maret – Juni 2024**
- Poin:
  1. Menjaga operasional aplikasi internal (monitoring & maintenance).
  2. Troubleshooting dan testing aplikasi internal.
  3. Verifikasi dan validasi data.
  4. Menyusun dokumentasi teknis.
  5. Berkoordinasi dengan tim dalam menyelesaikan tugas.

### 5.4 Projects
Dua kartu, masing-masing: gambar/ikon + judul + deskripsi singkat + badge teknologi + tombol link ke GitHub.

| Proyek | Deskripsi | Badge | Link |
|--------|-----------|-------|------|
| **Digitalisasi Sistem Informasi Sekolah** | Platform web profil sekolah untuk menampilkan informasi sekolah secara digital dan terpusat. | `Laravel` `Tailwind CSS` `MySQL` | https://github.com/DanU-R/company-profile |
| **Google Workspace AutoBot** | Toolkit otomasi Python untuk pengelolaan Google Workspace Admin. | `Python` `Selenium` | https://github.com/DanU-R/gsuite_workspace |

> **Note:** Ikon = inline SVG / emoji / placeholder. Gak perlu asset gambar eksternal (biar ringan & self-contained). Kalau mau gambar, pakai placeholder SVG 16:9.

### 5.5 Skills
Grid badge dikelompok per kategori:

| Kategori | Items |
|----------|-------|
| **Database** | MySQL, PostgreSQL |
| **Backend** | PHP, Laravel, REST API |
| **Frontend** | JavaScript, HTML, CSS, Bootstrap |
| **Tools** | Git, Microsoft Excel, VS Code, Linux |

### 5.6 Phone
- Display: **+62 895-0192-7317**
- Link: `tel:+6289501927317`
- (Opsional P2) WhatsApp: `https://wa.me/6289501927317`

### 5.7 Education & Certifications
| Type | Institusi / Sertifikasi | Periode |
|------|------------------------|---------|
| S1 | Teknik Informatika — Institut Widya Pratama Pekalongan | 2021 – 2025 |
| SMK | TKJ — SMK Texmaco Pemalang | 2019 – 2021 |
| Sertifikasi | CCNAv7, BNSP TKJ | — |

### 5.8 Contact
| Channel | Nilai |
|---------|-------|
| Email | danuranggana9@gmail.com |
| HP | +62 895-0192-7317 (`tel:+6289501927317`) |
| LinkedIn | https://linkedin.com/in/danuranggana |
| GitHub | https://github.com/DanU-R |

---

## 6. Requirements

### P0 (wajib, MVP)

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| P0-1 | Single-page static, vanilla HTML/CSS/JS | 1 file `index.html` + `styles.css` + `script.js` (atau inline). No `node_modules`, no `package.json` wajib. Buka di browser langsung jalan. |
| P0-2 | Semua 7 section ada & berisi | Hero, About, Experience, Projects, Skills, Education & Certifications, Contact — semua render dengan data §5. |
| P0-3 | Download CV via print | Tombol "Download CV" = `window.print()`. Print stylesheet (`@media print`) me-render halaman jadi CV 1–2 halaman A4: nav/CTA/animation hilang, layout CV rapi (nama besar + baris kontak, section urut Education → Experience → Projects → Skills), `@page` margin benar. Hasil print-to-PDF layak kirim ke recruiter. |
| P0-4 | "Hubungi Saya" → scroll ke Contact | Anchor `#contact`, smooth scroll. |
| P0-5 | All links valid & external open new tab | GitHub/LinkedIn/`tel:`/email valid; external target `_blank` rel="noopener". Email = `mailto:`. |
| P0-6 | Responsive mobile-first | Rapi di 360px. Nav/section stack vertical di mobile. |
| P0-7 | Semantic HTML | `<header>` `<section>` `<main>` `<footer>`, heading hierarchy h1→h2→h3 benar. |
| P0-8 | Accessible basics | Alt/aria-label pada ikon, contrast ratio ok, tap target ≥44px, `lang="id"`. |
| P0-9 | No console errors | Buka DevTools → 0 error. |
| P0-10 | Deploy Vercel | Import folder → live. (Static, no build command.) |

### P1 (penting, ideal ada)

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| P1-1 | Sticky nav + smooth scroll | Nav tetap di atas, klik section = smooth scroll, active state highlight. |
| P1-2 | Subtle scroll reveal animation | Fade-in section saat masuk viewport (IntersectionObserver, CSS-only fallback). Non-blocking, respects `prefers-reduced-motion`. |
| P1-3 | Project card visual | Ikon/SVG per project, hover effect, badge warna per stack. |
| P1-4 | Meta tags | `<title>`, `description`, Open Graph (og:title/og:description/og:image). |
| P1-5 | Favicon | `favicon.ico` / SVG. |

### P2 (nice-to-have, skip di v1)

| ID | Requirement | Catatan |
|----|-------------|---------|
| P2-1 | Theme toggle (dark/light) | Non-goal v1 (N4). Tambah kalau diminta. |
| P2-2 | i18n (EN/ID toggle) | Non-goal (N3). |
| P2-3 | Custom domain + CDN | Setelah Vercel live. |
| P2-4 | Project live-demo link | Tambah kalau project ada deployment. |
| P2-5 | Lighthouse 100 audit | P0 udah targetin ringan; audit opsional. |
| P2-6 | Link WhatsApp (wa.me) di Contact | Nomor sudah ada; tambah 1 link kalau diminta. |

---

## 7. Technical Constraints & Stack

| Item | Keputusan |
|------|-----------|
| Framework | **Tidak ada** — vanilla HTML5, CSS3, ES6 JS. |
| Build tool | **Tidak ada.** No bundler, no transpiler. |
| CSS approach | CSS murni (`styles.css`). Tailwind CSS **jangan** dipakai di site ini (Tailwind hanya di project Laravel, bukan di site ini). |
| JS | Minimal: smooth-scroll / scroll-reveal / mobile-nav toggle / handler tombol Download CV → `window.print()`. No library. |
| CV PDF | **Dibuat via print browser** dari website (print stylesheet `@media print`), bukan file statis. No JS PDF library (html2pdf jsPDF dll). — Keputusan user 2026-08-22. |
| Ikon | Inline SVG atau emoji. Hindari fetch gambar eksternal. |
| Font | System font stack (atau 1 Google Font self-hosted). Hindari banyak font. |
| Struktur file | Lihat §8. |
| Target | Vercel static deploy. Repo = 1 folder. |
| Validasi | `index.html` valid (validator.w3.org), no lint error JS. |

---

## 8. Proposed File Structure

```
portfolio-danu-ranggana/
├── index.html              # semua konten, semantic
├── styles.css              # styling, responsive + @media print (layout CV)
├── script.js               # nav toggle, smooth scroll, reveal, print-CV handler
├── favicon.svg             # P1
├── og-image.jpg            # P1 (1200x630, buat OG share)
├── prd.md                  # dokumen ini
└── README.md               # cara run local + cara deploy Vercel
```

> Keep flat. Kalau mau inline CSS/JS di `index.html` biar 1-file, boleh juga (P0 tetap lolos). Pilih: **separate file** (lebih rapi untuk update) — kecuali user minta 1-file.

---

## 9. Deployment (Vercel)

1. Push folder ke GitHub (repo `github.com/DanU-R/portfolio` — atau nama lain).
2. Vercel → **Add New → Project** → import repo.
3. Framework preset: **Other** (no framework).
4. Build command: *(kosong)*. Output directory: `/` (root).
5. Deploy → live di `*.vercel.app`.
6. (P2) Add custom domain di Vercel DNS.

**Alternatif:** `npx vercel` CLI dari folder, atau drag-drop di Vercel Dashboard.

---

## 10. Success Metrics

| Metric | Target | Cara ukur |
|--------|--------|-----------|
| Semua section render | 7/7 | Manual QA checklist §6 P0 |
| LCP | < 1.5s | Lighthouse mobile |
| Transfer total | < 100KB | Lighthouse / DevTools |
| Console errors | 0 | DevTools console |
| Responsive 360px | Layak pakai | Resize test / device toolbar |
| Links | 100% valid | Klik semua: GitHub, LinkedIn, email, tel, project |
| Download CV | Print dialog buka, hasil PDF rapi | `window.print()` → save PDF, inspeksi: 1–2 hal A4, layout CV, section urut benar |
| Vercel live | 200 OK | Buka URL |
| HTML valid | 0 error | validator.w3.org |

---

## 11. Risks

| Risiko | Impact | Mitigasi |
|--------|--------|----------|
| Print layout beda antar browser | CV hasil print-to-PDF kurang rapi di beberapa browser | QA print di Chrome (target utama) + Safari/Firefox; `@media print` defensif (fixed section order, `page-break-*` control, font size pt-based) |
| Konten panjang → CV jadi 3 halaman | Recruiters kurang suka | Target 1–2 hal A4; kalau >2 hal, memangkas detail print-only (mis. sub-text hero) via CSS |
| Repo project GitHub private | Link project tidak bisa diakses recruiter | Cek akses repo; kalau private → buat public atau hapus link |
| Font/ikon eksternal slow | LCP naik | Self-host / system font / inline SVG |
| Over-engineering (framework) | Melanggar brief | P0-1 enforce vanilla, no build |
| Konten tidak konsisten dengan CV lain | Kredibilitas turun | §5 sebagai single source of truth |

---

## 12. Open Questions

| # | Pertanyaan | Status |
|---|------------|--------|
| Q1 | Nomor HP apa? | **RESOLVED: 089501927317 → display +62 895-0192-7317** |
| Q2 | File CV PDF? | **RESOLVED: tanpa file statis — tombol Download CV = `window.print()` + print stylesheet jadi CV (N7)** |
| Q3 | Mau **1 file (inline CSS/JS)** atau **separate files**? | Default: separate files (§8). |
| Q4 | Repo GitHub portfolio mau nama apa? | Default: `portfolio` di `github.com/DanU-R`. |
| Q5 | Mau tema **light** atau **dark**? | Default: light (N4 non-goal v1). |
| Q6 | Mau scroll-reveal animation (P1) atau polos? | Default: ya, subtle + respect reduced-motion. |
| Q7 | Tambah link WhatsApp (wa.me) di Contact? | P2-6, skip v1. |

> Q3–Q7 pakai default kalau tidak dijawab — build lanjut dengan default.

---

## 13. Task Breakdown (untuk eksekusi)

1. **Setup repo + folder structure** (§8) — buat folder, `index.html`, `styles.css`, `script.js`, `README.md`.
2. **Hero + Nav** (P0-2, P1-1) — header, nav, tagline, 2 CTA.
3. **About** (P0-2) — paragraf profil.
4. **Experience** (P0-2) — 1 kartu BPS + poin.
5. **Projects** (P0-2, P1-3) — 2 kartu, ikon, badge, link GitHub.
6. **Skills** (P0-2) — grid badge 4 kategori.
7. **Education & Certifications** (P0-2) — 2 pendidikan + 2 sertifikasi.
8. **Contact** (P0-2, P0-4, P0-5) — email, HP (+62 895-0192-7317), LinkedIn, GitHub.
9. **Footer + Meta** (P1-4, P1-5) — meta tags, favicon, copyright.
10. **JS: nav toggle + smooth scroll + reveal + print handler** (P0-3, P0-4, P1-1, P1-2).
11. **Print stylesheet CV** (P0-3) — `@media print`: layout CV A4, hide nav/CTA/anim, page-break control, target 1–2 halaman.
12. **QA** (§6 P0 + §10) — validate HTML, console clean, responsive, semua link valid, **print-to-PDF di Chrome hasil rapi 1–2 hal A4**.
13. **Deploy Vercel** (§9) — push repo, import, live.

---

## 14. Definition of Done

- [ ] Semua P0 requirement lolos (§6 P0-1 … P0-10).
- [ ] Semua P1 yang dipilih lolos.
- [ ] Lighthouse mobile: Performance ≥ 90, LCP < 1.5s, 0 console error.
- [ ] Responsive rapi di 360px & 1440px.
- [ ] Semua link (GitHub, LinkedIn, email, tel, project) valid & open new tab.
- [ ] Tombol Download CV → print dialog → hasil PDF 1–2 hal A4, layout CV rapi.
- [ ] HTML valid, JS tanpa error.
- [ ] Vercel deploy live & bisa diakses.
- [ ] README.md jelas: cara run local + cara deploy Vercel.
