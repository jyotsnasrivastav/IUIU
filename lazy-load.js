// Lazy loading implementation for images and content
(function() {
    'use strict';
    
    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                    img.removeAttribute('data-srcset');
                }
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    // Content lazy loading for symbols
    const contentObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (element.dataset.content) {
                    element.innerHTML = element.dataset.content;
                    element.removeAttribute('data-content');
                }
                element.classList.remove('lazy-content');
                observer.unobserve(element);
            }
        });
    }, {
        rootMargin: '100px 0px',
        threshold: 0.01
    });
    
    // Initialize lazy loading
    function initLazyLoading() {
        // Lazy load images
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
        
        // Lazy load content
        document.querySelectorAll('.lazy-content').forEach(element => {
            contentObserver.observe(element);
        });
    }
    
    // Critical CSS injection for above-the-fold content
    function injectCriticalCSS() {
        const criticalCSS = `
            .lazy { opacity: 0; transition: opacity 0.3s; }
            .lazy.loaded { opacity: 1; }
            .lazy-content { min-height: 50px; background: #f5f5f5; }
            .symbol { contain: layout style paint; }
            .mainlogo img { contain: layout; }
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.appendChild(style);
    }
    
    // Preload critical resources
    function preloadCriticalResources() {
        const preloadLinks = [
            { href: 'img/symbolsemoji.webp', as: 'image' },
            { href: 'main.min.css', as: 'style' }
        ];
        
        preloadLinks.forEach(link => {
            const linkEl = document.createElement('link');
            linkEl.rel = 'preload';
            linkEl.href = link.href;
            linkEl.as = link.as;
            document.head.appendChild(linkEl);
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            injectCriticalCSS();
            initLazyLoading();
            preloadCriticalResources();
        });
    } else {
        injectCriticalCSS();
        initLazyLoading();
        preloadCriticalResources();
    }
})();
