# Amaliyah Harian — Paket Aplikasi (PWA)

Paket ini berisi semua file yang dibutuhkan supaya "Amaliyah Harian" bisa
di-install sebagai aplikasi di HP, dan otomatis update setiap kali kamu
push perubahan ke GitHub.

## Isi paket
- `index.html` — aplikasi utama (sudah ditambahkan tag PWA + registrasi
  service worker, isinya sama seperti file aslimu)
- `manifest.json` — identitas aplikasi (nama, warna, ikon) supaya bisa
  di-"Add to Home Screen"
- `service-worker.js` — mengatur update otomatis (network-first: selalu
  ambil versi terbaru dari GitHub Pages saat online)
- `icons/` — 3 file ikon aplikasi (192px, 512px, 512px maskable)

## Setup sekali di awal
1. Buat repository baru di GitHub (Public), misal nama `amaliyah-harian`.
2. Upload semua file & folder di paket ini ke repo tersebut
   (bisa drag & drop lewat "Add file → Upload files" di web GitHub).
3. Buka Settings → Pages → Source: "Deploy from a branch" → Branch: `main`,
   folder `/ (root)` → Save.
4. Tunggu 1–2 menit. Link aplikasinya jadi:
   `https://<username-github>.github.io/amaliyah-harian/`
5. Buka link itu di HP (Chrome untuk Android / Safari untuk iPhone),
   lalu pilih "Add to Home Screen" / "Tambahkan ke Layar Utama".

## Cara update selanjutnya
Setiap kali mau ubah/tambah fitur, tinggal edit `index.html` di GitHub
(klik ikon pensil di halaman file, atau upload ulang versi baru), lalu
commit. Dalam beberapa menit, semua HP yang sudah install akan otomatis
mengambil versi terbaru saat dibuka (selama ada koneksi internet) —
tidak perlu kirim ulang file ke semua orang tua/guru satu per satu.

Kalau ada perubahan besar dan ingin memaksa semua HP membuang cache lama,
naikkan angka versi di baris pertama `service-worker.js`
(`amaliyah-harian-v1` → `amaliyah-harian-v2`, dst).

## Catatan tentang Firebase & repo publik
Config Firebase (apiKey, databaseURL, dst) ada langsung di dalam
`index.html`. Ini wajar untuk aplikasi web berbasis Firebase — apiKey ini
memang didesain untuk terlihat publik. Yang benar-benar menjaga
keamanan data adalah **Security Rules** di Firebase Console (Realtime
Database → Rules), jadi pastikan itu sudah diatur supaya hanya
role/user yang berhak yang bisa baca/tulis data.

(Catatan: GitHub Pages gratis hanya tersedia untuk repo Public. Kalau
mau repo Private, GitHub Pages baru bisa diaktifkan di paket
berbayar GitHub Pro/Team.)
