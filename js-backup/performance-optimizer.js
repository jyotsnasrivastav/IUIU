// Performance Optimizer - Core Web Vitals Fix
(function() {
    'use strict';
    
    // 1. REDUCE TOTAL BLOCKING TIME (3,080ms → <300ms)
    
    // Break up long tasks using scheduler.postTask or setTimeout
    function breakUpLongTasks() {
        const tasks = [];
        let taskIndex = 0;
        
        function scheduleTask(fn, priority = 'background') {
            if ('scheduler' in window && 'postTask' in scheduler) {
                return scheduler.postTask(fn, { priority });
            } else {
                return new Promise(resolve => {
                    setTimeout(() => resolve(fn()), 0);
                });
            }
        }
        
        // Defer non-critical JavaScript
        const scripts = document.querySelectorAll('script[data-defer="true"]');
        scripts.forEach(script => {
            scheduleTask(() => {
                const newScript = document.createElement('script');
                newScript.src = script.src;
                newScript.async = true;
                document.head.appendChild(newScript);
            }, 'background');
        });
    }
    
    // 2. OPTIMIZE FIRST CONTENTFUL PAINT (1.4s → <1.2s)
    
    // Preload critical resources
    function optimizeFCP() {
        // Preload critical fonts
        const fontPreload = document.createElement('link');
        fontPreload.rel = 'preload';
        fontPreload.href = 'https://fonts.googleapis.com/css2?family=Arial:wght@400;700&display=swap';
        fontPreload.as = 'style';
        fontPreload.crossOrigin = 'anonymous';
        document.head.insertBefore(fontPreload, document.head.firstChild);
        
        // Optimize critical CSS delivery
        const criticalCSS = document.querySelector('style');
        if (criticalCSS) {
            criticalCSS.textContent += `
                /* Enhanced critical CSS for faster FCP */
                body { font-display: swap; }
                .mainlogo img { 
                    content-visibility: auto;
                    contain-intrinsic-size: 270px 50px;
                }
                .symbol {
                    content-visibility: auto;
                    contain-intrinsic-size: 50px 50px;
                }
            `;
        }
    }
    
    // 3. IMPROVE LARGEST CONTENTFUL PAINT (2.6s → <2.5s)
    
    function optimizeLCP() {
        // Preload LCP image
        const lcpImage = document.querySelector('.mainlogo img');
        if (lcpImage && lcpImage.src) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.href = lcpImage.src;
            preloadLink.as = 'image';
            document.head.appendChild(preloadLink);
        }
        
        // Optimize image loading
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            if (index < 3) { // First 3 images are critical
                img.loading = 'eager';
                img.decoding = 'sync';
            } else {
                img.loading = 'lazy';
                img.decoding = 'async';
            }
        });
    }
    
    // 4. FIX CUMULATIVE LAYOUT SHIFT (0.217 → <0.1)
    
    function fixCLS() {
        // Set explicit dimensions for images
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
            if (img.classList.contains('mainlogo')) {
                img.width = 270;
                img.height = 50;
            } else {
                img.width = 50;
                img.height = 50;
            }
            img.style.aspectRatio = `${img.width}/${img.height}`;
        });
        
        // Reserve space for dynamic content
        const dynamicElements = document.querySelectorAll('.symbol');
        dynamicElements.forEach(el => {
            el.style.minHeight = '50px';
            el.style.minWidth = '50px';
        });
        
        // Prevent layout shifts from web fonts
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
    
    // 5. IMPROVE SPEED INDEX (4.0s → <3.4s)
    
    function optimizeSpeedIndex() {
        // Progressive enhancement for symbols
        const symbolContainer = document.querySelector('.maindata');
        if (symbolContainer) {
            // Show skeleton loading
            symbolContainer.innerHTML = `
                <div class="skeleton-loader">
                    ${Array(20).fill('<div class="skeleton-symbol"></div>').join('')}
                </div>
            `;
            
            // Load actual content progressively
            scheduleTask(() => {
                loadSymbolsProgressively();
            }, 'user-visible');
        }
    }
    
    function loadSymbolsProgressively() {
        const symbolData = window.symbolData || [];
        const container = document.querySelector('.maindata');
        const fragment = document.createDocumentFragment();
        
        // Load in chunks of 10
        let index = 0;
        function loadChunk() {
            const chunk = symbolData.slice(index, index + 10);
            chunk.forEach(symbol => {
                const div = document.createElement('div');
                div.className = 'symbol';
                div.textContent = symbol.char;
                div.title = symbol.name;
                fragment.appendChild(div);
            });
            
            container.appendChild(fragment);
            index += 10;
            
            if (index < symbolData.length) {
                scheduleTask(loadChunk, 'background');
            }
        }
        
        loadChunk();
    }
    
    // 6. RESOURCE OPTIMIZATION
    
    function optimizeResources() {
        // Compress and optimize JavaScript execution
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            if (!script.async && !script.defer) {
                script.defer = true;
            }
        });
        
        // Optimize CSS loading
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach(link => {
            if (!link.media || link.media === 'all') {
                link.media = 'print';
                link.onload = function() {
                    this.media = 'all';
                    this.onload = null;
                };
            }
        });
    }
    
    // 7. PERFORMANCE MONITORING
    
    function monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // Monitor LCP
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // Monitor CLS
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                console.log('CLS:', clsValue);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            
            // Monitor FID/INP
            const fidObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log('FID:', entry.processingStart - entry.startTime);
                }
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        }
    }
    
    // Initialize optimizations
    function init() {
        // Critical optimizations first
        optimizeFCP();
        fixCLS();
        
        // Then progressive enhancements
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                optimizeLCP();
                breakUpLongTasks();
                optimizeSpeedIndex();
                optimizeResources();
                monitorPerformance();
            });
        } else {
            optimizeLCP();
            breakUpLongTasks();
            optimizeSpeedIndex();
            optimizeResources();
            monitorPerformance();
        }
    }
    
    // Helper function for task scheduling
    function scheduleTask(fn, priority = 'background') {
        if ('scheduler' in window && 'postTask' in scheduler) {
            return scheduler.postTask(fn, { priority });
        } else {
            return new Promise(resolve => {
                setTimeout(() => resolve(fn()), 0);
            });
        }
    }
    
    init();
})();

// Add skeleton CSS for loading states
const skeletonCSS = document.createElement('style');
skeletonCSS.textContent = `
.skeleton-loader {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem;
}

.skeleton-symbol {
    width: 50px;
    height: 50px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 5px;
}

@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.fonts-loaded {
    font-display: swap;
}
`;
document.head.appendChild(skeletonCSS);
