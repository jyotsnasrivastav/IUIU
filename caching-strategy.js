// Advanced Caching Strategy Implementation
// Service Worker + Cache API + HTTP Headers

// 1. SERVICE WORKER REGISTRATION
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}

// 2. CACHE IMPLEMENTATION
const CACHE_NAME = 'symbolsemoji-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/main.css',
    '/main.min.css',
    '/critical-performance-fix.js',
    '/ultra-performance-optimizer.js',
    '/image-optimizer.js',
    '/img/symbolsemoji.com.webp',
    '/img/favicon-96x96.png'
];

// 3. CACHE STRATEGIES
const cacheStrategies = {
    // Cache First - for static assets
    cacheFirst: async (request) => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(request);
        return cached || fetch(request);
    },
    
    // Network First - for HTML pages
    networkFirst: async (request) => {
        const cache = await caches.open(DYNAMIC_CACHE);
        try {
            const response = await fetch(request);
            cache.put(request, response.clone());
            return response;
        } catch (error) {
            return await cache.match(request);
        }
    },
    
    // Stale While Revalidate - for CSS/JS
    staleWhileRevalidate: async (request) => {
        const cache = await caches.open(DYNAMIC_CACHE);
        const cached = await cache.match(request);
        
        const fetchPromise = fetch(request).then(response => {
            cache.put(request, response.clone());
            return response;
        });
        
        return cached || fetchPromise;
    }
};

// 4. BROWSER CACHE OPTIMIZATION
const optimizeBrowserCache = () => {
    // Set cache headers via meta tags
    const cacheHeaders = [
        { name: 'Cache-Control', content: 'public, max-age=31536000' },
        { name: 'Expires', content: new Date(Date.now() + 31536000000).toUTCString() }
    ];
    
    cacheHeaders.forEach(header => {
        const meta = document.createElement('meta');
        meta.httpEquiv = header.name;
        meta.content = header.content;
        document.head.appendChild(meta);
    });
};

// 5. LOCAL STORAGE CACHE
const localStorageCache = {
    set: (key, data, ttl = 3600000) => { // 1 hour default
        const item = {
            data: data,
            timestamp: Date.now(),
            ttl: ttl
        };
        localStorage.setItem(key, JSON.stringify(item));
    },
    
    get: (key) => {
        const item = localStorage.getItem(key);
        if (!item) return null;
        
        const parsed = JSON.parse(item);
        if (Date.now() - parsed.timestamp > parsed.ttl) {
            localStorage.removeItem(key);
            return null;
        }
        
        return parsed.data;
    },
    
    clear: () => {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('symbolsemoji-')) {
                localStorage.removeItem(key);
            }
        });
    }
};

// 6. MEMORY CACHE FOR SYMBOLS
const symbolCache = new Map();
const cacheSymbols = () => {
    const symbols = document.querySelectorAll('.symbol');
    symbols.forEach((symbol, index) => {
        const text = symbol.textContent;
        symbolCache.set(`symbol-${index}`, text);
    });
    
    // Store in localStorage
    localStorageCache.set('symbolsemoji-symbols', Array.from(symbolCache.entries()));
};

// 7. PRELOAD CACHE
const preloadCache = async () => {
    if ('caches' in window) {
        const cache = await caches.open(STATIC_CACHE);
        await cache.addAll(STATIC_ASSETS);
    }
};

// 8. CACHE CLEANUP
const cleanupCache = async () => {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
        name !== STATIC_CACHE && name !== DYNAMIC_CACHE
    );
    
    await Promise.all(
        oldCaches.map(name => caches.delete(name))
    );
};

// Initialize caching
document.addEventListener('DOMContentLoaded', () => {
    optimizeBrowserCache();
    cacheSymbols();
    preloadCache();
    cleanupCache();
});
