// Readability Fix Script - Find and improve content with poor readability scores
const fs = require('fs');
const path = require('path');

// Function to calculate Flesch Reading Ease score
function calculateFleschScore(text) {
    // Remove HTML tags and clean text
    const cleanText = text.replace(/<[^>]*>/g, ' ')
                         .replace(/\s+/g, ' ')
                         .trim();
    
    if (cleanText.length < 10) return 100; // Very short text is easy to read
    
    // Count sentences (approximate)
    const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    // Count words
    const words = cleanText.split(/\s+/).filter(w => w.length > 0).length;
    
    // Count syllables (approximate)
    let syllables = 0;
    const wordList = cleanText.toLowerCase().split(/\s+/);
    
    wordList.forEach(word => {
        word = word.replace(/[^a-z]/g, '');
        if (word.length === 0) return;
        
        // Count vowel groups
        const vowelGroups = word.match(/[aeiouy]+/g);
        syllables += vowelGroups ? vowelGroups.length : 1;
        
        // Subtract silent e
        if (word.endsWith('e') && word.length > 1) {
            syllables--;
        }
        
        // Ensure at least 1 syllable per word
        if (syllables === 0) syllables = 1;
    });
    
    if (sentences === 0 || words === 0) return 100;
    
    // Flesch Reading Ease formula
    const avgSentenceLength = words / sentences;
    const avgSyllablesPerWord = syllables / words;
    
    const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
    
    return Math.max(0, Math.min(100, score));
}

// Function to improve readability of text
function improveReadability(text) {
    let improved = text;
    
    // Break long sentences
    improved = improved.replace(/([.!?])\s*([A-Z])/g, '$1 $2');
    
    // Simplify complex words and phrases
    const replacements = {
        'utilize': 'use',
        'facilitate': 'help',
        'demonstrate': 'show',
        'approximately': 'about',
        'subsequently': 'then',
        'consequently': 'so',
        'furthermore': 'also',
        'nevertheless': 'but',
        'therefore': 'so',
        'however': 'but',
        'additionally': 'also',
        'specifically': '',
        'particularly': '',
        'essentially': '',
        'basically': '',
        'fundamentally': '',
        'comprehensive': 'complete',
        'extensive': 'large',
        'numerous': 'many',
        'various': 'different',
        'multiple': 'many',
        'significant': 'important',
        'substantial': 'large',
        'considerable': 'large',
        'appropriate': 'right',
        'sufficient': 'enough',
        'necessary': 'needed',
        'required': 'needed',
        'implement': 'use',
        'establish': 'set up',
        'maintain': 'keep',
        'obtain': 'get',
        'acquire': 'get',
        'purchase': 'buy',
        'construct': 'build',
        'create': 'make',
        'generate': 'make',
        'produce': 'make',
        'develop': 'make',
        'enhance': 'improve',
        'optimize': 'improve',
        'maximize': 'increase',
        'minimize': 'reduce'
    };
    
    // Apply word replacements
    Object.entries(replacements).forEach(([complex, simple]) => {
        const regex = new RegExp(`\\b${complex}\\b`, 'gi');
        improved = improved.replace(regex, simple);
    });
    
    // Remove redundant phrases
    improved = improved.replace(/\s+in order to\s+/gi, ' to ');
    improved = improved.replace(/\s+due to the fact that\s+/gi, ' because ');
    improved = improved.replace(/\s+for the purpose of\s+/gi, ' to ');
    improved = improved.replace(/\s+with regard to\s+/gi, ' about ');
    improved = improved.replace(/\s+in relation to\s+/gi, ' about ');
    improved = improved.replace(/\s+as a result of\s+/gi, ' because of ');
    
    // Clean up extra spaces
    improved = improved.replace(/\s+/g, ' ').trim();
    
    return improved;
}

// Function to extract readable content from HTML
function extractReadableContent(htmlContent) {
    // Extract text from paragraphs, headings, and list items
    const contentRegex = /<(?:p|h[1-6]|li)[^>]*>(.*?)<\/(?:p|h[1-6]|li)>/gi;
    let matches = [];
    let match;
    
    while ((match = contentRegex.exec(htmlContent)) !== null) {
        const text = match[1].replace(/<[^>]*>/g, ' ').trim();
        if (text.length > 20) { // Only consider substantial text
            matches.push({
                fullMatch: match[0],
                text: text,
                index: match.index
            });
        }
    }
    
    return matches;
}

// Main function to find and fix readability issues
function fixReadabilityIssues() {
    const htmlDir = __dirname;
    const htmlFiles = fs.readdirSync(htmlDir)
        .filter(file => file.endsWith('.html'))
        .map(file => path.join(htmlDir, file));
    
    console.log(`Analyzing ${htmlFiles.length} HTML files for readability issues...`);
    
    let poorReadabilityFiles = [];
    
    // First pass: identify files with poor readability
    htmlFiles.forEach(filePath => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const readableContent = extractReadableContent(content);
            
            if (readableContent.length > 0) {
                const combinedText = readableContent.map(item => item.text).join(' ');
                const fleschScore = calculateFleschScore(combinedText);
                
                // Flesch scores: 0-30 = Very Difficult, 30-50 = Difficult
                if (fleschScore < 50) {
                    poorReadabilityFiles.push({
                        filePath,
                        score: fleschScore,
                        content: readableContent
                    });
                }
            }
        } catch (error) {
            console.error(`Error analyzing ${filePath}:`, error.message);
        }
    });
    
    console.log(`Found ${poorReadabilityFiles.length} files with poor readability (Flesch score < 50)`);
    
    // Sort by worst readability first
    poorReadabilityFiles.sort((a, b) => a.score - b.score);
    
    let fixedFiles = 0;
    
    // Fix the worst readability issues
    poorReadabilityFiles.slice(0, 5).forEach(fileData => {
        try {
            const { filePath, score, content } = fileData;
            let htmlContent = fs.readFileSync(filePath, 'utf8');
            let modified = false;
            
            console.log(`\nImproving readability in ${path.basename(filePath)} (Flesch score: ${score.toFixed(1)})`);
            
            // Process content items in reverse order to maintain indices
            content.reverse().forEach(item => {
                const improvedText = improveReadability(item.text);
                
                if (improvedText !== item.text && improvedText.length > 0) {
                    const improvedMatch = item.fullMatch.replace(item.text, improvedText);
                    
                    htmlContent = htmlContent.substring(0, item.index) + 
                                 improvedMatch + 
                                 htmlContent.substring(item.index + item.fullMatch.length);
                    
                    modified = true;
                    console.log(`  Improved: "${item.text.substring(0, 50)}..." -> "${improvedText.substring(0, 50)}..."`);
                }
            });
            
            if (modified) {
                fs.writeFileSync(filePath, htmlContent, 'utf8');
                fixedFiles++;
                
                // Recalculate score
                const newReadableContent = extractReadableContent(htmlContent);
                const newCombinedText = newReadableContent.map(item => item.text).join(' ');
                const newScore = calculateFleschScore(newCombinedText);
                
                console.log(`  New Flesch score: ${newScore.toFixed(1)} (improvement: +${(newScore - score).toFixed(1)})`);
            }
        } catch (error) {
            console.error(`Error fixing readability in ${fileData.filePath}:`, error.message);
        }
    });
    
    console.log(`\nCompleted! Improved readability in ${fixedFiles} files.`);
    
    if (poorReadabilityFiles.length > 0) {
        console.log(`\nWorst readability scores found:`);
        poorReadabilityFiles.slice(0, 10).forEach(file => {
            console.log(`  ${path.basename(file.filePath)}: ${file.score.toFixed(1)}`);
        });
    }
}

// Run the script
if (require.main === module) {
    fixReadabilityIssues();
}

module.exports = { fixReadabilityIssues };
