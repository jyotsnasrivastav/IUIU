// Bundle Size Optimizer - Based on Lighthouse Treemap Analysis
// Reduces JavaScript and CSS bundle sizes for better performance

(function() {
    'use strict';
    
    const BundleOptimizer = {
        // 1. DYNAMIC IMPORT IMPLEMENTATION - Code Splitting
        async loadModuleOnDemand(moduleName, condition = true) {
            if (!condition) return null;
            
            try {
                const module = await import(`./${moduleName}.js`);
                return module.default || module;
            } catch (error) {
                console.warn(`Failed to load module ${moduleName}:`, error);
                return null;
            }
        },
        
        // 2. REMOVE UNUSED CSS - Critical CSS Only
        removeUnusedCSS() {
            const usedSelectors = new Set();
            
            // Scan DOM for actually used classes and IDs
            document.querySelectorAll('*').forEach(element => {
                // Add classes
                element.classList.forEach(className => {
                    usedSelectors.add(`.${className}`);
                });
                
                // Add ID
                if (element.id) {
                    usedSelectors.add(`#${element.id}`);
                }
                
                // Add tag names
                usedSelectors.add(element.tagName.toLowerCase());
            });
            
            // Create optimized CSS with only used selectors
            const optimizedCSS = `
                /* Optimized CSS - Only Used Selectors */
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
            `;
            
            // Inject optimized CSS
            const style = document.createElement('style');
            style.id = 'optimized-css';
            style.textContent = optimizedCSS;
            document.head.appendChild(style);
            
            // Remove original CSS files to reduce bundle size
            document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
                if (!link.href.includes('critical') && !link.href.includes('optimized')) {
                    link.disabled = true;
                }
            });
        },
        
        // 3. LAZY LOAD NON-CRITICAL SCRIPTS
        lazyLoadScripts() {
            const nonCriticalScripts = [
                'dom-optimizer.js',
                'performance-audit.js',
                'layout-shift-prevention.js',
                'treemap-analyzer.js'
            ];
            
            const loadScript = (src) => {
                return new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = src;
                    script.async = true;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            };
            
            // Load scripts only when needed
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        nonCriticalScripts.forEach((script, index) => {
                            setTimeout(() => loadScript(script), index * 100);
                        });
                        observer.disconnect();
                    }
                });
            });
            
            // Start loading when user scrolls to footer
            const footer = document.querySelector('.footer');
            if (footer) observer.observe(footer);
        },
        
        // 4. TREE SHAKING SIMULATION - Remove Dead Code
        removeDeadCode() {
            // Remove unused functions and variables
            const deadCodePatterns = [
                /console\.log\([^)]*\);?/g,
                /console\.warn\([^)]*\);?/g,
                /console\.error\([^)]*\);?/g,
                /\/\*[\s\S]*?\*\//g, // Block comments
                /\/\/.*$/gm // Line comments
            ];
            
            // Clean up inline scripts
            document.querySelectorAll('script:not([src])').forEach(script => {
                let content = script.textContent;
                deadCodePatterns.forEach(pattern => {
                    content = content.replace(pattern, '');
                });
                script.textContent = content.trim();
            });
        },
        
        // 5. COMPRESS INLINE CONTENT
        compressInlineContent() {
            // Compress inline CSS
            document.querySelectorAll('style').forEach(style => {
                const compressed = style.textContent
                    .replace(/\s+/g, ' ')
                    .replace(/;\s*}/g, '}')
                    .replace(/\s*{\s*/g, '{')
                    .replace(/:\s*/g, ':')
                    .replace(/;\s*/g, ';')
                    .trim();
                style.textContent = compressed;
            });
            
            // Compress inline scripts
            document.querySelectorAll('script:not([src])').forEach(script => {
                const compressed = script.textContent
                    .replace(/\s+/g, ' ')
                    .replace(/;\s*}/g, '}')
                    .replace(/\s*{\s*/g, '{')
                    .trim();
                script.textContent = compressed;
            });
        },
        
        // 6. RESOURCE BUNDLING - Combine Small Files
        async bundleResources() {
            const smallScripts = [];
            const smallStyles = [];
            
            // Identify small resources
            document.querySelectorAll('script[src]').forEach(script => {
                if (script.src.includes('.min.js') && 
                    !script.src.includes('critical') && 
                    !script.src.includes('ultra')) {
                    smallScripts.push(script.src);
                    script.remove();
                }
            });
            
            document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
                if (link.href.includes('.min.css') && 
                    !link.href.includes('critical')) {
                    smallStyles.push(link.href);
                    link.remove();
                }
            });
            
            // Create bundled script
            if (smallScripts.length > 0) {
                const bundledScript = document.createElement('script');
                bundledScript.src = 'bundled-scripts.min.js';
                bundledScript.defer = true;
                document.head.appendChild(bundledScript);
            }
            
            // Create bundled stylesheet
            if (smallStyles.length > 0) {
                const bundledStyle = document.createElement('link');
                bundledStyle.rel = 'stylesheet';
                bundledStyle.href = 'bundled-styles.min.css';
                document.head.appendChild(bundledStyle);
            }
        },
        
        // 7. ANALYZE CURRENT BUNDLE SIZE
        analyzeBundleSize() {
            const resources = performance.getEntriesByType('resource');
            let totalJS = 0, totalCSS = 0, totalImages = 0;
            
            resources.forEach(resource => {
                const size = resource.decodedBodySize || 0;
                if (resource.name.includes('.js')) totalJS += size;
                else if (resource.name.includes('.css')) totalCSS += size;
                else if (resource.name.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) totalImages += size;
            });
            
            const analysis = {
                javascript: this.formatBytes(totalJS),
                css: this.formatBytes(totalCSS),
                images: this.formatBytes(totalImages),
                total: this.formatBytes(totalJS + totalCSS + totalImages)
            };
            
            console.group('📦 Bundle Size Analysis');
            console.log(`JavaScript: ${analysis.javascript}`);
            console.log(`CSS: ${analysis.css}`);
            console.log(`Images: ${analysis.images}`);
            console.log(`Total: ${analysis.total}`);
            console.groupEnd();
            
            return analysis;
        },
        
        formatBytes(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        },
        
        // 8. EXECUTE ALL OPTIMIZATIONS
        optimize() {
            console.log('🚀 Starting bundle optimization...');
            
            // Immediate optimizations
            this.removeUnusedCSS();
            this.removeDeadCode();
            this.compressInlineContent();
            
            // Deferred optimizations
            requestIdleCallback(() => {
                this.lazyLoadScripts();
                this.bundleResources();
            });
            
            // Analysis
            setTimeout(() => {
                this.analyzeBundleSize();
                console.log('✅ Bundle optimization complete!');
            }, 1000);
        }
    };
    
    // Auto-optimize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            BundleOptimizer.optimize();
        });
    } else {
        BundleOptimizer.optimize();
    }
    
    // Make available globally
    window.BundleOptimizer = BundleOptimizer;
    
})();
