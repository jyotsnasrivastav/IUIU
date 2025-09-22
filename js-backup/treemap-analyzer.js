// Treemap Bundle Analyzer for Lighthouse
// This script helps generate data for https://googlechrome.github.io/lighthouse/treemap/

(function() {
    'use strict';
    
    const TreemapAnalyzer = {
        // Collect resource data for treemap analysis
        collectResourceData() {
            const resources = performance.getEntriesByType('resource');
            const bundleData = {
                timestamp: new Date().toISOString(),
                url: window.location.href,
                resources: [],
                summary: {
                    totalSize: 0,
                    totalTransferSize: 0,
                    resourceCount: 0,
                    categories: {}
                }
            };
            
            resources.forEach(resource => {
                const resourceInfo = {
                    name: resource.name,
                    type: this.getResourceType(resource.name),
                    size: resource.decodedBodySize || 0,
                    transferSize: resource.transferSize || 0,
                    duration: Math.round(resource.responseEnd - resource.requestStart),
                    cached: resource.transferSize === 0,
                    compressed: resource.transferSize < resource.decodedBodySize
                };
                
                bundleData.resources.push(resourceInfo);
                bundleData.summary.totalSize += resourceInfo.size;
                bundleData.summary.totalTransferSize += resourceInfo.transferSize;
                bundleData.summary.resourceCount++;
                
                // Categorize resources
                const category = resourceInfo.type;
                if (!bundleData.summary.categories[category]) {
                    bundleData.summary.categories[category] = {
                        count: 0,
                        size: 0,
                        transferSize: 0
                    };
                }
                bundleData.summary.categories[category].count++;
                bundleData.summary.categories[category].size += resourceInfo.size;
                bundleData.summary.categories[category].transferSize += resourceInfo.transferSize;
            });
            
            return bundleData;
        },
        
        getResourceType(url) {
            if (url.includes('.css')) return 'CSS';
            if (url.includes('.js')) return 'JavaScript';
            if (url.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i)) return 'Images';
            if (url.match(/\.(woff|woff2|ttf|eot)$/i)) return 'Fonts';
            if (url.includes('.html')) return 'HTML';
            return 'Other';
        },
        
        // Generate Lighthouse-compatible treemap data
        generateTreemapData() {
            const data = this.collectResourceData();
            
            // Format for Lighthouse treemap
            const treemapData = {
                lhr: {
                    audits: {
                        'script-treemap-data': {
                            details: {
                                nodes: data.resources.map((resource, index) => ({
                                    name: resource.name.split('/').pop() || resource.name,
                                    resourceBytes: resource.size,
                                    unusedBytes: Math.max(0, resource.size - resource.transferSize),
                                    duplicate: false
                                }))
                            }
                        }
                    }
                },
                artifacts: {
                    URL: {
                        finalUrl: window.location.href
                    }
                }
            };
            
            return treemapData;
        },
        
        // Display bundle analysis
        displayAnalysis() {
            const data = this.collectResourceData();
            
            console.group('📦 Bundle Size Analysis');
            
            console.group('📊 Summary');
            console.log(`Total Resources: ${data.summary.resourceCount}`);
            console.log(`Total Size: ${this.formatBytes(data.summary.totalSize)}`);
            console.log(`Transfer Size: ${this.formatBytes(data.summary.totalTransferSize)}`);
            console.log(`Compression Ratio: ${((1 - data.summary.totalTransferSize / data.summary.totalSize) * 100).toFixed(1)}%`);
            console.groupEnd();
            
            console.group('📂 By Category');
            Object.entries(data.summary.categories).forEach(([category, stats]) => {
                console.log(`${category}: ${stats.count} files, ${this.formatBytes(stats.size)} (${this.formatBytes(stats.transferSize)} transferred)`);
            });
            console.groupEnd();
            
            console.group('🔍 Largest Resources');
            const largestResources = data.resources
                .sort((a, b) => b.size - a.size)
                .slice(0, 10);
            
            largestResources.forEach(resource => {
                console.log(`${resource.name.split('/').pop()}: ${this.formatBytes(resource.size)} (${resource.type})`);
            });
            console.groupEnd();
            
            console.group('🐌 Slowest Resources');
            const slowestResources = data.resources
                .sort((a, b) => b.duration - a.duration)
                .slice(0, 10);
            
            slowestResources.forEach(resource => {
                console.log(`${resource.name.split('/').pop()}: ${resource.duration}ms (${this.formatBytes(resource.size)})`);
            });
            console.groupEnd();
            
            console.groupEnd();
            
            return data;
        },
        
        formatBytes(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        },
        
        // Generate instructions for Lighthouse treemap
        generateTreemapInstructions() {
            const instructions = `
🌳 Lighthouse Treemap Analysis Instructions:

1. Run Lighthouse audit on this page:
   - Open Chrome DevTools (F12)
   - Go to Lighthouse tab
   - Check "Performance" and run audit
   
2. After audit completes:
   - Look for "View Treemap" button in the results
   - Or manually go to: https://googlechrome.github.io/lighthouse/treemap/?gzip=1
   
3. Upload your Lighthouse JSON report to the treemap tool

4. Alternative method:
   - Copy the data below and save as lighthouse-report.json
   - Upload to treemap tool

Current bundle analysis:`;
            
            console.log(instructions);
            
            const treemapData = this.generateTreemapData();
            console.log('Treemap Data (save as lighthouse-report.json):');
            console.log(JSON.stringify(treemapData, null, 2));
            
            return treemapData;
        },
        
        // Quick optimization suggestions based on bundle analysis
        getOptimizationSuggestions() {
            const data = this.collectResourceData();
            const suggestions = [];
            
            // Check for large resources
            const largeResources = data.resources.filter(r => r.size > 100000); // >100KB
            if (largeResources.length > 0) {
                suggestions.push(`📦 ${largeResources.length} large resources (>100KB) found - consider code splitting or compression`);
            }
            
            // Check for uncompressed resources
            const uncompressed = data.resources.filter(r => !r.compressed && r.size > 10000);
            if (uncompressed.length > 0) {
                suggestions.push(`🗜️ ${uncompressed.length} uncompressed resources found - enable gzip/brotli compression`);
            }
            
            // Check for duplicate resources
            const resourceNames = data.resources.map(r => r.name.split('/').pop());
            const duplicates = resourceNames.filter((name, index) => resourceNames.indexOf(name) !== index);
            if (duplicates.length > 0) {
                suggestions.push(`🔄 ${duplicates.length} potential duplicate resources found`);
            }
            
            // Check JavaScript bundle size
            const jsSize = data.summary.categories.JavaScript?.size || 0;
            if (jsSize > 500000) { // >500KB
                suggestions.push(`📜 JavaScript bundle is ${this.formatBytes(jsSize)} - consider code splitting`);
            }
            
            // Check CSS bundle size
            const cssSize = data.summary.categories.CSS?.size || 0;
            if (cssSize > 200000) { // >200KB
                suggestions.push(`🎨 CSS bundle is ${this.formatBytes(cssSize)} - consider critical CSS extraction`);
            }
            
            return suggestions;
        }
    };
    
    // Auto-run analysis when page loads
    if (document.readyState === 'complete') {
        setTimeout(() => {
            TreemapAnalyzer.displayAnalysis();
            const suggestions = TreemapAnalyzer.getOptimizationSuggestions();
            if (suggestions.length > 0) {
                console.group('💡 Optimization Suggestions');
                suggestions.forEach(suggestion => console.log(suggestion));
                console.groupEnd();
            }
        }, 2000);
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => {
                TreemapAnalyzer.displayAnalysis();
                const suggestions = TreemapAnalyzer.getOptimizationSuggestions();
                if (suggestions.length > 0) {
                    console.group('💡 Optimization Suggestions');
                    suggestions.forEach(suggestion => console.log(suggestion));
                    console.groupEnd();
                }
            }, 2000);
        });
    }
    
    // Make available globally
    window.TreemapAnalyzer = TreemapAnalyzer;
    
    console.log('🌳 Treemap Analyzer loaded. Use TreemapAnalyzer.generateTreemapInstructions() for Lighthouse treemap setup.');
})();
