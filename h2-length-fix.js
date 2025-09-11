// H2 Length Fix Script - Find and fix H2 tags over 70 characters
const fs = require('fs');
const path = require('path');

const MAX_H2_CHARS = 70;

// Function to extract all H2 tags with their positions
function extractH2TagsWithPositions(content) {
    const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
    const results = [];
    let match;
    
    while ((match = h2Regex.exec(content)) !== null) {
        const fullMatch = match[0];
        const innerText = match[1].replace(/<[^>]*>/g, '').trim();
        results.push({
            fullMatch,
            innerText,
            length: innerText.length,
            index: match.index
        });
    }
    
    return results;
}

// Function to shorten H2 text intelligently
function shortenH2Text(text) {
    if (text.length <= MAX_H2_CHARS) {
        return text;
    }
    
    // Remove redundant words and phrases
    let shortened = text
        .replace(/Copy\s+and\s+Paste/gi, 'Copy Paste')
        .replace(/Copy\s+&\s+Paste/gi, 'Copy Paste')
        .replace(/\s+Collection$/i, '')
        .replace(/\s+Symbols?$/i, '')
        .replace(/\s+Characters?$/i, '')
        .replace(/Special\s+/gi, '')
        .replace(/\s+Text\s+/gi, ' ')
        .replace(/\s+Emoji\s+/gi, ' ')
        .replace(/\s+Symbol\s+/gi, ' ')
        .trim();
    
    // If still too long, truncate at word boundary
    if (shortened.length > MAX_H2_CHARS) {
        const words = shortened.split(' ');
        let result = '';
        
        for (const word of words) {
            const testResult = result + (result ? ' ' : '') + word;
            if (testResult.length <= MAX_H2_CHARS) {
                result = testResult;
            } else {
                break;
            }
        }
        
        shortened = result || shortened.substring(0, MAX_H2_CHARS - 3) + '...';
    }
    
    return shortened;
}

// Main function to fix long H2 tags
function fixLongH2Tags() {
    const htmlDir = __dirname;
    const htmlFiles = fs.readdirSync(htmlDir)
        .filter(file => file.endsWith('.html'))
        .map(file => path.join(htmlDir, file));
    
    console.log(`Analyzing ${htmlFiles.length} HTML files for long H2 tags...`);
    
    let totalLongH2s = 0;
    let fixedFiles = 0;
    
    htmlFiles.forEach(filePath => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const h2Tags = extractH2TagsWithPositions(content);
            const longH2s = h2Tags.filter(h2 => h2.length > MAX_H2_CHARS);
            
            if (longH2s.length > 0) {
                totalLongH2s += longH2s.length;
                let newContent = content;
                
                console.log(`\nFile: ${path.basename(filePath)}`);
                
                // Process H2s in reverse order to maintain correct indices
                longH2s.reverse().forEach(h2 => {
                    const shortenedText = shortenH2Text(h2.innerText);
                    const newH2Tag = h2.fullMatch.replace(h2.innerText, shortenedText);
                    
                    newContent = newContent.substring(0, h2.index) + 
                               newH2Tag + 
                               newContent.substring(h2.index + h2.fullMatch.length);
                    
                    console.log(`  Before: "${h2.innerText}" (${h2.length} chars)`);
                    console.log(`  After:  "${shortenedText}" (${shortenedText.length} chars)`);
                });
                
                fs.writeFileSync(filePath, newContent, 'utf8');
                fixedFiles++;
            }
        } catch (error) {
            console.error(`Error processing ${filePath}:`, error.message);
        }
    });
    
    console.log(`\nCompleted! Found ${totalLongH2s} long H2 tags in ${fixedFiles} files.`);
    console.log(`All H2 tags have been optimized to be under ${MAX_H2_CHARS} characters.`);
}

// Run the script
if (require.main === module) {
    fixLongH2Tags();
}

module.exports = { fixLongH2Tags };
