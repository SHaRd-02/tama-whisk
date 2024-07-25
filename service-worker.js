// service-worker.js


self.addEventListener('install', function(event) {
  console.log('Service Worker instalado');
  event.waitUntil(
    // Registrar la sincronización periódica
    self.registration.periodicSync.register({
      tag: 'every-10-seconds',
      minInterval: 10 * 1000 // 10 segundos en milisegundos
    }).then(() => {
      console.log('Sincronización periódica registrada');
    }).catch(err => {
      console.error('Error al registrar sincronización periódica:', err);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activado');
  event.waitUntil(
    // Aquí puedes colocar código para inicializar el Service Worker, como sincronizar datos
  );
});

// Función para reducir la salud
async function decreaseHealth() {
  console.log('Reduciendo salud...');
  const health = parseInt(await getLocalStorageItem('health'), 10);
  let newHealth = health - 5;
  if (newHealth < 0) newHealth = 0;

  await setLocalStorageItem('health', newHealth);
  healthElement.innerText = newHealth;
  console.log('Nueva salud:', newHealth);

  if (newHealth < 50) {
    self.registration.showNotification('¡Atención!', {
      body: 'Tu mascota necesita comida. Por favor, aliméntala.',
      icon: '/path/to/icon.png'
    });
  }
}

// Función auxiliar para obtener datos del localStorage
async function getLocalStorageItem(key) {
  return new Promise((resolve) => {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({ type: 'get', key });
        client.onmessage = (event) => {
          console.log('Obteniendo del localStorage:', event.data.value);
          resolve(event.data.value);
        };
      });
    });
  });
}

// Función auxiliar para establecer datos en el localStorage
async function setLocalStorageItem(key, value) {
  return new Promise((resolve) => {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({ type: 'set', key, value });
        client.onmessage = () => {
          console.log('Establecido en el localStorage:', key, value);
          resolve();
        };
      });
    });
  });
}

// Manejar la sincronización periódica
self.addEventListener('periodic-sync', function(event) {
  console.log('Sincronización periódica activada');
  if (event.tag === 'every-10-seconds') {
    event.waitUntil(decreaseHealth());
  }
});
