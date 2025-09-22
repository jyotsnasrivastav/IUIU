// Image Optimization and Lazy Loading
// Fixes LCP and improves Speed Index

(function() {
    'use strict';
    
    // 1. IMMEDIATE IMAGE OPTIMIZATION
    const optimizeImages = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Set explicit dimensions to prevent CLS
            if (img.closest('.mainlogo')) {
                img.width = 270;
                img.height = 50;
                img.style.cssText = 'width:270px;height:50px;aspect-ratio:270/50;display:block;margin:0 auto';
            } else if (!img.width || !img.height) {
                img.width = 50;
                img.height = 50;
                img.style.cssText = 'width:50px;height:50px;aspect-ratio:1/1';
            }
            
            // Optimize loading attributes
            img.loading = img.closest('.mainlogo') ? 'eager' : 'lazy';
            img.decoding = 'async';
            
            // Optimize rendering
            img.style.imageRendering = 'optimizeSpeed';
            
            // Add error handling
            img.onerror = function() {
                this.style.display = 'none';
            };
        });
    };
    
    // 2. WEBP CONVERSION AND OPTIMIZATION
    const convertToWebP = () => {
        const images = document.querySelectorAll('img[src$=".png"], img[src$=".jpg"], img[src$=".jpeg"]');
        
        images.forEach(img => {
            const webpSrc = img.src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
            
            // Test if WebP is supported
            const webpTest = new Image();
            webpTest.onload = function() {
                if (this.width > 0 && this.height > 0) {
                    img.src = webpSrc;
                }
            };
            webpTest.src = webpSrc;
        });
    };
    
    // 3. PROGRESSIVE IMAGE LOADING
    const progressiveImageLoad = () => {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Load high-quality version
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        
                        // Add fade-in effect
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.3s';
                        
                        img.onload = function() {
                            this.style.opacity = '1';
                        };
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    };
    
    // 4. IMAGE PRELOADING FOR CRITICAL IMAGES
    const preloadCriticalImages = () => {
        const criticalImages = [
            'img/symbolsemoji.com.webp',
            'img/favicon-96x96.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            link.importance = 'high';
            document.head.appendChild(link);
        });
    };
    
    // 5. RESPONSIVE IMAGE OPTIMIZATION
    const addResponsiveImages = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (!img.srcset && !img.closest('.mainlogo')) {
                // Add responsive srcset for better performance
                const baseSrc = img.src.replace(/\.(png|jpg|jpeg|webp)$/i, '');
                const ext = img.src.match(/\.(png|jpg|jpeg|webp)$/i)?.[0] || '.webp';
                
                img.srcset = `
                    ${baseSrc}-small${ext} 480w,
                    ${baseSrc}-medium${ext} 768w,
                    ${baseSrc}${ext} 1200w
                `.trim();
                
                img.sizes = '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw';
            }
        });
    };
    
    // Execute optimizations
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            optimizeImages();
            preloadCriticalImages();
            convertToWebP();
            progressiveImageLoad();
            addResponsiveImages();
        });
    } else {
        optimizeImages();
        preloadCriticalImages();
        convertToWebP();
        progressiveImageLoad();
        addResponsiveImages();
    }
    
})();
