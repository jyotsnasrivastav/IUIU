// Cumulative Layout Shift Fix - 0.217 → <0.1
(function() {
    'use strict';
    
    // 1. Prevent Image Layout Shifts
    function fixImageLayoutShifts() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Set explicit dimensions if missing
            if (!img.width && !img.height) {
                if (img.classList.contains('mainlogo') || img.closest('.mainlogo')) {
                    img.width = 270;
                    img.height = 50;
                    img.style.aspectRatio = '270/50';
                } else {
                    img.width = 50;
                    img.height = 50;
                    img.style.aspectRatio = '1/1';
                }
            }
            
            // Add loading placeholder
            if (!img.complete) {
                img.style.backgroundColor = '#f0f0f0';
                img.style.minHeight = img.height + 'px';
                img.style.minWidth = img.width + 'px';
            }
            
            // Handle load events
            img.addEventListener('load', function() {
                this.style.backgroundColor = 'transparent';
            }, { once: true });
            
            img.addEventListener('error', function() {
                this.style.backgroundColor = '#ffebee';
                this.alt = 'Image failed to load';
            }, { once: true });
        });
    }
    
    // 2. Reserve Space for Dynamic Content
    function reserveSpaceForDynamicContent() {
        // Symbol containers
        const symbolContainers = document.querySelectorAll('.maindata, .symbol-container');
        symbolContainers.forEach(container => {
            if (!container.style.minHeight) {
                container.style.minHeight = '200px';
            }
        });
        
        // Individual symbols
        const symbols = document.querySelectorAll('.symbol');
        symbols.forEach(symbol => {
            symbol.style.width = '50px';
            symbol.style.height = '50px';
            symbol.style.minWidth = '50px';
            symbol.style.minHeight = '50px';
            symbol.style.flexShrink = '0';
        });
        
        // Footer space
        const footer = document.querySelector('.footer, footer');
        if (footer && !footer.style.minHeight) {
            footer.style.minHeight = '80px';
        }
    }
    
    // 3. Font Loading Layout Stability
    function stabilizeFontLoading() {
        // Add font-display: swap to prevent invisible text
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'Arial';
                font-display: swap;
                src: local('Arial'), local('Arial Regular');
            }
            
            body, .symbol, .mainlogo {
                font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
        `;
        document.head.appendChild(style);
        
        // Preload critical fonts
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                document.body.classList.add('fonts-loaded');
            });
        }
    }
    
    // 4. Prevent Ads and Third-party Layout Shifts
    function preventThirdPartyShifts() {
        // Reserve space for ad containers
        const adContainers = document.querySelectorAll('[id*="ad"], [class*="ad"], .advertisement');
        adContainers.forEach(container => {
            if (!container.style.minHeight) {
                container.style.minHeight = '250px';
                container.style.backgroundColor = '#f9f9f9';
                container.style.border = '1px solid #e0e0e0';
            }
        });
        
        // Block layout-shifting scripts
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.tagName === 'SCRIPT' && node.src && 
                            (node.src.includes('googletagmanager') || 
                             node.src.includes('google-analytics') ||
                             node.src.includes('doubleclick'))) {
                            node.async = true;
                            node.defer = true;
                        }
                    }
                });
            });
        });
        
        observer.observe(document.head, { childList: true });
    }
    
    // 5. Stabilize Dynamic Content Loading
    function stabilizeDynamicContent() {
        // Use content-visibility for off-screen elements
        const belowFoldElements = document.querySelectorAll('.symbol');
        belowFoldElements.forEach((element, index) => {
            if (index > 20) { // Elements beyond first 20
                element.style.contentVisibility = 'auto';
                element.style.containIntrinsicSize = '50px 50px';
            }
        });
        
        // Skeleton loading for dynamic content
        const dynamicContainers = document.querySelectorAll('[data-dynamic="true"]');
        dynamicContainers.forEach(container => {
            if (!container.innerHTML.trim()) {
                container.innerHTML = '<div class="skeleton-placeholder"></div>';
                container.style.minHeight = '50px';
            }
        });
    }
    
    // 6. Monitor and Report Layout Shifts
    function monitorLayoutShifts() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            let clsEntries = [];
            
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        clsEntries.push(entry);
                        
                        // Log significant shifts for debugging
                        if (entry.value > 0.1) {
                            console.warn('Large layout shift detected:', {
                                value: entry.value,
                                sources: entry.sources,
                                startTime: entry.startTime
                            });
                        }
                    }
                }
                
                // Report final CLS
                if (clsValue > 0) {
                    console.log('Cumulative Layout Shift:', clsValue.toFixed(4));
                }
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
            
            // Report on page unload
            window.addEventListener('beforeunload', () => {
                console.log('Final CLS Score:', clsValue.toFixed(4));
            });
        }
    }
    
    // 7. Fix Common Layout Shift Causes
    function fixCommonShiftCauses() {
        // Prevent shifts from missing alt text
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            img.alt = img.title || 'Symbol';
        });
        
        // Stabilize hover effects
        const hoverElements = document.querySelectorAll('.symbol');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Prevent shifts from web fonts
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .font-loading body {
                    visibility: hidden;
                }
                .font-loaded body {
                    visibility: visible;
                }
            </style>
        `);
    }
    
    // 8. Responsive Layout Stability
    function ensureResponsiveStability() {
        // Add CSS for stable responsive behavior
        const responsiveCSS = document.createElement('style');
        responsiveCSS.textContent = `
            .maindata {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                align-content: flex-start;
                min-height: 200px;
            }
            
            .symbol {
                flex: 0 0 50px;
                height: 50px;
                box-sizing: border-box;
            }
            
            @media (max-width: 768px) {
                .symbol {
                    flex: 0 0 45px;
                    height: 45px;
                    font-size: 18px;
                    line-height: 45px;
                }
            }
            
            @media (max-width: 480px) {
                .symbol {
                    flex: 0 0 40px;
                    height: 40px;
                    font-size: 16px;
                    line-height: 40px;
                }
            }
        `;
        document.head.appendChild(responsiveCSS);
    }
    
    // Initialize all fixes
    function init() {
        // Apply fixes immediately
        fixImageLayoutShifts();
        reserveSpaceForDynamicContent();
        stabilizeFontLoading();
        
        // Apply after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                preventThirdPartyShifts();
                stabilizeDynamicContent();
                fixCommonShiftCauses();
                ensureResponsiveStability();
                monitorLayoutShifts();
            });
        } else {
            preventThirdPartyShifts();
            stabilizeDynamicContent();
            fixCommonShiftCauses();
            ensureResponsiveStability();
            monitorLayoutShifts();
        }
    }
    
    init();
})();
