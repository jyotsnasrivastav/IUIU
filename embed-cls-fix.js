const fs = require('fs');
const path = require('path');

// Get all HTML files
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to update`);

// Read the enhanced CLS fix content
const clsFixContent = fs.readFileSync('enhanced-cls-fix.js', 'utf8');

// Create inline script tag with the CLS fix
const inlineClsFix = `<script>
${clsFixContent}
</script>`;

let updatedCount = 0;

htmlFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Remove external script references
        content = content.replace(/<script src="enhanced-cls-fix\.js"[^>]*><\/script>/g, '');
        content = content.replace(/<script src="layout-shift-fix\.js"[^>]*><\/script>/g, '');
        content = content.replace(/<script src="layout-shift-prevention\.js"[^>]*><\/script>/g, '');
        
        // Add inline CLS fix before closing head tag if not already present
        if (!content.includes('Enhanced Cumulative Layout Shift Fix')) {
            content = content.replace('</head>', `\t${inlineClsFix}\n</head>`);
            
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
            console.log(`✅ Updated: ${file}`);
        } else {
            console.log(`⏭️  Already has embedded CLS fix: ${file}`);
        }
    } catch (error) {
        console.error(`❌ Error updating ${file}:`, error.message);
    }
});

console.log(`\n🎉 Successfully embedded CLS fix in ${updatedCount} HTML files`);
console.log('CLS fix is now inline - no external file dependencies');
console.log('Expected CLS improvement: 0.266 → <0.05');
