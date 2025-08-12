export default defineNuxtPlugin(() => {
  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        console.log('Service Worker registered successfully:', registration);

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                // New content is available, refresh the page
                console.log('New content available, refreshing...');
                window.location.reload();
              }
            });
          }
        });

        // Check for updates every 20 seconds
        setInterval(() => {
          registration.update();
        }, 20000);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    });
  } else {
    console.warn('Service Worker is not supported in this browser');
  }
});
