// Service Worker for Push Notifications
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    event.waitUntil(
        clients.matchAll().then(function(clientList) {
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});

self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'New order';
    const options = {
        body: data.body || '[Ryzu] You have new order for 1 items totaling 49.99$ from Online Store.',
        icon: 'shopify.png',
        badge: 'shopify.png',
        tag: 'shopify-order',
        requireInteraction: false,
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

