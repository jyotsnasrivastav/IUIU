// Comprehensive Layout Shift Prevention System
(function() {
    'use strict';
    
    // Prevent layout shifts during page load
    class LayoutShiftPrevention {
        constructor() {
            this.observer = null;
            this.styleCache = new Map();
            this.dimensionCache = new Map();
            this.init();
        }
        
        init() {
            // Apply immediate fixes before DOM is ready
            this.applyImmediateFixes();
            
            // Setup observers and handlers
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setupAfterDOM());
            } else {
                this.setupAfterDOM();
            }
        }
        
        applyImmediateFixes() {
            // Inject critical layout stability CSS immediately
            const criticalCSS = `
                <style id="layout-stability-critical">
                /* Prevent layout shifts during load */
                * { 
                    box-sizing: border-box !important; 
                }
                
                /* Reserve space for images */
                img:not([width]):not([height]) {
                    min-height: 50px;
                    background: #f0f0f0;
                }
                
                /* Prevent text reflow during font loading */
                body {
                    font-display: swap;
                    text-rendering: optimizeSpeed;
                }
                
                /* Stabilize symbol containers */
                .symbol {
                    min-width: 50px !important;
                    min-height: 50px !important;
                    display: inline-block !important;
                    vertical-align: top !important;
                    contain: layout style paint !important;
                }
                
                /* Prevent header shifts */
                header {
                    min-height: 60px;
                    contain: layout style paint;
                }
                
                .mainlogo {
                    min-height: 50px;
                    contain: layout style paint;
                }
                
                /* Stabilize main content area */
                .maindata {
                    min-height: 200px;
                    contain: layout style paint;
                }
                
                /* Prevent footer shifts */
                .footer {
                    min-height: 80px;
                    contain: layout style paint;
                }
                
                /* CSS loading transition prevention */
                .css-loading * {
                    transition: none !important;
                    animation: none !important;
                }
                
                /* Async content placeholder */
                .async-content {
                    min-height: 100px;
                    background: transparent;
                }
                </style>
            `;
            
            document.head.insertAdjacentHTML('afterbegin', criticalCSS);
            document.documentElement.classList.add('css-loading');
        }
        
        setupAfterDOM() {
            // Remove loading class after CSS loads
            this.waitForCSS().then(() => {
                document.documentElement.classList.remove('css-loading');
            });
            
            // Setup image dimension preservation
            this.preserveImageDimensions();
            
            // Setup font loading optimization
            this.optimizeFontLoading();
            
            // Setup dynamic content stabilization
            this.stabilizeDynamicContent();
            
            // Setup resize handling
            this.setupResizeHandling();
        }
        
        async waitForCSS() {
            const cssLinks = document.querySelectorAll('link[rel="stylesheet"], link[rel="preload"][as="style"]');
            const promises = Array.from(cssLinks).map(link => {
                return new Promise(resolve => {
                    if (link.sheet) {
                        resolve();
                    } else {
                        link.addEventListener('load', resolve);
                        link.addEventListener('error', resolve);
                        // Fallback timeout
                        setTimeout(resolve, 3000);
                    }
                });
            });
            
            await Promise.all(promises);
            
            // Additional delay to ensure all CSS is processed
            return new Promise(resolve => setTimeout(resolve, 100));
        }
        
        preserveImageDimensions() {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (!img.width || !img.height) {
                    // Set default dimensions to prevent shifts
                    if (img.src.includes('logo') || img.classList.contains('logo')) {
                        img.style.width = '270px';
                        img.style.height = '50px';
                    } else {
                        img.style.minWidth = '50px';
                        img.style.minHeight = '50px';
                    }
                }
                
                // Prevent shifts during image loading
                img.style.contain = 'layout style paint';
            });
        }
        
        optimizeFontLoading() {
            // Preload critical fonts
            const fontPreloads = [
                { family: 'Arial', weight: 'normal' },
                { family: 'Segoe UI', weight: 'normal' }
            ];
            
            fontPreloads.forEach(font => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'font';
                link.type = 'font/woff2';
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            });
            
            // Use font-display: swap for all fonts
            const style = document.createElement('style');
            style.textContent = `
                @font-face {
                    font-display: swap;
                }
                * {
                    font-display: swap !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        stabilizeDynamicContent() {
            // Observe all symbol containers for changes
            const symbolContainers = document.querySelectorAll('.maindata, .symbol, .container');
            
            symbolContainers.forEach(container => {
                // Set minimum dimensions
                if (!container.style.minHeight) {
                    container.style.minHeight = container.offsetHeight + 'px';
                }
                
                // Apply containment
                container.style.contain = 'layout style paint';
            });
            
            // Setup mutation observer for dynamic content
            this.observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === 1) { // Element node
                                this.stabilizeElement(node);
                            }
                        });
                    }
                });
            });
            
            this.observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
        
        stabilizeElement(element) {
            // Apply stability rules to new elements
            if (element.classList.contains('symbol')) {
                element.style.minWidth = '50px';
                element.style.minHeight = '50px';
                element.style.contain = 'layout style paint';
            }
            
            if (element.tagName === 'IMG') {
                element.style.contain = 'layout style paint';
            }
        }
        
        setupResizeHandling() {
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    // Recalculate and cache dimensions after resize
                    this.dimensionCache.clear();
                    this.updateDimensions();
                }, 150);
            }, { passive: true });
        }
        
        updateDimensions() {
            const elements = document.querySelectorAll('.symbol, .maindata, header, .footer');
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                this.dimensionCache.set(el, {
                    width: rect.width,
                    height: rect.height
                });
            });
        }
        
        // Cleanup method
        destroy() {
            if (this.observer) {
                this.observer.disconnect();
            }
        }
    }
    
    // Initialize immediately
    new LayoutShiftPrevention();
    
    // Additional performance optimizations
    
    // Optimize scroll performance
    let ticking = false;
    function updateScrollPosition() {
        // Batch scroll-related updates
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }, { passive: true });
    
    // Optimize click handlers to prevent layout shifts
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('symbol')) {
            // Prevent any layout changes during copy operation
            e.target.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        }
    });
    
    // Prevent layout shifts during CSS transitions
    const style = document.createElement('style');
    style.textContent = `
        .symbol:hover {
            transform: translateY(-5px) !important;
            margin-top: 0 !important;
            will-change: transform;
        }
        
        .symbol {
            will-change: transform;
            backface-visibility: hidden;
            transform: translateZ(0);
        }
    `;
    document.head.appendChild(style);
    
})();
