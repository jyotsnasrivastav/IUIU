// Ultra Performance Optimizer - Aggressive Core Web Vitals Fix
// Target: FCP 3.8s→<1.8s, LCP 16.1s→<2.5s, CLS 1→<0.1, Speed Index 4.3s→<3.4s

(function() {
    'use strict';
    
    // IMMEDIATE CRITICAL PATH OPTIMIZATION
    const startTime = performance.now();
    
    // 1. AGGRESSIVE SCRIPT DEFERRAL - Fix FCP/TBT
    const deferAllScripts = () => {
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            if (!script.src.includes('critical') && !script.src.includes('ultra')) {
                script.remove();
                
                // Re-add as deferred after load
                window.addEventListener('load', () => {
                    const newScript = document.createElement('script');
                    newScript.src = script.src;
                    newScript.defer = true;
                    newScript.async = true;
                    document.head.appendChild(newScript);
                }, { once: true });
            }
        });
    };
    
    // 2. CRITICAL CSS INJECTION - Fix FCP
    const injectCriticalCSS = () => {
        const criticalCSS = `
            *{box-sizing:border-box;margin:0;padding:0}
            body{font:16px/1.4 system-ui,-apple-system,sans-serif;background:#ebecef;margin:0}
            header{width:100%;background:#230AC7;height:60px;contain:strict}
            .headCont{max-width:1168px;margin:0 auto;text-align:center;height:60px}
            .mainlogo{width:100%;background:#230AC7;color:#fff;padding:5px 0;height:50px;contain:strict}
            .mainlogo img{width:270px;height:50px;aspect-ratio:270/50;display:block;margin:0 auto}
            .symbol{text-align:center;margin:0 0 0.5rem 0.1rem;border:1px solid #d3d3d3;display:inline-block;width:50px;height:50px;font-size:30px;line-height:50px;cursor:pointer;contain:strict;transform:translateZ(0)}
            .symbol:hover{background:#ececec;transform:translateY(-2px)}
            .maindata{min-height:400px;contain:strict;display:block;visibility:visible}
            .footer{height:80px;contain:strict}
            img{image-rendering:optimizeSpeed;image-rendering:-webkit-optimize-contrast}
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
    };
    
    // 3. LAYOUT SHIFT ELIMINATION - Fix CLS
    const eliminateLayoutShift = () => {
        // Pre-allocate all dimensions
        const allocateDimensions = () => {
            // Logo dimensions
            const logoImg = document.querySelector('.mainlogo img');
            if (logoImg) {
                logoImg.width = 270;
                logoImg.height = 50;
                logoImg.style.cssText = 'width:270px;height:50px;aspect-ratio:270/50;display:block;margin:0 auto';
            }
            
            // Symbol dimensions
            document.querySelectorAll('.symbol').forEach(symbol => {
                symbol.style.cssText = 'width:50px;height:50px;min-width:50px;min-height:50px;display:inline-block;contain:strict';
            });
            
            // Container dimensions
            const maindata = document.querySelector('.maindata');
            if (maindata) {
                maindata.style.cssText = 'min-height:400px;contain:strict;display:block;visibility:visible';
            }
            
            // Footer dimensions
            const footer = document.querySelector('.footer');
            if (footer) {
                footer.style.cssText = 'height:80px;contain:strict';
            }
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', allocateDimensions);
        } else {
            allocateDimensions();
        }
    };
    
    // 4. AGGRESSIVE RESOURCE PRELOADING - Fix LCP
    const preloadCriticalResources = () => {
        const resources = [
            { href: 'main.css', as: 'style', importance: 'high' },
            { href: 'main.min.css', as: 'style', importance: 'high' },
            { href: 'img/symbolsemoji.com.webp', as: 'image', importance: 'high' }
        ];
        
        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.importance) link.importance = resource.importance;
            if (resource.as === 'style') {
                link.onload = function() { 
                    this.rel = 'stylesheet'; 
                    this.media = 'all';
                };
            }
            document.head.appendChild(link);
        });
    };
    
    // 5. FONT OPTIMIZATION - Fix FCP
    const optimizeFonts = () => {
        // Preconnect to font providers
        const preconnects = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];
        
        preconnects.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = url;
            if (url.includes('gstatic')) link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
        
        // Force font-display: swap
        const fontStyle = document.createElement('style');
        fontStyle.textContent = `
            @font-face { font-display: swap; }
            * { font-display: swap !important; }
            body { font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
        `;
        document.head.appendChild(fontStyle);
    };
    
    // 6. PROGRESSIVE SYMBOL LOADING - Fix Speed Index
    const progressiveSymbolLoad = () => {
        const loadSymbols = () => {
            const symbols = document.querySelectorAll('.symbol');
            
            // Load first 20 symbols immediately
            symbols.forEach((symbol, index) => {
                if (index < 20) {
                    symbol.style.visibility = 'visible';
                    symbol.style.display = 'inline-block';
                } else {
                    // Lazy load remaining symbols
                    symbol.style.contentVisibility = 'auto';
                    symbol.style.containIntrinsicSize = '50px 50px';
                    
                    // Load when near viewport
                    if ('IntersectionObserver' in window) {
                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    entry.target.style.visibility = 'visible';
                                    entry.target.style.display = 'inline-block';
                                    observer.unobserve(entry.target);
                                }
                            });
                        }, { rootMargin: '100px' });
                        
                        observer.observe(symbol);
                    }
                }
            });
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadSymbols);
        } else {
            loadSymbols();
        }
    };
    
    // 7. IMAGE OPTIMIZATION - Fix LCP
    const optimizeImages = () => {
        const optimizeImg = () => {
            document.querySelectorAll('img').forEach(img => {
                // Add loading attributes
                if (!img.loading) img.loading = 'lazy';
                if (!img.decoding) img.decoding = 'async';
                
                // Set explicit dimensions if missing
                if (!img.width && !img.height) {
                    if (img.classList.contains('mainlogo') || img.closest('.mainlogo')) {
                        img.width = 270;
                        img.height = 50;
                    } else {
                        img.width = 50;
                        img.height = 50;
                    }
                }
                
                // Optimize rendering
                img.style.imageRendering = 'optimizeSpeed';
            });
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', optimizeImg);
        } else {
            optimizeImg();
        }
    };
    
    // 8. CSS OPTIMIZATION - Remove render blocking
    const optimizeCSS = () => {
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (!link.media || link.media === 'all') {
                // Make non-blocking
                link.media = 'print';
                link.onload = function() { this.media = 'all'; };
            }
        });
    };
    
    // 9. TASK SCHEDULING - Prevent blocking
    const scheduleTask = (task, priority = 'background') => {
        if ('scheduler' in window && 'postTask' in window.scheduler) {
            window.scheduler.postTask(task, { priority });
        } else {
            requestIdleCallback ? requestIdleCallback(task) : setTimeout(task, 0);
        }
    };
    
    // 10. PERFORMANCE MONITORING
    const monitorPerformance = () => {
        if ('PerformanceObserver' in window) {
            // Monitor Core Web Vitals
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    switch (entry.entryType) {
                        case 'largest-contentful-paint':
                            console.log(`LCP: ${entry.startTime}ms`);
                            break;
                        case 'layout-shift':
                            if (!entry.hadRecentInput) {
                                console.log(`CLS: ${entry.value}`);
                            }
                            break;
                        case 'paint':
                            if (entry.name === 'first-contentful-paint') {
                                console.log(`FCP: ${entry.startTime}ms`);
                            }
                            break;
                    }
                });
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift', 'paint'] });
        }
    };
    
    // EXECUTE OPTIMIZATIONS IMMEDIATELY
    injectCriticalCSS();
    deferAllScripts();
    eliminateLayoutShift();
    preloadCriticalResources();
    optimizeFonts();
    progressiveSymbolLoad();
    optimizeImages();
    
    // Schedule non-critical optimizations
    scheduleTask(optimizeCSS);
    scheduleTask(monitorPerformance);
    
    console.log(`Ultra Performance Optimizer loaded in ${performance.now() - startTime}ms`);
    
})();
