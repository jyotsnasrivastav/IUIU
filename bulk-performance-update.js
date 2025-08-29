// Bulk performance optimization script
// This script applies async loading and non-blocking CSS to all HTML files

const fs = require('fs');
const path = require('path');

// Get all HTML files in the directory
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Replace script tags with async versions
        content = content.replace(/<script src="script\.min\.js" defer><\/script>/g, '<script src="script.min.js" async></script>');
        content = content.replace(/<script src="lazy-load\.js"><\/script>/g, '<script src="lazy-load.js" async></script>');
        content = content.replace(/<script src="performance-audit\.js" defer><\/script>/g, '<script src="performance-audit.js" async></script>');
        
        // Replace footer-fix.css with non-blocking version
        content = content.replace(
            /<link rel="stylesheet" href="footer-fix\.css">/g,
            '<link rel="stylesheet" href="footer-fix.css" media="print" onload="this.media=\'all\'">\n\t<noscript><link rel="stylesheet" href="footer-fix.css"></noscript>'
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated: ${file}`);
    } catch (error) {
        console.error(`Error updating ${file}:`, error.message);
    }
});

console.log('Performance optimization complete!');
