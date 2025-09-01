const fs = require('fs');
const path = require('path');

// Get all HTML files
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to update`);

const enhancedCLSScript = `<script src="enhanced-cls-fix.js" defer></script>`;

let updatedCount = 0;

htmlFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Remove old layout shift scripts
        content = content.replace(/<script src="layout-shift-fix\.js"[^>]*><\/script>/g, '');
        content = content.replace(/<script src="layout-shift-prevention\.js"[^>]*><\/script>/g, '');
        
        // Add enhanced CLS fix before closing head tag
        if (!content.includes('enhanced-cls-fix.js')) {
            content = content.replace('</head>', `\t${enhancedCLSScript}\n</head>`);
            
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
            console.log(`✅ Updated: ${file}`);
        } else {
            console.log(`⏭️  Already has enhanced CLS fix: ${file}`);
        }
    } catch (error) {
        console.error(`❌ Error updating ${file}:`, error.message);
    }
});

console.log(`\n🎉 Successfully updated ${updatedCount} HTML files with enhanced CLS fix`);
console.log('Expected CLS improvement: 0.266 → <0.05');
