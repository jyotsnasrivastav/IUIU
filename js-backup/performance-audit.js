// Performance Audit Script
// Run this in browser console to test optimizations

(function() {
    'use strict';
    
    const PerformanceAudit = {
        // Test Core Web Vitals
        measureCoreWebVitals() {
            const results = {
                fcp: null,
                lcp: null,
                cls: null,
                fid: null,
                ttfb: null
            };
            
            // First Contentful Paint
            const paintEntries = performance.getEntriesByType('paint');
            const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry) {
                results.fcp = fcpEntry.startTime;
            }
            
            // Time to First Byte
            const navigationEntry = performance.getEntriesByType('navigation')[0];
            if (navigationEntry) {
                results.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
            }
            
            // Largest Contentful Paint (requires observer)
            if ('PerformanceObserver' in window) {
                try {
                    const lcpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lastEntry = entries[entries.length - 1];
                        results.lcp = lastEntry.startTime;
                    });
                    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                } catch (e) {
                    console.warn('LCP measurement not supported');
                }
                
                // Cumulative Layout Shift
                try {
                    let clsValue = 0;
                    const clsObserver = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            if (!entry.hadRecentInput) {
                                clsValue += entry.value;
                            }
                        }
                        results.cls = clsValue;
                    });
                    clsObserver.observe({ entryTypes: ['layout-shift'] });
                } catch (e) {
                    console.warn('CLS measurement not supported');
                }
            }
            
            return results;
        },
        
        // Analyze resource loading
        analyzeResources() {
            const resources = performance.getEntriesByType('resource');
            const analysis = {
                totalResources: resources.length,
                totalSize: 0,
                slowResources: [],
                largeResources: [],
                renderBlocking: []
            };
            
            resources.forEach(resource => {
                const duration = resource.responseEnd - resource.requestStart;
                const size = resource.transferSize || 0;
                
                analysis.totalSize += size;
                
                if (duration > 1000) {
                    analysis.slowResources.push({
                        name: resource.name,
                        duration: Math.round(duration),
                        size: Math.round(size / 1024) + 'KB'
                    });
                }
                
                if (size > 100000) {
                    analysis.largeResources.push({
                        name: resource.name,
                        size: Math.round(size / 1024) + 'KB',
                        duration: Math.round(duration)
                    });
                }
                
                if (resource.renderBlockingStatus === 'blocking') {
                    analysis.renderBlocking.push(resource.name);
                }
            });
            
            return analysis;
        },
        
        // Check optimization implementation
        checkOptimizations() {
            const checks = {
                criticalCSS: !!document.querySelector('style'),
                deferredJS: !!document.querySelector('script[defer]'),
                lazyLoading: !!document.querySelector('img[loading="lazy"]') || !!document.querySelector('img[data-src]'),
                compression: this.checkCompression(),
                caching: this.checkCaching(),
                minification: this.checkMinification()
            };
            
            return checks;
        },
        
        checkCompression() {
            // Check if resources are compressed
            const resources = performance.getEntriesByType('resource');
            let compressedCount = 0;
            
            resources.forEach(resource => {
                if (resource.transferSize && resource.decodedBodySize) {
                    const compressionRatio = resource.transferSize / resource.decodedBodySize;
                    if (compressionRatio < 0.8) {
                        compressedCount++;
                    }
                }
            });
            
            return compressedCount > 0;
        },
        
        checkCaching() {
            // Check for cache headers
            const resources = performance.getEntriesByType('resource');
            return resources.some(resource => {
                return resource.name.includes('.css') || resource.name.includes('.js') || resource.name.includes('.png');
            });
        },
        
        checkMinification() {
            // Check if CSS/JS files are minified
            const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
            const scripts = Array.from(document.querySelectorAll('script[src]'));
            
            const minifiedCSS = stylesheets.some(link => link.href.includes('.min.css'));
            const minifiedJS = scripts.some(script => script.src.includes('.min.js'));
            
            return minifiedCSS || minifiedJS;
        },
        
        // Generate performance report
        generateReport() {
            const vitals = this.measureCoreWebVitals();
            const resources = this.analyzeResources();
            const optimizations = this.checkOptimizations();
            
            const report = {
                timestamp: new Date().toISOString(),
                coreWebVitals: vitals,
                resourceAnalysis: resources,
                optimizations: optimizations,
                recommendations: this.getRecommendations(vitals, resources, optimizations)
            };
            
            return report;
        },
        
        getRecommendations(vitals, resources, optimizations) {
            const recommendations = [];
            
            if (vitals.fcp && vitals.fcp > 1800) {
                recommendations.push('Consider further optimizing First Contentful Paint');
            }
            
            if (vitals.lcp && vitals.lcp > 2500) {
                recommendations.push('Optimize Largest Contentful Paint - check for large images or slow resources');
            }
            
            if (vitals.cls && vitals.cls > 0.1) {
                recommendations.push('Reduce Cumulative Layout Shift - add dimensions to images and reserve space for dynamic content');
            }
            
            if (resources.slowResources.length > 0) {
                recommendations.push(`Optimize ${resources.slowResources.length} slow-loading resources`);
            }
            
            if (resources.largeResources.length > 0) {
                recommendations.push(`Compress ${resources.largeResources.length} large resources`);
            }
            
            if (!optimizations.criticalCSS) {
                recommendations.push('Implement critical CSS inlining');
            }
            
            if (!optimizations.deferredJS) {
                recommendations.push('Defer non-critical JavaScript');
            }
            
            if (!optimizations.lazyLoading) {
                recommendations.push('Implement lazy loading for images');
            }
            
            return recommendations;
        },
        
        // Display results in console
        displayResults() {
            const report = this.generateReport();
            
            console.group('🚀 Performance Audit Results');
            
            console.group('📊 Core Web Vitals');
            console.log(`First Contentful Paint: ${report.coreWebVitals.fcp ? Math.round(report.coreWebVitals.fcp) + 'ms' : 'Measuring...'}`);
            console.log(`Largest Contentful Paint: ${report.coreWebVitals.lcp ? Math.round(report.coreWebVitals.lcp) + 'ms' : 'Measuring...'}`);
            console.log(`Cumulative Layout Shift: ${report.coreWebVitals.cls ? report.coreWebVitals.cls.toFixed(3) : 'Measuring...'}`);
            console.log(`Time to First Byte: ${report.coreWebVitals.ttfb ? Math.round(report.coreWebVitals.ttfb) + 'ms' : 'N/A'}`);
            console.groupEnd();
            
            console.group('📦 Resource Analysis');
            console.log(`Total Resources: ${report.resourceAnalysis.totalResources}`);
            console.log(`Total Size: ${Math.round(report.resourceAnalysis.totalSize / 1024)}KB`);
            console.log(`Slow Resources: ${report.resourceAnalysis.slowResources.length}`);
            console.log(`Large Resources: ${report.resourceAnalysis.largeResources.length}`);
            console.groupEnd();
            
            console.group('✅ Optimizations');
            Object.entries(report.optimizations).forEach(([key, value]) => {
                console.log(`${key}: ${value ? '✅' : '❌'}`);
            });
            console.groupEnd();
            
            if (report.recommendations.length > 0) {
                console.group('💡 Recommendations');
                report.recommendations.forEach(rec => console.log(`• ${rec}`));
                console.groupEnd();
            }
            
            console.groupEnd();
            
            return report;
        }
    };
    
    // Auto-run audit after page load
    if (document.readyState === 'complete') {
        setTimeout(() => PerformanceAudit.displayResults(), 1000);
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => PerformanceAudit.displayResults(), 1000);
        });
    }
    
    // Make available globally for manual testing
    window.PerformanceAudit = PerformanceAudit;
    
    console.log('🔧 Performance Audit loaded. Run PerformanceAudit.displayResults() to see current metrics.');
})();
