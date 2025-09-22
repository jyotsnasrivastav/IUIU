// Advanced Reflow Prevention and DOM Optimization
(function() {
    'use strict';
    
    // Batch DOM operations to prevent forced reflows
    class DOMBatcher {
        constructor() {
            this.readQueue = [];
            this.writeQueue = [];
            this.scheduled = false;
            this.layoutCache = new WeakMap();
        }
        
        scheduleFlush() {
            if (!this.scheduled) {
                this.scheduled = true;
                requestAnimationFrame(() => this.flushQueues());
            }
        }
        
        flushQueues() {
            // Execute all reads first (batched)
            this.readQueue.forEach(fn => fn());
            this.readQueue = [];
            
            // Then execute all writes (batched)
            this.writeQueue.forEach(fn => fn());
            this.writeQueue = [];
            
            this.scheduled = false;
        }
        
        read(fn) {
            this.readQueue.push(fn);
            this.scheduleFlush();
        }
        
        write(fn) {
            this.writeQueue.push(fn);
            this.scheduleFlush();
        }
        
        // Cache layout properties to avoid repeated calculations
        getCachedLayout(element, property) {
            if (!this.layoutCache.has(element)) {
                this.layoutCache.set(element, {});
            }
            
            const cache = this.layoutCache.get(element);
            if (!(property in cache)) {
                this.read(() => {
                    cache[property] = element[property];
                });
            }
            
            return cache[property];
        }
        
        clearCache() {
            this.layoutCache.clear();
        }
    }
    
    const domBatcher = new DOMBatcher();
    
    // Optimize common DOM operations
    const originalMethods = {};
    
    // Override problematic methods with batched versions
    ['offsetWidth', 'offsetHeight', 'clientWidth', 'clientHeight', 'scrollWidth', 'scrollHeight'].forEach(prop => {
        Object.defineProperty(Element.prototype, '_' + prop, {
            get: function() {
                return domBatcher.getCachedLayout(this, prop);
            }
        });
    });
    
    // Optimize getBoundingClientRect
    Element.prototype._getBoundingClientRect = function() {
        return domBatcher.getCachedLayout(this, 'boundingClientRect') || 
               domBatcher.getCachedLayout(this, 'boundingClientRect', () => this.getBoundingClientRect());
    };
    
    // Clear cache on resize and scroll
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            domBatcher.clearCache();
        }, 100);
    }, { passive: true });
    
    // Intersection Observer for visibility-based optimizations
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });
    
    // Auto-observe elements that might cause reflows
    function observeElements() {
        document.querySelectorAll('.symbol, .maindata, .symbolTabel').forEach(el => {
            visibilityObserver.observe(el);
        });
    }
    
    // Initialize optimizations
    function init() {
        observeElements();
        
        // Add CSS containment for better performance
        const style = document.createElement('style');
        style.textContent = `
            .symbol { contain: layout style paint; will-change: transform; }
            .symbolTabel { contain: layout; }
            .maindata { contain: layout style; }
            .visible { transform: translateZ(0); }
        `;
        document.head.appendChild(style);
    }
    
    // Public API
    window.DOMOptimizer = {
        batchRead: (fn) => domBatcher.read(fn),
        batchWrite: (fn) => domBatcher.write(fn),
        clearCache: () => domBatcher.clearCache(),
        observeElement: (el) => visibilityObserver.observe(el)
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
