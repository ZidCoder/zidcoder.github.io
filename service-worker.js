importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
  //CACHEES
  workbox.precaching.precacheAndRoute([{
      url: '/index.html',
      revision: '2'
    },
    {
      url: '/team.html',
      revision: '2'
    },
    {
      url: '/manifest.json',
      revision: '2'
    },
    {
      url: '/push.js',
      revision: '2'
    },
    {
      url: '/nav.html',
      revision: '2'
    },
    {
      url: '/css/materialize.min.css',
      revision: '2'
    },
    {
      url: '/css/style.css',
      revision: '2'
    },
    {
      url: '/js/materialize.min.js',
      revision: '2'
    },
    {
      url: '/js/api.js',
      revision: '2'
    },
    {
      url: '/js/db.js',
      revision: '2'
    },
    {
      url: '/js/nav.js',
      revision: '2'
    },
    {
      url: '/js/idb.js',
      revision: '2'
    },
    {
      url: '/img/bg.jpg',
      revision: '2'
    },
    {
      url: '/icon 192x192.png',
      revision: '2'
    },
    {
      url: '/icon 512x512.png',
      revision: '2'
    },
    {
      url: '/pages/about.html',
      revision: '2'
    },
    {
      url: '/pages/favorite.html',
      revision: '2'
    },
    {
      url: '/pages/home.html',
      revision: '2'
    },
    {
      url: '/pages/standings.html',
      revision: '2'
    }
  ], {
    ignoreUrlParametersMatching: [/.*/]
  });
  workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
    })
  )
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
        }),
      ],
    }),
  );
  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static',
    })
  )
  // Menyimpan font awesome google css
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  )

  // Menyimpan cache untuk file font selama 1 tahun
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  )
  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'CACHES_NAME'
    })
  )
} else {
  console.log("Workbox Gagal di muat")
}

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: '/icon 192x192.png',
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