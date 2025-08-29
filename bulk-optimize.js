// Bulk optimization script for all HTML files
const fs = require('fs');
const path = require('path');

const OPTIMIZATIONS = {
    // Remove blocking scripts
    removeBlockingScripts: (content) => {
        return content
            .replace(/<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->/g, '')
            .replace(/<!-- Google tag \(gtag\.js\) -->[\s\S]*?<\/script>/g, '')
            .replace(/<script[^>]*src="[^"]*googlesyndication[^"]*"[^>]*><\/script>/g, '')
            .replace(/<script[^>]*src="[^"]*pub\.network[^"]*"[^>]*><\/script>/g, '')
            .replace(/<script[^>]*src="[^"]*amazon-adsystem[^"]*"[^>]*><\/script>/g, '');
    },
    
    // Replace CSS with optimized version
    optimizeCSS: (content) => {
        const criticalCSS = `
        <style>
        /* Critical CSS */
        *{box-sizing:border-box;padding:0;margin:0}
        body{font-family:arial,serif;background-color:#ebecef;margin:0}
        header{width:100%;background-color:#230AC7}
        .headCont{max-width:1168px;margin:0 auto;text-align:center}
        .mainlogo{width:100%;font-size:15px;text-align:center;background-color:#230AC7;color:#fff;font-family:arial;padding:5px 0}
        .mainlogo img{width:270px;padding-top:2px;height:auto}
        .mainlogo a{color:white;font-size:2rem;text-decoration:none}
        #target{position:fixed;bottom:0;width:100%;background:#fff;z-index:9;box-shadow:0 0 5px rgba(0,0,0,0.15);padding:5px}
        .symbol{text-align:center;margin:0 0 0.5rem 0.1rem;border-radius:5px;color:#424949;border:1px solid #d3d3d3;display:inline-block;min-width:50px;min-height:50px;font-size:20px;line-height:50px;transition:.2s;cursor:pointer;contain:layout style paint}
        .symbol:hover{background-color:#ececec;margin-top:-5px;box-shadow:4px 4px 4px 1px rgba(157,154,154,0.2)}
        </style>
        <link rel="preload" href="main.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <noscript><link rel="stylesheet" href="main.min.css"></noscript>`;
        
        return content.replace(
            /<link rel="stylesheet" href="main\.css">/,
            criticalCSS
        );
    },
    
    // Optimize JavaScript loading
    optimizeJS: (content) => {
        return content
            .replace(/<script src="script\.js"><\/script>/, '<script src="script.min.js" defer></script>')
            .replace(/<script src="[^"]*jquery[^"]*"><\/script>/g, '')
            .replace(/<script src="[^"]*infinite-scroll[^"]*"><\/script>/g, '');
    },
    
    // Add performance scripts
    addPerformanceScripts: (content) => {
        const scripts = `
        <script src="lazy-load.js"></script>
        <script src="script.min.js" defer></script>
        <script src="performance-audit.js" defer></script>`;
        
        return content.replace(
            /(<\/body>)/,
            `${scripts}\n$1`
        );
    },
    
    // Remove ad-related elements
    removeAds: (content) => {
        return content
            .replace(/<link[^>]*preconnect[^>]*pub\.network[^>]*>/g, '')
            .replace(/<link[^>]*preconnect[^>]*amazon-adsystem[^>]*>/g, '')
            .replace(/<link[^>]*preconnect[^>]*btloader[^>]*>/g, '')
            .replace(/<link[^>]*stylesheet[^>]*pub\.network[^>]*>/g, '');
    },
    
    // Optimize images
    optimizeImages: (content) => {
        return content.replace(
            /<img([^>]*src="[^"]*"[^>]*)>/g,
            (match, attrs) => {
                if (!attrs.includes('loading=')) {
                    attrs += ' loading="lazy"';
                }
                if (!attrs.includes('decoding=')) {
                    attrs += ' decoding="async"';
                }
                return `<img${attrs}>`;
            }
        );
    }
};

function optimizeFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Apply all optimizations
        Object.values(OPTIMIZATIONS).forEach(optimize => {
            content = optimize(content);
        });
        
        // Write optimized content back
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Optimized: ${path.basename(filePath)}`);
        
    } catch (error) {
        console.error(`❌ Error optimizing ${filePath}:`, error.message);
    }
}

function bulkOptimize(directory = '.') {
    const files = fs.readdirSync(directory);
    const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'index.html');
    
    console.log(`🚀 Starting bulk optimization of ${htmlFiles.length} HTML files...`);
    
    htmlFiles.forEach(file => {
        const filePath = path.join(directory, file);
        optimizeFile(filePath);
    });
    
    console.log('✨ Bulk optimization complete!');
}

// Run if called directly
if (require.main === module) {
    bulkOptimize();
}

module.exports = { optimizeFile, bulkOptimize, OPTIMIZATIONS };
