// SEO Fix Script - Batch process to fix title and meta description length issues
// This script identifies and suggests fixes for common SEO issues

const fs = require('fs');
const path = require('path');

// Configuration
const MAX_TITLE_CHARS = 60;
const MAX_META_DESC_CHARS = 155;
const MAX_TITLE_PIXELS = 561;
const MAX_META_DESC_PIXELS = 985;

// Approximate pixel width calculation (rough estimate)
function estimatePixelWidth(text) {
    // Average character width approximation for Google's font
    const avgCharWidth = 9.5;
    return text.length * avgCharWidth;
}

// Function to truncate title while preserving meaning
function optimizeTitle(title) {
    // Remove excessive symbols and emojis at the end
    let optimized = title.replace(/[^\w\s\(\)\-\|&]+$/, '');
    
    // If still too long, truncate intelligently
    if (optimized.length > MAX_TITLE_CHARS) {
        // Try to keep the main keyword and add "Copy Paste"
        const words = optimized.split(' ');
        let result = '';
        
        for (let i = 0; i < words.length; i++) {
            const testResult = result + (result ? ' ' : '') + words[i];
            if (testResult.length + 11 <= MAX_TITLE_CHARS) { // Reserve space for " Copy Paste"
                result = testResult;
            } else {
                break;
            }
        }
        
        // Add "Copy Paste" if there's room
        if (result.length + 11 <= MAX_TITLE_CHARS) {
            result += ' Copy Paste';
        }
        
        optimized = result || optimized.substring(0, MAX_TITLE_CHARS - 3) + '...';
    }
    
    return optimized;
}

// Function to optimize meta description
function optimizeMetaDescription(description) {
    if (description.length <= MAX_META_DESC_CHARS) {
        return description;
    }
    
    // Find the last complete sentence within the limit
    const sentences = description.split('. ');
    let result = '';
    
    for (const sentence of sentences) {
        const testResult = result + (result ? '. ' : '') + sentence;
        if (testResult.length <= MAX_META_DESC_CHARS - 1) { // Reserve space for period
            result = testResult;
        } else {
            break;
        }
    }
    
    // If no complete sentence fits, truncate at word boundary
    if (!result) {
        const words = description.split(' ');
        for (const word of words) {
            const testResult = result + (result ? ' ' : '') + word;
            if (testResult.length <= MAX_META_DESC_CHARS - 3) { // Reserve space for "..."
                result = testResult;
            } else {
                break;
            }
        }
        result += '...';
    } else if (!result.endsWith('.')) {
        result += '.';
    }
    
    return result;
}

// Function to process a single HTML file
function processHtmlFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        let newContent = content;
        
        // Extract current title
        const titleMatch = content.match(/<title>(.*?)<\/title>/i);
        if (titleMatch) {
            const currentTitle = titleMatch[1];
            const optimizedTitle = optimizeTitle(currentTitle);
            
            if (currentTitle !== optimizedTitle) {
                newContent = newContent.replace(titleMatch[0], `<title>${optimizedTitle}</title>`);
                modified = true;
                console.log(`Title optimized in ${path.basename(filePath)}:`);
                console.log(`  Before: ${currentTitle} (${currentTitle.length} chars)`);
                console.log(`  After:  ${optimizedTitle} (${optimizedTitle.length} chars)`);
            }
        }
        
        // Extract current meta description
        const metaDescMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
        if (metaDescMatch) {
            const currentDesc = metaDescMatch[1];
            const optimizedDesc = optimizeMetaDescription(currentDesc);
            
            if (currentDesc !== optimizedDesc) {
                newContent = newContent.replace(metaDescMatch[0], 
                    `<meta name="description" content="${optimizedDesc}"`);
                modified = true;
                console.log(`Meta description optimized in ${path.basename(filePath)}:`);
                console.log(`  Before: ${currentDesc} (${currentDesc.length} chars)`);
                console.log(`  After:  ${optimizedDesc} (${optimizedDesc.length} chars)`);
            }
        }
        
        // Write back if modified
        if (modified) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            return true;
        }
        
        return false;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return false;
    }
}

// Main execution
function main() {
    const htmlDir = __dirname;
    const htmlFiles = fs.readdirSync(htmlDir)
        .filter(file => file.endsWith('.html'))
        .map(file => path.join(htmlDir, file));
    
    console.log(`Processing ${htmlFiles.length} HTML files...`);
    
    let processedCount = 0;
    for (const filePath of htmlFiles) {
        if (processHtmlFile(filePath)) {
            processedCount++;
        }
    }
    
    console.log(`\nCompleted! ${processedCount} files were modified.`);
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { optimizeTitle, optimizeMetaDescription, processHtmlFile };
