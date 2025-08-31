const fs = require('fs');
const path = require('path');

// Function to clean numbers from text
function removeNumbers(text) {
    // Remove patterns like "100+", "50+", "30+", "500+", etc.
    return text
        .replace(/\b\d+\+\s*/g, '') // Remove "100+ ", "50+ ", etc.
        .replace(/\b\d+\s*\+/g, '') // Remove "100+", "50+", etc.
        .replace(/\s*-\s*\d+\+/g, '') // Remove " - 100+"
        .replace(/:\s*\d+\+/g, ':') // Remove ": 100+"
        .replace(/\(\d+\+[^)]*\)/g, '') // Remove "(100+ something)"
        .replace(/\s+/g, ' ') // Clean up extra spaces
        .trim();
}

// Function to update HTML file
function updateHtmlFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const filename = path.basename(filePath);
        let updated = false;
        
        // Update title
        const titleMatch = content.match(/<title>(.*?)<\/title>/);
        if (titleMatch) {
            const originalTitle = titleMatch[1];
            const cleanTitle = removeNumbers(originalTitle);
            
            if (originalTitle !== cleanTitle) {
                content = content.replace(titleMatch[0], `<title>${cleanTitle}</title>`);
                console.log(`✓ Updated title in ${filename}:`);
                console.log(`  From: "${originalTitle}"`);
                console.log(`  To:   "${cleanTitle}"`);
                updated = true;
            }
        }
        
        // Update meta description
        const descMatch = content.match(/<meta name="description" content="(.*?)"/);
        if (descMatch) {
            const originalDesc = descMatch[1];
            const cleanDesc = removeNumbers(originalDesc);
            
            if (originalDesc !== cleanDesc) {
                content = content.replace(descMatch[0], `<meta name="description" content="${cleanDesc}"`);
                console.log(`✓ Updated description in ${filename}:`);
                console.log(`  From: "${originalDesc}"`);
                console.log(`  To:   "${cleanDesc}"`);
                updated = true;
            }
        }
        
        // Update Twitter title if present
        const twitterTitleMatch = content.match(/<meta property="twitter:title" content="(.*?)"/);
        if (twitterTitleMatch) {
            const originalTwitterTitle = twitterTitleMatch[1];
            const cleanTwitterTitle = removeNumbers(originalTwitterTitle);
            
            if (originalTwitterTitle !== cleanTwitterTitle) {
                content = content.replace(twitterTitleMatch[0], `<meta property="twitter:title" content="${cleanTwitterTitle}"`);
                console.log(`✓ Updated Twitter title in ${filename}`);
                updated = true;
            }
        }
        
        // Update Twitter description if present
        const twitterDescMatch = content.match(/<meta property="twitter:description" content="(.*?)"/);
        if (twitterDescMatch) {
            const originalTwitterDesc = twitterDescMatch[1];
            const cleanTwitterDesc = removeNumbers(originalTwitterDesc);
            
            if (originalTwitterDesc !== cleanTwitterDesc) {
                content = content.replace(twitterDescMatch[0], `<meta property="twitter:description" content="${cleanTwitterDesc}"`);
                console.log(`✓ Updated Twitter description in ${filename}`);
                updated = true;
            }
        }
        
        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Saved changes to ${filename}\n`);
        } else {
            console.log(`✓ ${filename} - No numbers found to remove`);
        }
        
    } catch (error) {
        console.error(`✗ Error processing ${filePath}:`, error.message);
    }
}

// Main function
function removeNumbersFromAllFiles() {
    const currentDir = __dirname;
    const files = fs.readdirSync(currentDir);
    
    const htmlFiles = files.filter(file => 
        file.endsWith('.html') && 
        !file.startsWith('.')
    );
    
    console.log(`Removing numbers from titles and meta descriptions in ${htmlFiles.length} HTML files...\n`);
    
    htmlFiles.forEach(file => {
        const filePath = path.join(currentDir, file);
        updateHtmlFile(filePath);
    });
    
    console.log(`\n✅ Completed removing numbers from all HTML files!`);
}

// Run the cleanup
removeNumbersFromAllFiles();
