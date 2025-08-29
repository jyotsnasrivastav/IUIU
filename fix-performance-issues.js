const fs = require('fs');

// Fix Total Blocking Time (380ms) and Cumulative Layout Shift (0.226)
function fixPerformanceIssues() {
    const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
    
    const performanceFixes = [
        // Remove blocking animations that cause layout shifts
        {
            from: /animation: shimmer 1\.5s infinite;/g,
            to: ''
        },
        
        // Remove shimmer keyframes that cause repaints
        {
            from: /@keyframes shimmer \{\s*0% \{ background-position: 200% 0; \}\s*100% \{ background-position: -200% 0; \}\s*\}/g,
            to: ''
        },
        
        // Add layout stability CSS
        {
            from: /\.mainlogo img \{[\s\S]*?\}/g,
            to: `.mainlogo img {
            width: 270px;
            height: 54px;
            padding-top: 2px;
            min-height: 54px;
            contain: layout style paint size;
            image-rendering: optimizeQuality;
            background: #230AC7;
            transform: translateZ(0);
            will-change: auto;
        }`
        },
        
        // Optimize symbol hover effects to prevent layout shifts
        {
            from: /\.symbol:hover\{background-color:#ececec;transform:translateY\(-5px\);box-shadow:4px 4px 4px 1px rgba\(157,154,154,0\.2\)\}/g,
            to: `.symbol:hover{background-color:#ececec;transform:translateZ(0) translateY(-5px);box-shadow:0 4px 8px rgba(157,154,154,0.2);will-change:transform}`
        },
        
        // Add critical layout stability
        {
            from: /\*\{box-sizing:border-box;padding:0;margin:0\}/g,
            to: `*{box-sizing:border-box;padding:0;margin:0}
        html{scroll-behavior:smooth}
        body{transform:translateZ(0);backface-visibility:hidden}
        .maindata,.symbol{contain:layout style paint}`
        },
        
        // Remove problematic background gradients that cause repaints
        {
            from: /\.mainlogo img:not\(\[src\*="data:"\]\) \{[\s\S]*?\}/g,
            to: ''
        }
    ];
    
    let totalFixed = 0;
    
    htmlFiles.forEach(file => {
        try {
            let content = fs.readFileSync(file, 'utf8');
            let fileFixed = false;
            
            performanceFixes.forEach(fix => {
                if (fix.from.test(content)) {
                    content = content.replace(fix.from, fix.to);
                    fileFixed = true;
                }
            });
            
            if (fileFixed) {
                fs.writeFileSync(file, content);
                console.log(`Fixed performance issues in: ${file}`);
                totalFixed++;
            }
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    });
    
    console.log(`\nPerformance fixes complete! Fixed ${totalFixed} files.`);
    console.log('Expected improvements:');
    console.log('- Total Blocking Time: 380ms → ~50-100ms');
    console.log('- Cumulative Layout Shift: 0.226 → <0.1');
}

// Create optimized critical CSS for immediate loading
function createOptimizedCriticalCSS() {
    const optimizedCSS = `/* Optimized Critical CSS - No Layout Shifts */
*{box-sizing:border-box;padding:0;margin:0}
html{scroll-behavior:smooth}
body{font-family:arial,serif;background-color:#ebecef;margin:0;font-display:swap;transform:translateZ(0);backface-visibility:hidden}
header{width:100%;background-color:#230AC7;min-height:60px;contain:layout style paint}
.headCont{max-width:1168px;margin:0 auto;text-align:center}
.mainlogo{width:100%;font-size:15px;text-align:center;background-color:#230AC7;color:#fff;font-family:arial;padding:5px 0;min-height:50px;contain:layout style paint}
.mainlogo img{width:270px;height:54px;padding-top:2px;min-height:54px;contain:layout style paint size;image-rendering:optimizeQuality;background:#230AC7;transform:translateZ(0)}
.mainlogo a{color:white;font-size:2rem;text-decoration:none}
#target{position:fixed;bottom:0;width:100%;background:#fff;z-index:9;box-shadow:0 0 5px rgba(0,0,0,0.15);padding:5px}
.symbol{text-align:center;margin:0 0 0.5rem 0.1rem;border-radius:5px;color:#424949;border:1px solid #d3d3d3;display:inline-block;min-width:50px;min-height:50px;font-size:20px;line-height:50px;transition:transform .2s ease;cursor:pointer;contain:layout style paint;will-change:transform;backface-visibility:hidden;transform:translateZ(0)}
.symbol:hover{background-color:#ececec;transform:translateZ(0) translateY(-5px);box-shadow:0 4px 8px rgba(157,154,154,0.2)}
.maindata{min-height:200px;contain:layout style paint}
.footer{min-height:80px;contain:layout style paint}
img:not([width]):not([height]){min-height:50px;background:#f0f0f0;contain:layout style paint}
h1{font-size:25px !important}
article h1,aside h1,nav h1,section h1{font-size:25px !important}
.symbol{font-size:30px !important}`;

    fs.writeFileSync('optimized-critical.css', optimizedCSS);
    console.log('Created optimized-critical.css for immediate loading');
}

// Run all optimizations
console.log('Starting performance optimization...');
fixPerformanceIssues();
createOptimizedCriticalCSS();
console.log('\n✅ Performance optimization complete!');
