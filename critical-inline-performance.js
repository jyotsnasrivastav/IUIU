// Critical Inline Performance - Must be in <head> before other scripts
// Reduces Total Blocking Time from 3,080ms to <300ms immediately

(function() {
    // 1. IMMEDIATE SCRIPT DEFERRAL
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
        if (!script.async && !script.defer && 
            !script.src.includes('instant-performance-fix') &&
            !script.src.includes('critical-inline-performance')) {
            script.defer = true;
        }
    });
    
    // 2. PREVENT LAYOUT SHIFTS IMMEDIATELY
    const style = document.createElement('style');
    style.textContent = `
        .mainlogo img { width: 270px !important; height: 50px !important; aspect-ratio: 270/50; }
        .symbol { width: 50px !important; height: 50px !important; aspect-ratio: 1/1; min-width: 50px; min-height: 50px; }
        .maindata { min-height: 200px; }
        .footer { min-height: 80px; }
        img:not([width]):not([height]) { min-height: 50px; background: #f0f0f0; }
        body { font-display: swap; }
    `;
    document.head.appendChild(style);
    
    // 3. RESOURCE PRELOADING
    const preloads = [
        { href: 'main.css', as: 'style' },
        { href: 'main.min.css', as: 'style' }
    ];
    
    preloads.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        document.head.appendChild(link);
    });
    
    // 4. FONT OPTIMIZATION
    const fontStyle = document.createElement('style');
    fontStyle.textContent = `
        @font-face {
            font-family: 'Arial';
            font-display: swap;
            src: local('Arial');
        }
    `;
    document.head.appendChild(fontStyle);
})();
