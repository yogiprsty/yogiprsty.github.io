importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

//precache
workbox.precaching.precacheAndRoute([
    { url: "./", revision: '1' },
    { url: "./assets/icon/favicon.png", revision: '1' },
    { url: "./assets/icon/apple-icon-120.jpg", revision: '1' },
    { url: "./assets/icon/apple-icon-152.jpg", revision: '1' },
    { url: "./assets/icon/apple-icon-167.jpg", revision: '1' },
    { url: "./assets/icon/apple-icon-180.jpg", revision: '1' },
    { url: "./assets/icon/manifest-icon-192.png", revision: '1' },
    { url: "./assets/icon/manifest-icon-512.png", revision: '1' },
    { url: "./assets/splash/apple-splash-640-1136.jpg", revision: '1' },
    { url: "./assets/splash/apple-splash-750-1334.jpg", revision: '1' },
    { url: "./assets/splash/apple-splash-1125-2436.jpg", revision: '1' },
    { url: "./assets/splash/apple-splash-1242-2208.jpg", revision: '1' },
    { url: "./assets/splash/apple-splash-1536-2048.jpg", revision: '1' },
    { url: "./assets/splash/apple-splash-1668-2224.jpg", revision: '1' },
    { url: "./assets/splash/apple-splash-2048-2732.jpg", revision: '1' },
    { url: "./manifest.json", revision: '1' },
    { url: "./nav.html", revision: '1' },
    { url: "./index.html", revision: '1' },
    { url: "./css/materialize.min.css", revision: '1' },
    { url: "./css/styles.css", revision: '1' },
    { url: "./js/materialize.min.js", revision: '1' },
    { url: "./js/nav.js", revision: '1' },
    { url: "./js/api.js", revision: '1' },
    { url: "./js/idb.js", revision: '1' },
    { url: "./js/db.js", revision: '1' },
    { url: "./js/script.js", revision: '1' },
    { url: "./notify.js", revision: '1' }
])

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

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
        cacheName: 'football-data',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ]
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