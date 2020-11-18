importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

//precache
workbox.precaching.precacheAndRoute([
    "./",
    "https://fonts.gstatic.com/s/oswald/v35/TK3iWkUHHAIjg752FD8Gl-1PK62t.woff2",
    "./assets/icon/favicon.png",
    "./assets/icon/apple-icon-120.jpg",
    "./assets/icon/apple-icon-152.jpg",
    "./assets/icon/apple-icon-167.jpg",
    "./assets/icon/apple-icon-180.jpg",
    "./assets/icon/manifest-icon-192.png",
    "./assets/icon/manifest-icon-512.png",
    "./assets/splash/apple-splash-640-1136.jpg",
    "./assets/splash/apple-splash-750-1334.jpg",
    "./assets/splash/apple-splash-1125-2436.jpg",
    "./assets/splash/apple-splash-1242-2208.jpg",
    "./assets/splash/apple-splash-1536-2048.jpg",
    "./assets/splash/apple-splash-1668-2224.jpg",
    "./assets/splash/apple-splash-2048-2732.jpg",
    "./manifest.json",
    "./nav.html",
    "./index.html",
    "./css/materialize.min.css",
    "./css/styles.css",
    "./js/materialize.min.js",
    "./js/nav.js",
    "./js/api.js",
    "./js/idb.js",
    "./js/db.js",
    "./js/script.js",
    "./notify.js"
])

// caching pages
workbox.routing.registerRoute(
    new RegExp('/pages/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org\/v2\/competitions\/CL\/(standings|teams)/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'football-data'
    })
);

self.addEventListener('push', function (event) {
    console.log('push called')
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});