# Amaliyah Harian — Paket Aplikasi (PWA)

Paket ini berisi semua file aplikasi "Amaliyah Harian", sudah disesuaikan
dengan struktur repo GitHub yang sedang berjalan (`hafidzadnan52-rgb/amaliyahharian`,
semua file di root, tanpa folder `icons/`).

## Isi paket
- `index.html` — aplikasi utama, sudah termasuk 2 fitur baru:
  1. **Udzur (Haid)** — toggle di ceklis santri banat; kalau diaktifkan,
     **hanya amaliyah yang ditandai admin sebagai "terkait shalat"**
     yang tidak perlu diisi dan tidak dihitung nilai hari itu (misal
     Shalat Tahajud, Shalat Subuh berjamaah, Shalat 5 waktu). Amaliyah
     lain (Tilawah, bantu rumah, belajar, dst) **tetap harus diisi**
     seperti biasa dan tetap dihitung nilainya.
  2. **Kunci ceklis sampai waktu Isya** — admin bisa mengunci amaliyah
     tertentu (misal "Shalat 5 waktu tepat waktu") lewat ikon 🔒 di tab
     Amaliyah, supaya tidak bisa dicentang sebelum Isya benar-benar
     masuk. Jadwal Isya diambil otomatis dari Aladhan API (metode
     Kemenag RI) berdasarkan **Kota Sekolah** yang diatur di tab
     Pengaturan.
- `manifest.json` — identitas aplikasi (nama, warna, ikon)
- `service-worker.js` — auto-update (network-first); versi cache
  dinaikkan ke `amaliyah-harian-v4` supaya HP yang sudah install
  langsung ambil versi baru ini
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` — ikon aplikasi

## Fitur baru: Tanggal Mulai Aplikasi
Supaya nilai santri tidak terlihat jelek hanya karena hari-hari sebelum
aplikasi ini dipakai (misalnya aplikasi baru mulai dipakai tanggal 8,
tapi nilai bulanan dihitung dari tanggal 1), sekarang ada pengaturan
**Tanggal Mulai Aplikasi** di tab Pengaturan (admin). Hari sebelum
tanggal itu otomatis dikecualikan dari:
- Nilai bulanan & mingguan (di tab Nilai admin maupun orang tua)
- Simulasi proyeksi nilai
- Papan peringkat bulanan/mingguan
- Kalender riwayat santri (hari sebelum mulai ditandai abu-abu, bukan
  "tidak mengisi")

Isi sekali di tab Pengaturan sesuai tanggal sebenarnya sekolah mulai
memakai aplikasi ini secara aktif.

## Cara update repo GitHub
1. Buka repo → upload/replace `index.html`, `manifest.json`, dan
   `service-worker.js` dengan isi dari paket ini (klik file → ikon
   pensil → hapus semua isi lama → tempel isi baru → Commit). Ikon
   tidak perlu diupload ulang kalau sudah ada.
2. Setelah dicommit, buka lagi aplikasi di HP (harus online sekali
   supaya versi baru terambil). Fitur udzur & kunci Isya akan langsung
   aktif.

## Setelah update, perlu diatur sekali di awal
- **Tab Pengaturan (admin)** → isi **Kota Sekolah** (contoh: Jakarta,
  Bandung, dst) → Simpan Kota.
- **Tab Amaliyah (admin)**:
  - Klik ikon 🔓 di sebelah "Shalat 5 waktu tepat waktu" supaya
    berubah jadi 🔒 (terkunci sampai Isya). Amaliyah lain dibiarkan
    🔓 kalau tidak perlu dikunci.
  - Khusus grup **Banat**: klik ikon 🕌 di sebelah amaliyah yang
    terkait shalat (Shalat Tahajud, Shalat Subuh berjamaah, Shalat 5
    waktu) supaya ikonnya aktif (warna gelap) — ini menandai amaliyah
    tersebut otomatis dikecualikan saat santri sedang udzur (haid).
    Amaliyah non-shalat (Tilawah, bantu rumah, belajar) **jangan**
    ditandai, supaya tetap wajib diisi.

## Cara kerja fitur udzur haid
- Di ceklis santri banat, orang tua bisa centang "Tandai udzur (haid)
  hari ini". Selama aktif, amaliyah yang ditandai 🕌 (terkait shalat)
  akan tampil sebagai "Udzur" — tidak perlu diisi dan tidak dihitung
  di nilai. Amaliyah lain tetap tampil normal dan tetap wajib diisi.
- Papan peringkat harian dan rekap nilai (harian/mingguan/bulanan/
  simulasi) semuanya sudah menyesuaikan: total amaliyah santri yang
  sedang udzur otomatis dikurangi jumlah amaliyah 🕌 hari itu.
- Kalau tercentang tidak sengaja, tinggal un-centang lagi.

## Cara kerja kunci waktu Isya
- Berlaku untuk amaliyah manapun yang ditandai 🔒 oleh admin.
- Sebelum waktu Isya (berdasar jadwal kota sekolah), checkbox-nya
  nonaktif dan menampilkan perkiraan jam Isya.
- Kalau jadwal gagal diambil (misal HP sedang offline), ceklis **tidak
  diblokir** — supaya orang tua tidak dirugikan karena masalah koneksi.

## Catatan tentang Firebase & repo publik
Config Firebase (apiKey, databaseURL, dst) ada langsung di dalam
`index.html`. Ini wajar untuk aplikasi web berbasis Firebase — yang
benar-benar menjaga keamanan data adalah **Security Rules** di
Firebase Console (Realtime Database → Rules), jadi pastikan itu sudah
diatur supaya hanya role/user yang berhak yang bisa baca/tulis data.
