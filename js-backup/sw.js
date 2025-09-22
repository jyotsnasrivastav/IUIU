// Service Worker for Advanced Caching
// Implements Cache-First, Network-First, and Stale-While-Revalidate strategies

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/main.css',
    '/main.min.css',
    '/critical-performance-fix.js',
    '/ultra-performance-optimizer.js',
    '/image-optimizer.js',
    '/caching-strategy.js'
];

const IMAGE_ASSETS = [
    '/img/symbolsemoji.com.webp',
    '/img/favicon-96x96.png',
    '/img/apple-touch-icon.png'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS)),
            caches.open(IMAGE_CACHE).then(cache => cache.addAll(IMAGE_ASSETS))
        ])
    );
    self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheName.includes(CACHE_VERSION)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') return;
    
    // Cache strategy based on resource type
    if (request.destination === 'image') {
        event.respondWith(cacheFirst(request, IMAGE_CACHE));
    } else if (request.destination === 'style' || request.destination === 'script') {
        event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
    } else if (request.destination === 'document') {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    } else {
        event.respondWith(cacheFirst(request, STATIC_CACHE));
    }
});

// Cache First Strategy - for static assets and images
async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
        return cached;
    }
    
    try {
        const response = await fetch(request);
        if (response.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        return new Response('Offline', { status: 503 });
    }
}

// Network First Strategy - for HTML pages
async function networkFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    
    try {
        const response = await fetch(request);
        if (response.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        const cached = await cache.match(request);
        return cached || new Response('Offline', { status: 503 });
    }
}

// Stale While Revalidate Strategy - for CSS/JS
async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    const fetchPromise = fetch(request).then(response => {
        if (response.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    }).catch(() => cached);
    
    return cached || fetchPromise;
}
