// Script to remove #target section from all HTML files
const fs = require('fs');
const path = require('path');

function removeTargetSection(content) {
    // Remove the entire #target div section including all social sharing buttons
    const targetRegex = /<div id="target">[\s\S]*?<\/div>\s*(?=<section|<\/body|$)/g;
    
    // Also remove any standalone target sections that might be formatted differently
    const alternativeRegex = /\s*<div id="target">[\s\S]*?<\/div>\s*<\/div>/g;
    
    let cleanedContent = content.replace(targetRegex, '\n\n');
    cleanedContent = cleanedContent.replace(alternativeRegex, '\n\n');
    
    // Clean up extra whitespace
    cleanedContent = cleanedContent.replace(/\n{3,}/g, '\n\n');
    
    return cleanedContent;
}

function processFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalLength = content.length;
        
        content = removeTargetSection(content);
        
        if (content.length !== originalLength) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Removed #target section from: ${path.basename(filePath)}`);
            return true;
        } else {
            console.log(`⚪ No #target section found in: ${path.basename(filePath)}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        return false;
    }
}

function removeTargetFromAllFiles(directory = '.') {
    const files = fs.readdirSync(directory);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    console.log(`🚀 Removing #target section from ${htmlFiles.length} HTML files...`);
    
    let processedCount = 0;
    let removedCount = 0;
    
    htmlFiles.forEach(file => {
        const filePath = path.join(directory, file);
        const wasRemoved = processFile(filePath);
        processedCount++;
        if (wasRemoved) removedCount++;
    });
    
    console.log(`\n📊 Summary:`);
    console.log(`   Files processed: ${processedCount}`);
    console.log(`   Sections removed: ${removedCount}`);
    console.log(`   Files unchanged: ${processedCount - removedCount}`);
    console.log('✨ Target section removal complete!');
}

// Run if called directly
if (require.main === module) {
    removeTargetFromAllFiles();
}

module.exports = { removeTargetFromAllFiles, processFile };
