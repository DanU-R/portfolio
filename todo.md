# TODO — Portfolio Website Danu Ranggana

**Status:** Ready to build · 2026-08-22
**Ref:** `prd.md` (v1.1) — sumber requirement & data

---

## A. Research Findings (keputusan teknis + desain)

### A1. Print → CV PDF (P0-3) — sumber: MDN @page/@media print
- `@page { size: A4; margin: 14mm 16mm; }` — baseline 2024 semua browser. Margin via `@page`, bukan padding body.
- `page-break-inside: avoid` untuk kartu/section yang gak boleh terpotong; `page-break-after: avoid` untuk heading.
- **Target utama QA: Chrome** (`--print-to-pdf`). Browser lain beda rendering → Chrome = standar industri print-to-PDF.
- Font size di print pakai `pt` (14pt body, 22pt nama) — jangan remap px ke layar.
- `print-color-adjust: exact` hanya untuk elemen yang benar-benar butuh warna (badge); default print = strip background (aman, hemat toner).
- **Hide di print:** nav, hero CTA, footer, background dekoratif, animation.
- **Urutan print** (≠ urutan layar): Hero (nama+tagline+kontak baris) → About → Education → Experience → Projects → Skills. Target 1–2 hal A4.
- Implementation: `window.print()` dari tombol — tidak perlu JS library.

### A2. Deploy Vercel (P0-10) — sumber: docs.vercel.com/deployments
- Folder statis = 3 cara deploy, semua tanpa build command:
  1. **Git import** (utama): Vercel Dashboard → Add New → Project → import `DanU-R/portfolio` → preset **Other** → build command kosong.
  2. **CLI**: `vercel --prod`.
  3. **Drag & drop folder** ke Dashboard.
- Auto-detect static site → `index.html` di root = entry. Tidak perlu `vercel.json`.
- Custom domain = P2 (PRD), skip v1.

### A3. QA tooling (lokal)
- Headless Chrome tersedia (`/usr/bin/google-chrome`): `--headless --print-to-pdf` untuk verifikasi layout CV tanpa browser manual.
- `file://` cukup untuk test lokal (satu folder statis, no CORS issue karena gak ada fetch).

### A4. Desain (keputusan dari best-practice single-page portfolio)
| Aspek | Keputusan | Alasan |
|-------|-----------|--------|
| Tema | Light, 1 warna aksen (deep blue `#2563eb` family) + netral gray | Profesional, aman print, 1 aksen = konsisten |
| Font | System stack: `-apple-system, "Segoe UI", Roboto, Inter, sans-serif` | Zero fetch, fast, native look (G3) |
| Layout | Container max-width 1080px, section padding 96px/64px (mobile 48px) | Standar editorial, readable |
| Nav | Sticky, desktop horizontal / mobile hamburger (JS toggle) | P1-1, tap target ≥44px |
| Hero | Nama h1 besar (clamp 2.5–4rem), tagline, 2 CTA (solid + outline), sub-text 1 kalimat | 10-detik test recruiter |
| Kartu | Project: 2 kolom grid (mobile stack), ikon SVG inline, badge stack, hover lift | P1-3, self-contained |
| Skills | 4 grup, tiap grup = heading kecil + flex-wrap badge pill | Skimmable |
| Animation | IntersectionObserver fade+translateY 12px, one-shot, `prefers-reduced-motion: reduce` → disable | P1-2, non-blocking |
| Ikon | Inline SVG (Feather-style stroke), tidak ada CDN | P0-8, no external fetch |
| Kontak | Grid 4 card (Email/HP/LinkedIn/GitHub) + icon | Scan-able |
| Footer | Copyright + "Built with vanilla HTML/CSS/JS" + link GitHub | Sinyal tech ke interviewer |
| Meta | OG tags, title, description, `lang="id"` | P1-4 |

---

## B. Task List

### Fase 1 — Scaffold
- [ ] B1. Struktur folder sesuai PRD §8 (`index.html`, `styles.css`, `script.js`, `README.md`)
- [ ] B2. `index.html` skeleton: meta/head (P1-4), `<header>` nav, `<main>` 7 section kosong, `<footer>`, `lang="id"` (P0-7)

### Fase 2 — Konten (data PRD §5)
- [ ] B3. Hero: nama, tagline, sub-text, CTA Download CV + Hubungi Saya (P0-2)
- [ ] B4. About: paragraf profil
- [ ] B5. Experience: kartu BPS + 5 poin
- [ ] B6. Projects: 2 kartu (ikon SVG, deskripsi, badge, link GitHub `_blank rel=noopener`)
- [ ] B7. Skills: 4 kategori badge
- [ ] B8. Education & Certifications: 2 pendidikan + CCNAv7 + BNSP TKJ
- [ ] B9. Contact: email `mailto:`, HP `tel:+6289501927317`, LinkedIn, GitHub (P0-5)

### Fase 3 — Styling
- [ ] C1. Base: CSS reset ringan, system font, warna token (CSS custom properties), container
- [ ] C2. Component: nav sticky, hero, kartu project, badge skill, kartu contact, footer
- [ ] C3. Responsive mobile-first: breakpoint 768px (nav hamburger, grid stack) — QA 360px & 1440px (P0-6)
- [ ] C4. Print stylesheet `@media print` + `@page` A4: hide nav/CTA/footer, layout CV, urutan section, page-break rules, target 1–2 hal (P0-3, A1)

### Fase 4 — JS
- [ ] D1. Mobile nav toggle (aria-expanded, close on link click / Escape)
- [ ] D2. Smooth scroll anchor + active nav highlight (IntersectionObserver)
- [ ] D3. Scroll reveal (IntersectionObserver, respect reduced-motion)
- [ ] D4. Tombol Download CV → `window.print()`
- [ ] D5. Guard: semua JS di `defer`, 0 error console (P0-9)

### Fase 5 — QA (gate Definition of Done)
- [ ] E1. HTML valid (validator.w3.org atau tidy)
- [ ] E2. Console clean — semua link valid (klik semua: GitHub×2, LinkedIn, mailto, tel, anchor)
- [ ] E3. Responsive: screenshot 360px & 1440px (headless Chrome) — layout rapi
- [ ] E4. **Print QA: `google-chrome --headless --print-to-pdf` → inspect PDF 1–2 hal A4, urutan section benar, tidak ada elemen layar bocor**
- [ ] E5. Lighthouse mobile: Perf ≥90, LCP <1.5s, transfer <100KB
- [ ] E6. `README.md`: run local + deploy Vercel (git import, preset Other, no build)

### Fase 6 — Deploy (butuh izin user / akses GitHub)
- [ ] F1. Push repo `DanU-R/portfolio` (Q4 default — konfirmasi dulu)
- [ ] F2. Vercel import → live → verify 200
- [ ] F3. Screenshot live + share URL ke user

---

## C. Open Items (jangan blocker build)
| # | Item | Status |
|---|------|--------|
| 1 | Q3–Q7 PRD pakai default (separate files, repo `portfolio`, light, reveal on, no WA) | OK tanpa konfirmasi |
| 2 | Repo project `company-profile` & `gsuite_workspace` — cek public/private saat QA (E2) | Kalau private → flag ke user |
| 3 | Push ke GitHub butuh kredensial user | Tanya di Fase 6 |
