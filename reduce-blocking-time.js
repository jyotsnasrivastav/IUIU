const fs = require('fs');

// Reduce Total Blocking Time by optimizing script loading
function reduceBlockingTime() {
    const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
    
    const optimizations = [
        // Move large inline scripts to separate files and load them async
        {
            from: /<script>\s*\/\/ Advanced Reflow Prevention and DOM Optimization[\s\S]*?<\/script>/g,
            to: '<script src="dom-optimizer.js" async></script>'
        },
        
        // Optimize script loading order - critical scripts first, others async
        {
            from: /<script src="script\.min\.js" async><\/script>\s*<script src="lazy-load\.js" async><\/script>\s*<script src="ad-blocker\.js" async><\/script>\s*<script src="performance-audit\.js" async><\/script>\s*<script src="treemap-analyzer\.js" async><\/script>\s*<script src="layout-shift-prevention\.js" defer><\/script>/g,
            to: `<script src="script.min.js" defer></script>
<script>
// Load non-critical scripts after page load
window.addEventListener('load', function() {
    const scripts = [
        'lazy-load.js',
        'ad-blocker.js', 
        'performance-audit.js',
        'treemap-analyzer.js',
        'layout-shift-prevention.js'
    ];
    
    scripts.forEach((src, index) => {
        setTimeout(() => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.head.appendChild(script);
        }, index * 50); // Stagger loading by 50ms
    });
});
</script>`
        }
    ];
    
    let totalFixed = 0;
    
    htmlFiles.forEach(file => {
        try {
            let content = fs.readFileSync(file, 'utf8');
            let fileFixed = false;
            
            optimizations.forEach(opt => {
                if (opt.from.test(content)) {
                    content = content.replace(opt.from, opt.to);
                    fileFixed = true;
                }
            });
            
            if (fileFixed) {
                fs.writeFileSync(file, content);
                console.log(`Reduced blocking time in: ${file}`);
                totalFixed++;
            }
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    });
    
    console.log(`\nBlocking time reduction complete! Fixed ${totalFixed} files.`);
    console.log('Scripts now load with reduced main thread blocking.');
}

// Extract the large inline script to separate file
function extractDOMOptimizer() {
    const domOptimizerContent = `// Advanced Reflow Prevention and DOM Optimization
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
        style.textContent = \`
            .symbol { contain: layout style paint; will-change: transform; }
            .symbolTabel { contain: layout; }
            .maindata { contain: layout style; }
            .visible { transform: translateZ(0); }
        \`;
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
    
})();`;

    try {
        fs.writeFileSync('dom-optimizer.js', domOptimizerContent);
        console.log('Created dom-optimizer.js file');
    } catch (error) {
        console.error('Error creating dom-optimizer.js:', error.message);
    }
}

// Run optimizations
extractDOMOptimizer();
reduceBlockingTime();
