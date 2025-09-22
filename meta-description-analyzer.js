#!/usr/bin/env node

/**
 * Meta Description Analyzer and Fixer
 * Identifies duplicate meta descriptions and descriptions that are too long
 * Generates unique, optimized descriptions for each page
 */

const fs = require('fs');
const path = require('path');

class MetaDescriptionAnalyzer {
    constructor() {
        this.descriptions = new Map();
        this.duplicates = [];
        this.tooLong = [];
        this.missing = [];
        this.fixes = [];
        this.errors = [];
        this.optimalLength = 158; // Google's recommended max length
    }

    /**
     * Analyze all HTML files for meta description issues
     */
    analyzeMetaDescriptions(directory) {
        console.log('🔍 Analyzing meta descriptions in HTML files...');
        
        const htmlFiles = this.findHtmlFiles(directory);
        
        htmlFiles.forEach(filePath => {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const relativePath = path.relative(directory, filePath);
                
                const descAnalysis = this.analyzePageDescription(content, relativePath);
                this.processDescriptionAnalysis(descAnalysis);
                
            } catch (error) {
                this.errors.push(`Error analyzing ${filePath}: ${error.message}`);
            }
        });

        this.identifyDuplicates();

        return {
            totalFiles: htmlFiles.length,
            duplicates: this.duplicates.length,
            tooLong: this.tooLong.length,
            missing: this.missing.length,
            errors: this.errors.length
        };
    }

    /**
     * Analyze meta description in a single page
     */
    analyzePageDescription(content, filePath) {
        const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
        
        if (!descMatch) {
            return {
                file: filePath,
                hasDescription: false,
                description: null,
                length: 0,
                pageInfo: this.extractPageInfo(content, filePath)
            };
        }

        const description = descMatch[1].trim();
        
        return {
            file: filePath,
            hasDescription: true,
            description: description,
            length: description.length,
            pageInfo: this.extractPageInfo(content, filePath)
        };
    }

    /**
     * Process description analysis results
     */
    processDescriptionAnalysis(analysis) {
        if (!analysis.hasDescription) {
            this.missing.push(analysis);
            return;
        }

        // Store description for duplicate checking
        if (!this.descriptions.has(analysis.description)) {
            this.descriptions.set(analysis.description, []);
        }
        this.descriptions.get(analysis.description).push(analysis);

        // Check if too long
        if (analysis.length > this.optimalLength) {
            this.tooLong.push(analysis);
        }
    }

    /**
     * Identify duplicate descriptions
     */
    identifyDuplicates() {
        this.descriptions.forEach((pages, description) => {
            if (pages.length > 1) {
                this.duplicates.push({
                    description: description,
                    length: description.length,
                    pages: pages,
                    count: pages.length
                });
            }
        });
    }

    /**
     * Extract page information for description generation
     */
    extractPageInfo(content, filePath) {
        const info = {
            fileName: path.basename(filePath, '.html'),
            title: '',
            h1: '',
            keywords: '',
            symbols: []
        };
        
        // Extract title
        const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/is);
        if (titleMatch) {
            info.title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
        }
        
        // Extract H1
        const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/is);
        if (h1Match) {
            info.h1 = h1Match[1].replace(/<[^>]*>/g, '').trim();
        }
        
        // Extract keywords
        const keywordsMatch = content.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i);
        if (keywordsMatch) {
            info.keywords = keywordsMatch[1].trim();
        }

        // Extract symbols from content (for symbol pages)
        const symbolMatches = content.match(/class=["']symbol["'][^>]*>([^<]+)</g);
        if (symbolMatches) {
            info.symbols = symbolMatches.slice(0, 10).map(match => {
                const symbolMatch = match.match(/>([^<]+)</);
                return symbolMatch ? symbolMatch[1].trim() : '';
            }).filter(s => s.length > 0);
        }
        
        return info;
    }

    /**
     * Generate optimized meta description
     */
    generateOptimizedDescription(pageInfo) {
        const fileName = pageInfo.fileName.toLowerCase();
        
        // Special cases for specific page types
        if (fileName === 'index') {
            return 'Copy and paste cool symbols, emojis, and special characters. Free collection of aesthetic symbols, arrows, hearts, stars, and text decorations.';
        }
        
        if (fileName === 'contact') {
            return 'Contact CoolSymbol for support, feedback, or questions about our symbol collection. Get help with copying symbols and suggest new features.';
        }
        
        if (fileName === 'privacy') {
            return 'Privacy Policy - Learn how CoolSymbol protects your data and maintains user privacy. Our commitment to data security and GDPR compliance.';
        }
        
        if (fileName === 'terms') {
            return 'Terms of Service - Read our terms and conditions for using CoolSymbol. Understand your rights and responsibilities when using our services.';
        }

        // Generate description based on page content
        let description = '';
        
        // Extract main topic from filename
        const topic = this.extractTopicFromFilename(fileName);
        
        // Add symbols if available
        if (pageInfo.symbols.length > 0) {
            const symbolList = pageInfo.symbols.slice(0, 8).join(' ');
            description = `${topic} copy paste ${symbolList} - `;
        } else {
            description = `${topic} copy paste - `;
        }
        
        // Add purpose/usage
        const usage = this.getUsageDescription(fileName);
        description += usage;
        
        // Ensure it's within optimal length
        if (description.length > this.optimalLength) {
            description = description.substring(0, this.optimalLength - 3) + '...';
        }
        
        return description;
    }

    /**
     * Extract topic from filename
     */
    extractTopicFromFilename(fileName) {
        const topicMap = {
            'heart-symbol': 'Heart symbols',
            'arrow-symbol': 'Arrow symbols',
            'star-symbol': 'Star symbols',
            'music-symbol': 'Music symbols',
            'circle-symbol': 'Circle symbols',
            'cross-symbol': 'Cross symbols',
            'crown-symbol': 'Crown symbols',
            'flower-symbol': 'Flower symbols',
            'moon-symbol': 'Moon symbols',
            'currency-symbol': 'Currency symbols',
            'lenny-face': 'Lenny face emoticons',
            'animal-emoji': 'Animal emojis',
            'aesthetic-symbols': 'Aesthetic symbols',
            'bubble-text': 'Bubble text generator',
            'cursive-letters': 'Cursive letters',
            'greek-alphabet': 'Greek alphabet symbols',
            'korean-symbols': 'Korean symbols',
            'chinese-symbol': 'Chinese symbols',
            'weather-symbol': 'Weather symbols',
            'zodiac-symbol': 'Zodiac symbols',
            'warning-symbol': 'Warning symbols',
            'weapon-symbol': 'Weapon symbols',
            'transport-symbol': 'Transport symbols',
            'trophy-medal': 'Trophy and medal symbols',
            'unit-symbol': 'Unit measurement symbols'
        };

        // Check for exact matches first
        if (topicMap[fileName]) {
            return topicMap[fileName];
        }

        // Check for partial matches
        for (const [key, value] of Object.entries(topicMap)) {
            if (fileName.includes(key.split('-')[0])) {
                return value;
            }
        }

        // Generate from filename
        return fileName
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace(/Symbol$/, 'symbols')
            .replace(/Face$/, 'faces');
    }

    /**
     * Get usage description for different symbol types
     */
    getUsageDescription(fileName) {
        if (fileName.includes('lenny') || fileName.includes('face')) {
            return 'emoticons for messaging, social media, and text decoration.';
        }
        
        if (fileName.includes('arrow')) {
            return 'directional arrows for navigation, design, and text formatting.';
        }
        
        if (fileName.includes('heart')) {
            return 'love symbols for romantic messages, social media, and decoration.';
        }
        
        if (fileName.includes('star')) {
            return 'star symbols for ratings, decoration, and special text formatting.';
        }
        
        if (fileName.includes('music')) {
            return 'musical notes and symbols for music lovers and social media.';
        }
        
        if (fileName.includes('weather')) {
            return 'weather icons for forecasts, social media, and text decoration.';
        }
        
        if (fileName.includes('zodiac')) {
            return 'astrology signs for horoscopes and social media bios.';
        }
        
        if (fileName.includes('currency')) {
            return 'money symbols for financial content and international communication.';
        }
        
        return 'special characters for social media, messaging, and text decoration.';
    }

    /**
     * Generate fixes for all issues
     */
    generateDescriptionFixes(directory) {
        const fixes = [];
        
        // Fix duplicates
        this.duplicates.forEach(duplicate => {
            duplicate.pages.forEach((page, index) => {
                if (index > 0) { // Keep first one, fix others
                    const newDescription = this.generateOptimizedDescription(page.pageInfo);
                    fixes.push({
                        file: page.file,
                        issue: 'duplicate',
                        oldDescription: page.description,
                        newDescription: newDescription,
                        oldLength: page.length,
                        newLength: newDescription.length
                    });
                }
            });
        });
        
        // Fix too long descriptions
        this.tooLong.forEach(page => {
            // Skip if already being fixed for duplicate
            if (!fixes.some(fix => fix.file === page.file)) {
                const newDescription = this.generateOptimizedDescription(page.pageInfo);
                fixes.push({
                    file: page.file,
                    issue: 'too_long',
                    oldDescription: page.description,
                    newDescription: newDescription,
                    oldLength: page.length,
                    newLength: newDescription.length
                });
            }
        });
        
        // Fix missing descriptions
        this.missing.forEach(page => {
            const newDescription = this.generateOptimizedDescription(page.pageInfo);
            fixes.push({
                file: page.file,
                issue: 'missing',
                oldDescription: null,
                newDescription: newDescription,
                oldLength: 0,
                newLength: newDescription.length
            });
        });
        
        return fixes;
    }

    /**
     * Apply description fixes to files
     */
    applyFixes(directory, fixes) {
        let appliedCount = 0;
        
        fixes.forEach(fix => {
            try {
                const filePath = path.join(directory, fix.file);
                let content = fs.readFileSync(filePath, 'utf8');
                
                if (fix.issue === 'missing') {
                    // Add meta description after charset or viewport
                    const insertAfter = content.match(/<meta\s+charset[^>]*>|<meta\s+name=["']viewport["'][^>]*>/i);
                    if (insertAfter) {
                        content = content.replace(
                            insertAfter[0],
                            `${insertAfter[0]}\n\t<meta name="description" content="${fix.newDescription}">`
                        );
                    } else {
                        // Insert after <head>
                        content = content.replace(
                            /<head[^>]*>/i,
                            `$&\n\t<meta name="description" content="${fix.newDescription}">`
                        );
                    }
                } else {
                    // Replace existing description
                    content = content.replace(
                        /<meta\s+name=["']description["']\s+content=["'][^"']*["']/i,
                        `<meta name="description" content="${fix.newDescription}"`
                    );
                }
                
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ Fixed meta description in ${fix.file}`);
                console.log(`   Length: ${fix.oldLength} → ${fix.newLength} characters`);
                
                this.fixes.push(fix);
                appliedCount++;
                
            } catch (error) {
                console.error(`❌ Error fixing ${fix.file}: ${error.message}`);
                this.errors.push(`Error fixing ${fix.file}: ${error.message}`);
            }
        });
        
        return appliedCount;
    }

    /**
     * Find all HTML files in directory
     */
    findHtmlFiles(directory) {
        const htmlFiles = [];
        
        const scanDirectory = (dir) => {
            const items = fs.readdirSync(dir);
            
            items.forEach(item => {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    scanDirectory(fullPath);
                } else if (item.endsWith('.html')) {
                    // Skip generated reports
                    if (!item.includes('report.html') && !item.includes('fixes-report.html')) {
                        htmlFiles.push(fullPath);
                    }
                }
            });
        };

        scanDirectory(directory);
        return htmlFiles;
    }

    /**
     * Generate analysis report
     */
    generateReport(results, directory) {
        const report = {
            timestamp: new Date().toISOString(),
            summary: results,
            duplicates: this.duplicates,
            tooLong: this.tooLong,
            missing: this.missing,
            appliedFixes: this.fixes,
            errors: this.errors,
            recommendations: [
                "Keep meta descriptions between 150-160 characters for optimal display",
                "Make each description unique and relevant to the page content",
                "Include target keywords naturally in descriptions",
                "Write compelling descriptions that encourage clicks",
                "Avoid duplicate descriptions across pages"
            ]
        };

        // Save JSON report
        fs.writeFileSync(
            path.join(directory, 'meta-description-report.json'),
            JSON.stringify(report, null, 2)
        );

        // Generate HTML report
        const htmlReport = this.generateHtmlReport(report);
        fs.writeFileSync(
            path.join(directory, 'meta-description-report.html'),
            htmlReport
        );

        return report;
    }

    /**
     * Generate HTML report
     */
    generateHtmlReport(report) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meta Description Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #dee2e6; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .stat-card { background: white; border: 1px solid #ddd; padding: 15px; border-radius: 5px; text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; }
        .duplicates { color: #fd7e14; }
        .too-long { color: #dc3545; }
        .missing { color: #6f42c1; }
        .fixed { color: #28a745; }
        .issue-item { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .issue-item.duplicate { background: #fff3cd; border-color: #ffeaa7; }
        .issue-item.too-long { background: #f8d7da; border-color: #f5c6cb; }
        .issue-item.missing { background: #e2e3f1; border-color: #c8c9e8; }
        .issue-item.fixed { background: #d4edda; border-color: #c3e6cb; }
        .file-name { font-weight: bold; color: #495057; margin-bottom: 10px; }
        .description { font-family: monospace; background: #e9ecef; padding: 8px; border-radius: 3px; margin: 5px 0; word-break: break-word; }
        .length-info { font-size: 0.9em; color: #6c757d; margin-top: 5px; }
        .recommendations { background: #e7f3ff; border: 1px solid #b8daff; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .recommendations h3 { margin-top: 0; color: #004085; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📝 Meta Description Analysis Report</h1>
        <p>Generated on: ${new Date(report.timestamp).toLocaleString()}</p>
        <p>Analysis of meta descriptions for duplicates, length issues, and missing descriptions.</p>
    </div>

    <div class="summary">
        <div class="stat-card">
            <div class="stat-number">${report.summary.totalFiles}</div>
            <div>Total Files</div>
        </div>
        <div class="stat-card">
            <div class="stat-number duplicates">${report.summary.duplicates}</div>
            <div>Duplicate Groups</div>
        </div>
        <div class="stat-card">
            <div class="stat-number too-long">${report.summary.tooLong}</div>
            <div>Too Long</div>
        </div>
        <div class="stat-card">
            <div class="stat-number missing">${report.summary.missing}</div>
            <div>Missing</div>
        </div>
        <div class="stat-card">
            <div class="stat-number fixed">${report.appliedFixes.length}</div>
            <div>Fixed</div>
        </div>
    </div>

    ${report.duplicates.length > 0 ? `
    <h2>🔄 Duplicate Meta Descriptions (${report.duplicates.length} groups)</h2>
    ${report.duplicates.map(dup => `
    <div class="issue-item duplicate">
        <div class="file-name">📄 Duplicate found in ${dup.count} pages:</div>
        <div class="description">${dup.description}</div>
        <div class="length-info">Length: ${dup.length} characters</div>
        <div style="margin-top: 10px;"><strong>Affected pages:</strong></div>
        <ul>
            ${dup.pages.map(page => `<li>${page.file}</li>`).join('')}
        </ul>
    </div>
    `).join('')}
    ` : ''}

    ${report.tooLong.length > 0 ? `
    <h2>📏 Descriptions Too Long (${report.tooLong.length})</h2>
    ${report.tooLong.map(page => `
    <div class="issue-item too-long">
        <div class="file-name">📄 ${page.file}</div>
        <div class="description">${page.description}</div>
        <div class="length-info">Length: ${page.length} characters (exceeds ${this.optimalLength} character limit)</div>
    </div>
    `).join('')}
    ` : ''}

    ${report.missing.length > 0 ? `
    <h2>❓ Missing Meta Descriptions (${report.missing.length})</h2>
    ${report.missing.map(page => `
    <div class="issue-item missing">
        <div class="file-name">📄 ${page.file}</div>
        <div>No meta description found</div>
    </div>
    `).join('')}
    ` : ''}

    ${report.appliedFixes.length > 0 ? `
    <h2>✅ Applied Fixes (${report.appliedFixes.length})</h2>
    ${report.appliedFixes.map(fix => `
    <div class="issue-item fixed">
        <div class="file-name">📄 ${fix.file} (${fix.issue})</div>
        ${fix.oldDescription ? `
        <div><strong>Before:</strong></div>
        <div class="description">${fix.oldDescription}</div>
        ` : '<div><strong>Before:</strong> No description</div>'}
        <div><strong>After:</strong></div>
        <div class="description">${fix.newDescription}</div>
        <div class="length-info">Length: ${fix.oldLength} → ${fix.newLength} characters</div>
    </div>
    `).join('')}
    ` : ''}

    <div class="recommendations">
        <h3>📋 Best Practices</h3>
        <ul>
            ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
    </div>

    ${report.errors.length > 0 ? `
    <h2>⚠️ Errors Encountered</h2>
    <ul>
        ${report.errors.map(error => `<li>${error}</li>`).join('')}
    </ul>
    ` : ''}

    <h2>📈 SEO Benefits</h2>
    <ul>
        <li><strong>Improved Click-Through Rates:</strong> Unique, compelling descriptions encourage more clicks</li>
        <li><strong>Better Search Visibility:</strong> Optimized descriptions help pages rank for relevant queries</li>
        <li><strong>Enhanced User Experience:</strong> Clear descriptions help users find what they're looking for</li>
        <li><strong>Reduced Bounce Rate:</strong> Accurate descriptions set proper expectations</li>
    </ul>
</body>
</html>`;
    }

    /**
     * Main execution function
     */
    async run(directory, autoFix = false) {
        try {
            console.log('🚀 Starting Meta Description Analysis...');
            
            const results = this.analyzeMetaDescriptions(directory);
            
            let fixes = [];
            if (results.duplicates > 0 || results.tooLong > 0 || results.missing > 0) {
                fixes = this.generateDescriptionFixes(directory);
                
                if (autoFix && fixes.length > 0) {
                    console.log('\n🔧 APPLYING FIXES...');
                    const appliedCount = this.applyFixes(directory, fixes);
                    console.log(`✅ Applied fixes to ${appliedCount} files`);
                }
            }
            
            const report = this.generateReport(results, directory);
            
            console.log('\n📊 ANALYSIS RESULTS');
            console.log('='.repeat(50));
            console.log(`Total files analyzed: ${results.totalFiles}`);
            console.log(`Duplicate description groups: ${results.duplicates}`);
            console.log(`Descriptions too long: ${results.tooLong}`);
            console.log(`Missing descriptions: ${results.missing}`);
            console.log(`Fixes applied: ${this.fixes.length}`);
            console.log(`Errors: ${results.errors}`);
            
            console.log('\n📄 Reports saved:');
            console.log('   - meta-description-report.json');
            console.log('   - meta-description-report.html');

            return report;

        } catch (error) {
            console.error('❌ Analysis failed:', error.message);
            throw error;
        }
    }
}

// CLI usage
if (require.main === module) {
    const directory = process.argv[2] || process.cwd();
    const autoFix = process.argv.includes('--fix');
    
    console.log(`Analyzing meta descriptions in: ${directory}`);
    if (autoFix) console.log('Auto-fix mode enabled');
    
    const analyzer = new MetaDescriptionAnalyzer();
    analyzer.run(directory, autoFix)
        .then(() => {
            console.log('\n✅ Meta description analysis completed successfully!');
            process.exit(0);
        })
        .catch(error => {
            console.error('\n❌ Analysis failed:', error.message);
            process.exit(1);
        });
}

module.exports = MetaDescriptionAnalyzer;
