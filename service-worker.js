// service-worker.js

self.addEventListener('install', function(event) {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './styles.css',
        './app.js',
        './manifest.json',
        './assets/icons/icon-36x36.png', // Añadir aquí todos los recursos que deseas cachear
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activado');
  event.waitUntil(
    // Aquí puedes colocar código para inicializar el Service Worker, como sincronizar datos
    Promise.resolve() // Solo para evitar el error de waitUntil
  );
});

