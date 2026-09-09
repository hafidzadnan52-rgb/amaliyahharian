// Naikkan angka versi ini SETIAP KALI kamu push perubahan besar ke GitHub,
// supaya HP pengguna lama membuang cache lama dan mengambil yang baru.
const CACHE_NAME = 'amaliyah-harian-v3';

const CORE_FILES = [
  './',
  './index.html',
  './manifest.json',
];

// Saat service worker pertama kali dipasang: simpan file inti ke cache
self.addEventListener('install', (event) => {
  self.skipWaiting(); // langsung aktif, tidak nunggu tab lama ditutup
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_FILES))
  );
});

// Saat aktif: hapus cache versi lama biar tidak menumpuk
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Strategi: NETWORK-FIRST
// -> Kalau HP online: selalu ambil versi terbaru dari GitHub Pages (ini yang
//    bikin app "mengikuti" update di GitHub setiap kali dibuka).
// -> Kalau HP offline: pakai versi terakhir yang tersimpan di cache, supaya
//    app tetap bisa dibuka walau tidak ada internet.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return networkResponse;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
  );
});
