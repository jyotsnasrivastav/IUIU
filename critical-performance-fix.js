// Critical Performance Fix - Immediate Execution
// Targets: FCP <1.8s, LCP <2.5s, CLS <0.1, Speed Index <3.4s

(function() {
    'use strict';
    
    // 1. IMMEDIATE CSS OPTIMIZATION - Fix FCP
    const criticalCSS = `
        /* Ultra-critical above-fold styles */
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:system-ui,-apple-system,sans-serif;background:#ebecef;margin:0;font-display:swap}
        header{width:100%;background:#230AC7;min-height:60px;contain:layout style paint}
        .headCont{max-width:1168px;margin:0 auto;text-align:center}
        .mainlogo{width:100%;font-size:15px;text-align:center;background:#230AC7;color:#fff;font-family:arial;padding:5px 0;min-height:50px;contain:layout style paint}
        .mainlogo img{width:270px;height:50px;aspect-ratio:270/50;contain:layout style paint}
        .symbol{text-align:center;margin:0 0 0.5rem 0.1rem;border-radius:5px;color:#424949;border:1px solid #d3d3d3;display:inline-block;width:50px;height:50px;font-size:30px;line-height:50px;cursor:pointer;contain:layout style paint;will-change:transform;transform:translateZ(0)}
        .symbol:hover{background:#ececec;transform:translateY(-5px)}
        .maindata{min-height:200px;contain:layout style paint;display:block;visibility:visible}
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
    
    // 2. PRELOAD CRITICAL RESOURCES - Fix FCP/LCP
    const preloadResources = [
        { href: 'main.css', as: 'style' },
        { href: 'main.min.css', as: 'style' },
        { href: 'img/symbolsemoji.com.webp', as: 'image' }
    ];
    
    preloadResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.as === 'style') {
            link.onload = function() { this.rel = 'stylesheet'; };
        }
        document.head.appendChild(link);
    });
    
    // 3. DEFER ALL NON-CRITICAL SCRIPTS - Fix FCP/TBT
    const deferScripts = () => {
        const scripts = document.querySelectorAll('script[src]:not([defer]):not([async])');
        scripts.forEach(script => {
            if (!script.src.includes('critical') && !script.src.includes('instant')) {
                script.defer = true;
            }
        });
    };
    
    // 4. LAYOUT SHIFT PREVENTION - Fix CLS
    const preventLayoutShift = () => {
        // Set explicit dimensions for logo
        const logoImg = document.querySelector('.mainlogo img');
        if (logoImg) {
            logoImg.style.width = '270px';
            logoImg.style.height = '50px';
            logoImg.style.aspectRatio = '270/50';
        }
        
        // Set dimensions for all symbols
        const symbols = document.querySelectorAll('.symbol');
        symbols.forEach(symbol => {
            symbol.style.width = '50px';
            symbol.style.height = '50px';
            symbol.style.minWidth = '50px';
            symbol.style.minHeight = '50px';
        });
        
        // Reserve space for dynamic content
        const maindata = document.querySelector('.maindata');
        if (maindata) {
            maindata.style.minHeight = '400px';
        }
    };
    
    // 5. FONT OPTIMIZATION - Fix FCP
    const optimizeFonts = () => {
        const fontLink = document.createElement('link');
        fontLink.rel = 'preconnect';
        fontLink.href = 'https://fonts.gstatic.com';
        fontLink.crossOrigin = 'anonymous';
        document.head.appendChild(fontLink);
        
        // Add font-display: swap to all fonts
        const fontStyle = document.createElement('style');
        fontStyle.textContent = `
            @font-face { font-display: swap; }
            * { font-display: swap !important; }
        `;
        document.head.appendChild(fontStyle);
    };
    
    // 6. PROGRESSIVE LOADING - Fix Speed Index
    const progressiveLoad = () => {
        // Load first 20 symbols immediately
        const symbols = document.querySelectorAll('.symbol');
        symbols.forEach((symbol, index) => {
            if (index < 20) {
                symbol.style.visibility = 'visible';
                symbol.style.display = 'inline-block';
            } else {
                symbol.style.contentVisibility = 'auto';
                symbol.style.containIntrinsicSize = '50px 50px';
            }
        });
    };
    
    // 7. RESOURCE HINTS - Fix overall performance
    const addResourceHints = () => {
        const hints = [
            { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
            { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
        ];
        
        hints.forEach(hint => {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
            document.head.appendChild(link);
        });
    };
    
    // 8. IMMEDIATE EXECUTION
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            deferScripts();
            preventLayoutShift();
            optimizeFonts();
            progressiveLoad();
            addResourceHints();
        });
    } else {
        deferScripts();
        preventLayoutShift();
        optimizeFonts();
        progressiveLoad();
        addResourceHints();
    }
    
    // 9. PERFORMANCE MONITORING
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
        
        // Monitor FCP
        const fcpObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    console.log('FCP:', entry.startTime);
                }
            }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
    }
    
})();
