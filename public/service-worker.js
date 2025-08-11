caches.keys().then(function (names) {
    for (let name of names) caches.delete(name);
});
navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
        registration.unregister();
        location.reload();
    }
});
