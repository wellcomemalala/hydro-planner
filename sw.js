// Service Worker – ทำให้ติดตั้งเป็นแอปได้ และเปิดได้แม้เน็ตไม่ดี
// ถ้าแก้ไฟล์ index.html แล้วอยากให้มือถืออัปเดตเร็ว ให้เปลี่ยนเลขเวอร์ชันนี้
const CACHE = 'hydroplan-v5';
const ASSETS = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // ไม่ยุ่งกับ Firebase / Google APIs (ให้ Firebase จัดการเอง)
  if (url.origin !== location.origin) return;
  // Network first: ได้เวอร์ชันล่าสุดเสมอ ถ้าเน็ตหลุดค่อยใช้ของในแคช
  e.respondWith(
    fetch(req).then(res => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
