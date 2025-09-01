// Enhanced Cumulative Layout Shift Fix - Target: 0.266 → <0.05
(function() {
    'use strict';
    
    // Critical CSS injection for immediate layout stability
    function injectCriticalCSS() {
        const criticalCSS = `
            <style id="cls-critical-css">
                /* Prevent all layout shifts with strict containment */
                * {
                    box-sizing: border-box !important;
                }
                
                body {
                    font-family: Arial, -apple-system, BlinkMacSystemFont, sans-serif !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    font-display: swap !important;
                    contain: layout style paint !important;
                }
                
                /* Header stability */
                .modern-header {
                    min-height: 60px !important;
                    height: 60px !important;
                    contain: layout style paint !important;
                    position: relative !important;
                    z-index: 1000 !important;
                }
                
                .main-nav {
                    height: 60px !important;
                    min-height: 60px !important;
                    contain: layout style paint !important;
                }
                
                /* Language dropdown stability */
                .language-dropdown {
                    position: absolute !important;
                    top: 100% !important;
                    right: 0 !important;
                    min-width: 200px !important;
                    max-height: 400px !important;
                    overflow-y: auto !important;
                    contain: layout style paint !important;
                    transform: translateZ(0) !important;
                }
                
                /* Symbol container stability */
                .maindata {
                    min-height: 400px !important;
                    contain: layout style paint !important;
                    display: flex !important;
                    flex-wrap: wrap !important;
                    gap: 0.5rem !important;
                    align-content: flex-start !important;
                    padding: 1rem !important;
                }
                
                /* Fixed symbol dimensions */
                .symbol {
                    width: 60px !important;
                    height: 60px !important;
                    min-width: 60px !important;
                    min-height: 60px !important;
                    flex: 0 0 60px !important;
                    font-size: 24px !important;
                    line-height: 60px !important;
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    contain: layout style paint !important;
                    transform: translateZ(0) !important;
                    will-change: transform !important;
                    backface-visibility: hidden !important;
                    transition: transform 0.2s ease !important;
                }
                
                .symbol:hover {
                    transform: translateY(-3px) translateZ(0) !important;
                }
                
                /* Image stability */
                img {
                    max-width: 100% !important;
                    height: auto !important;
                    contain: layout style paint !important;
                    transform: translateZ(0) !important;
                }
                
                .mainlogo img {
                    width: 270px !important;
                    height: 50px !important;
                    min-width: 270px !important;
                    min-height: 50px !important;
                    aspect-ratio: 270/50 !important;
                    object-fit: contain !important;
                }
                
                /* Footer stability */
                .footer, footer {
                    min-height: 100px !important;
                    contain: layout style paint !important;
                }
                
                /* Container stability */
                .container {
                    max-width: 1200px !important;
                    margin: 0 auto !important;
                    contain: layout style paint !important;
                }
                
                /* Tools section stability */
                .tools {
                    min-height: 50px !important;
                    contain: layout style paint !important;
                    display: flex !important;
                    gap: 1rem !important;
                    justify-content: center !important;
                    align-items: center !important;
                }
                
                /* Title stability */
                .titlesymbol, h1 {
                    min-height: 40px !important;
                    contain: layout style paint !important;
                    margin: 1rem 0 !important;
                }
                
                /* Responsive stability */
                @media (max-width: 768px) {
                    .symbol {
                        width: 50px !important;
                        height: 50px !important;
                        min-width: 50px !important;
                        min-height: 50px !important;
                        flex: 0 0 50px !important;
                        font-size: 20px !important;
                        line-height: 50px !important;
                    }
                    
                    .mainlogo img {
                        width: 200px !important;
                        height: 40px !important;
                        min-width: 200px !important;
                        min-height: 40px !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .symbol {
                        width: 45px !important;
                        height: 45px !important;
                        min-width: 45px !important;
                        min-height: 45px !important;
                        flex: 0 0 45px !important;
                        font-size: 18px !important;
                        line-height: 45px !important;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('afterbegin', criticalCSS);
    }
    
    // Fix image loading shifts immediately
    function fixImageShifts() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Set explicit dimensions before loading
            if (img.classList.contains('mainlogo') || img.closest('.mainlogo')) {
                img.setAttribute('width', '270');
                img.setAttribute('height', '50');
                img.style.aspectRatio = '270/50';
            }
            
            // Add loading placeholder
            if (!img.complete && !img.style.backgroundColor) {
                img.style.backgroundColor = '#f0f0f0';
                img.style.backgroundImage = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
                img.style.backgroundSize = '200% 100%';
                img.style.animation = 'shimmer 1.5s infinite';
            }
            
            // Remove placeholder on load
            img.addEventListener('load', function() {
                this.style.backgroundColor = 'transparent';
                this.style.backgroundImage = 'none';
                this.style.animation = 'none';
            }, { once: true });
        });
    }
    
    // Fix symbol layout shifts
    function fixSymbolShifts() {
        const symbols = document.querySelectorAll('.symbol');
        
        symbols.forEach((symbol, index) => {
            // Set explicit dimensions
            symbol.style.width = '60px';
            symbol.style.height = '60px';
            symbol.style.minWidth = '60px';
            symbol.style.minHeight = '60px';
            symbol.style.flexShrink = '0';
            symbol.style.contain = 'layout style paint';
            
            // Use transform for hover instead of margin/padding changes
            symbol.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) translateZ(0)';
            });
            
            symbol.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) translateZ(0)';
            });
            
            // Add content-visibility for below-fold symbols
            if (index > 15) {
                symbol.style.contentVisibility = 'auto';
                symbol.style.containIntrinsicSize = '60px 60px';
            }
        });
    }
    
    // Fix header and navigation shifts
    function fixHeaderShifts() {
        const header = document.querySelector('.modern-header');
        const nav = document.querySelector('.main-nav');
        const dropdown = document.querySelector('.language-dropdown');
        
        if (header) {
            header.style.height = '60px';
            header.style.minHeight = '60px';
            header.style.contain = 'layout style paint';
        }
        
        if (nav) {
            nav.style.height = '60px';
            nav.style.minHeight = '60px';
            nav.style.contain = 'layout style paint';
        }
        
        if (dropdown) {
            dropdown.style.position = 'absolute';
            dropdown.style.top = '100%';
            dropdown.style.right = '0';
            dropdown.style.minWidth = '200px';
            dropdown.style.maxHeight = '400px';
            dropdown.style.contain = 'layout style paint';
            dropdown.style.transform = 'translateZ(0)';
        }
    }
    
    // Fix font loading shifts
    function fixFontShifts() {
        // Add font-display: swap to all fonts
        const fontCSS = document.createElement('style');
        fontCSS.textContent = `
            @font-face {
                font-family: 'Arial';
                font-display: swap;
                src: local('Arial'), local('Arial Regular');
            }
            
            body, .symbol, .mainlogo, h1, h2, h3 {
                font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
                font-display: swap !important;
            }
            
            /* Prevent font swap layout shifts */
            .symbol {
                font-variation-settings: normal !important;
                text-rendering: optimizeSpeed !important;
            }
        `;
        document.head.appendChild(fontCSS);
    }
    
    // Monitor layout shifts for debugging
    function monitorCLS() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        
                        // Log shifts > 0.05 for debugging
                        if (entry.value > 0.05) {
                            console.warn('Layout shift detected:', {
                                value: entry.value.toFixed(4),
                                sources: entry.sources?.map(s => s.node?.tagName || s.node?.className),
                                startTime: entry.startTime.toFixed(2)
                            });
                        }
                    }
                }
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
            
            // Report final CLS on page unload
            window.addEventListener('beforeunload', () => {
                console.log('Final CLS Score:', clsValue.toFixed(4));
                if (clsValue > 0.1) {
                    console.warn('CLS still above 0.1 threshold');
                } else {
                    console.log('✅ CLS within acceptable range');
                }
            });
        }
    }
    
    // Apply all fixes immediately
    function applyImmediateFixes() {
        injectCriticalCSS();
        fixImageShifts();
        fixHeaderShifts();
        fixFontShifts();
        
        // Apply symbol fixes after a minimal delay to ensure DOM is ready
        requestAnimationFrame(() => {
            fixSymbolShifts();
            monitorCLS();
        });
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyImmediateFixes);
    } else {
        applyImmediateFixes();
    }
    
    // Also apply on window load for any late-loading content
    window.addEventListener('load', () => {
        fixSymbolShifts();
        console.log('Enhanced CLS fixes applied');
    });
})();
