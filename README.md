# Portfolio — Danu Ranggana

Single-page portfolio statis: **vanilla HTML, CSS, JavaScript** — tanpa framework, tanpa build tool.

## Struktur

```
index.html      → konten (7 section)
styles.css      → styling + responsive + print CSS (CV)
script.js       → nav toggle, smooth scroll, reveal, print handler
favicon.svg     → favicon
og-image.jpg    → gambar share (1200×630)
```

## Run lokal

Buka langsung:

```bash
# Opsi 1: buka file
xdg-open index.html

# Opsi 2: local server (opsional)
python3 -m http.server 8000
# → http://localhost:8000
```

## Download CV

Tombol **Download CV** memicu `window.print()` — print stylesheet (`@media print`) me-render halaman jadi CV A4. Di dialog print, pilih **Save as PDF**. Target: Chrome (rendering paling konsisten).

## Deploy ke Vercel

**Opsi A — Git import (rekomendasi):**
1. Push folder ini ke GitHub (mis. `github.com/<user>/portfolio`).
2. [Vercel](https://vercel.com) → **Add New → Project** → import repo.
3. Framework preset: **Other**. Build command: *kosong*. Output directory: `/`.
4. Deploy → live di `*.vercel.app`.

**Opsi B — CLI:**
```bash
npm i -g vercel
vercel --prod
```

**Opsi C — drag & drop** folder ke dashboard Vercel.

> Vercel auto-detect static site. Tidak perlu `vercel.json`, tidak perlu build.

## Update konten

Semua konten ada di `index.html` (data sumber: lihat `prd.md` §5). Edit teks → push → auto-deploy.
