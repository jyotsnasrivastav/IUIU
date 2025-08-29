// Convert PNG references to WebP across all HTML files
const fs = require('fs');
const path = require('path');

// Get all HTML files in the directory
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));

let totalUpdated = 0;

htmlFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        
        // Convert PNG references to WebP
        content = content.replace(/\/img\/symbolsemoji\.png/g, '/img/symbolsemoji.webp');
        content = content.replace(/img\/symbolsemoji\.png/g, 'img/symbolsemoji.webp');
        content = content.replace(/symbolsemoji\.png/g, 'symbolsemoji.webp');
        
        // Also convert symbolsemoji.com.png if it exists
        content = content.replace(/\/img\/symbolsemoji\.com\.png/g, '/img/symbolsemoji.com.webp');
        content = content.replace(/img\/symbolsemoji\.com\.png/g, 'img/symbolsemoji.com.webp');
        content = content.replace(/symbolsemoji\.com\.png/g, 'symbolsemoji.com.webp');
        
        if (content !== originalContent) {
            fs.writeFileSync(file, content);
            console.log(`Updated PNG to WebP references in: ${file}`);
            totalUpdated++;
        }
    } catch (error) {
        console.error(`Error updating ${file}:`, error.message);
    }
});

console.log(`\nPNG to WebP conversion complete! Updated ${totalUpdated} files.`);
