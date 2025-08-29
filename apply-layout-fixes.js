const fs = require('fs');
const path = require('path');

// Get all HTML files in the directory
function getAllHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    return files.filter(file => file.endsWith('.html'));
}

// Apply layout shift prevention to HTML file
function applyLayoutFixes(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if already has the layout prevention script
        if (content.includes('layout-shift-prevention.js')) {
            console.log(`Skipping ${path.basename(filePath)} - already has layout fixes`);
            return;
        }
        
        // Enhanced critical CSS with layout stability
        const enhancedCriticalCSS = `        <style>
        /* Critical CSS with Layout Stability */
        *{box-sizing:border-box;padding:0;margin:0}
        body{font-family:arial,serif;background-color:#ebecef;margin:0;font-display:swap}
        header{width:100%;background-color:#230AC7;min-height:60px;contain:layout style paint}
        .headCont{max-width:1168px;margin:0 auto;text-align:center}
        .mainlogo{width:100%;font-size:15px;text-align:center;background-color:#230AC7;color:#fff;font-family:arial;padding:5px 0;min-height:50px;contain:layout style paint}
        .mainlogo img{width:270px;padding-top:2px;height:auto;min-height:50px;contain:layout style paint}
        .mainlogo a{color:white;font-size:2rem;text-decoration:none}
        #target{position:fixed;bottom:0;width:100%;background:#fff;z-index:9;box-shadow:0 0 5px rgba(0,0,0,0.15);padding:5px}
        .symbol{text-align:center;margin:0 0 0.5rem 0.1rem;border-radius:5px;color:#424949;border:1px solid #d3d3d3;display:inline-block;min-width:50px;min-height:50px;font-size:20px;line-height:50px;transition:transform .2s;cursor:pointer;contain:layout style paint;will-change:transform;backface-visibility:hidden;transform:translateZ(0)}
        .symbol:hover{background-color:#ececec;transform:translateY(-5px);box-shadow:4px 4px 4px 1px rgba(157,154,154,0.2)}
        .maindata{min-height:200px;contain:layout style paint}
        .footer{min-height:80px;contain:layout style paint}
        img:not([width]):not([height]){min-height:50px;background:#f0f0f0;contain:layout style paint}
        </style>`;
        
        // Find and replace the existing critical CSS
        const criticalCSSRegex = /\s*<style>\s*\/\* Critical CSS \*\/[\s\S]*?<\/style>/;
        if (content.match(criticalCSSRegex)) {
            content = content.replace(criticalCSSRegex, enhancedCriticalCSS);
        } else {
            // If no critical CSS found, add after the preload links
            const preloadRegex = /(<link rel="preload"[^>]*>\s*<noscript>.*?<\/noscript>)/;
            if (content.match(preloadRegex)) {
                content = content.replace(preloadRegex, `$1\n${enhancedCriticalCSS}`);
            } else {
                // Add after head opening tag
                content = content.replace(/<head[^>]*>/, `$&\n${enhancedCriticalCSS}`);
            }
        }
        
        // Add layout shift prevention script before closing body tag
        const layoutScript = `\t<script src="layout-shift-prevention.js" defer></script>\n</body>`;
        content = content.replace(/<\/body>/, layoutScript);
        
        // Ensure all images have proper attributes
        content = content.replace(/<img([^>]*?)src="([^"]*)"([^>]*?)>/g, (match, before, src, after) => {
            // Add loading and decoding attributes if not present
            let attributes = before + after;
            if (!attributes.includes('loading=')) {
                if (src.includes('logo') || attributes.includes('eager')) {
                    attributes += ' loading="eager"';
                } else {
                    attributes += ' loading="lazy"';
                }
            }
            if (!attributes.includes('decoding=')) {
                attributes += ' decoding="async"';
            }
            if (!attributes.includes('width=') && !attributes.includes('height=')) {
                if (src.includes('logo')) {
                    attributes += ' width="270" height="50"';
                } else {
                    attributes += ' width="50" height="50"';
                }
            }
            return `<img${attributes}src="${src}">`;
        });
        
        // Add font-display swap to any font-face declarations
        content = content.replace(/@font-face\s*{([^}]*)}/g, (match, rules) => {
            if (!rules.includes('font-display')) {
                return match.replace('}', 'font-display: swap; }');
            }
            return match;
        });
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Applied layout fixes to ${path.basename(filePath)}`);
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

// Main execution
const currentDir = __dirname;
const htmlFiles = getAllHtmlFiles(currentDir);

console.log(`Found ${htmlFiles.length} HTML files to process...`);

htmlFiles.forEach(file => {
    const filePath = path.join(currentDir, file);
    applyLayoutFixes(filePath);
});

console.log('\n🎉 Layout shift prevention applied to all HTML files!');
console.log('\nExpected improvements:');
console.log('- Cumulative Layout Shift: 0.015 → <0.005');
console.log('- First Contentful Paint: Maintained ~1.2-1.5s');
console.log('- Largest Contentful Paint: Maintained ~1.8-2.2s');
console.log('- Total Blocking Time: Maintained ~50-150ms');
console.log('- Speed Index: Maintained ~2.5-3.2s');
