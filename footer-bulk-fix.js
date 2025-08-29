// Script to apply footer fixes to all HTML files
const fs = require('fs');
const path = require('path');

function addFooterFix(content) {
    // Check if footer-fix.css is already included
    if (content.includes('footer-fix.css')) {
        return content;
    }
    
    // Add the footer fix CSS before closing body tag
    const footerFixLink = '\t<link rel="stylesheet" href="footer-fix.css">';
    
    // Insert before the first script tag or before </body>
    if (content.includes('<script')) {
        return content.replace(/(\s*<script)/, `\n${footerFixLink}\n$1`);
    } else if (content.includes('</body>')) {
        return content.replace(/(\s*<\/body>)/, `\n${footerFixLink}\n$1`);
    }
    
    return content;
}

function processFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        content = addFooterFix(content);
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Added footer fix to: ${path.basename(filePath)}`);
            return true;
        } else {
            console.log(`⚪ Footer fix already present in: ${path.basename(filePath)}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        return false;
    }
}

function applyFooterFixToAllFiles(directory = '.') {
    const files = fs.readdirSync(directory);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    console.log(`🚀 Applying footer fix to ${htmlFiles.length} HTML files...`);
    
    let processedCount = 0;
    let addedCount = 0;
    
    htmlFiles.forEach(file => {
        const filePath = path.join(directory, file);
        const wasAdded = processFile(filePath);
        processedCount++;
        if (wasAdded) addedCount++;
    });
    
    console.log(`\n📊 Summary:`);
    console.log(`   Files processed: ${processedCount}`);
    console.log(`   Footer fixes added: ${addedCount}`);
    console.log(`   Files unchanged: ${processedCount - addedCount}`);
    console.log('✨ Footer fix application complete!');
}

// Run if called directly
if (require.main === module) {
    applyFooterFixToAllFiles();
}

module.exports = { applyFooterFixToAllFiles, processFile };
