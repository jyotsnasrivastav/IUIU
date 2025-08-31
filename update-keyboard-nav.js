const fs = require('fs');
const path = require('path');

// Get all HTML files except keyboard-symbols.html and special files
const files = fs.readdirSync('.').filter(file => 
    file.endsWith('.html') && 
    file !== 'keyboard-symbols.html' && 
    !file.includes('favicon') && 
    !file.includes('fontello')
);

console.log(`Found ${files.length} HTML files to update`);

let updatedCount = 0;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // Add to symbolcat section (after cryptocurrency)
        if (content.includes('cryptocurrency-symbols.html">₿ Cryptocurrency</a>') && 
            !content.includes('keyboard-symbols.html">⌨️ Keyboard</a>')) {
            content = content.replace(
                /(<a href="cryptocurrency-symbols\.html">₿ Cryptocurrency<\/a>)\s*(<\/div>)/,
                '$1\n\t\t\t<a href="keyboard-symbols.html">⌨️ Keyboard</a>$2'
            );
            modified = true;
        }
        
        // Add to bookmarks section (after cryptocurrency)
        if (content.includes('cryptocurrency-symbols.html">Cryptocurrency - ₿</a>') && 
            !content.includes('keyboard-symbols.html">Keyboard - ⌨️</a>')) {
            content = content.replace(
                /(<a href="cryptocurrency-symbols\.html">Cryptocurrency - ₿<\/a>)/,
                '$1\n\t\t\t\t<a href="keyboard-symbols.html">Keyboard - ⌨️</a>'
            );
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
            console.log(`✓ Updated ${file}`);
        } else {
            console.log(`- Skipped ${file} (already has keyboard link or no target found)`);
        }
        
    } catch (error) {
        console.error(`✗ Error updating ${file}:`, error.message);
    }
});

console.log(`\nCompleted! Updated ${updatedCount} out of ${files.length} files.`);
