// Script to remove all social media meta tags from HTML files
const fs = require('fs');
const path = require('path');

function removeSocialMediaTags(content) {
    // Remove Open Graph meta tags
    content = content.replace(/<meta\s+property="og:[^"]*"[^>]*>/g, '');
    
    // Remove Twitter meta tags
    content = content.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/g, '');
    
    // Remove Facebook meta tags
    content = content.replace(/<meta\s+property="fb:[^"]*"[^>]*>/g, '');
    
    // Remove social media sharing buttons and links
    content = content.replace(/<!-- Sharingbutton[\s\S]*?<\/a>/g, '');
    
    // Remove social sharing sections
    content = content.replace(/<div class="share">[\s\S]*?<\/div>/g, '');
    
    // Remove social media comments sections
    content = content.replace(/<!-- Social Media Comments -->[\s\S]*?<!-- End Social Media Comments -->/g, '');
    
    // Remove Facebook SDK
    content = content.replace(/<script[^>]*facebook[^>]*>[\s\S]*?<\/script>/g, '');
    content = content.replace(/<div[^>]*fb-[^>]*>[\s\S]*?<\/div>/g, '');
    
    // Remove Twitter widgets
    content = content.replace(/<script[^>]*twitter[^>]*>[\s\S]*?<\/script>/g, '');
    
    // Remove Pinterest tags
    content = content.replace(/<meta\s+name="pinterest[^"]*"[^>]*>/g, '');
    
    // Remove LinkedIn tags
    content = content.replace(/<meta\s+property="linkedin:[^"]*"[^>]*>/g, '');
    
    // Remove Instagram tags
    content = content.replace(/<meta\s+property="instagram:[^"]*"[^>]*>/g, '');
    
    // Remove social media structured data
    content = content.replace(/"sameAs":\s*\[[^\]]*\],?/g, '');
    
    // Clean up extra whitespace and empty lines
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    return content;
}

function processFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalLength = content.length;
        
        content = removeSocialMediaTags(content);
        
        if (content.length !== originalLength) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Removed social media tags from: ${path.basename(filePath)}`);
            return true;
        } else {
            console.log(`⚪ No social media tags found in: ${path.basename(filePath)}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        return false;
    }
}

function removeSocialMediaFromAllFiles(directory = '.') {
    const files = fs.readdirSync(directory);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    console.log(`🚀 Removing social media tags from ${htmlFiles.length} HTML files...`);
    
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
    console.log(`   Social media tags removed: ${removedCount}`);
    console.log(`   Files unchanged: ${processedCount - removedCount}`);
    console.log('✨ Social media removal complete!');
}

// Run if called directly
if (require.main === module) {
    removeSocialMediaFromAllFiles();
}

module.exports = { removeSocialMediaFromAllFiles, processFile };
