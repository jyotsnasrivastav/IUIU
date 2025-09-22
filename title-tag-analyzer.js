#!/usr/bin/env node

/**
 * Title Tag Analyzer and Fixer
 * Identifies HTML files with missing or empty <title> tags
 * and generates appropriate titles based on page content
 */

const fs = require('fs');
const path = require('path');

class TitleTagAnalyzer {
    constructor() {
        this.missingTitles = [];
        this.emptyTitles = [];
        this.validTitles = [];
        this.errors = [];
    }

    /**
     * Analyze all HTML files for title tag issues
     */
    analyzeAllFiles(directory) {
        console.log('🔍 Analyzing title tags in HTML files...');
        
        const htmlFiles = this.findHtmlFiles(directory);
        
        htmlFiles.forEach(filePath => {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const relativePath = path.relative(directory, filePath);
                
                const titleAnalysis = this.analyzeTitleTag(content, relativePath);
                
                if (titleAnalysis.status === 'missing') {
                    this.missingTitles.push(titleAnalysis);
                } else if (titleAnalysis.status === 'empty') {
                    this.emptyTitles.push(titleAnalysis);
                } else {
                    this.validTitles.push(titleAnalysis);
                }
                
            } catch (error) {
                this.errors.push(`Error analyzing ${filePath}: ${error.message}`);
            }
        });

        return {
            total: htmlFiles.length,
            missing: this.missingTitles.length,
            empty: this.emptyTitles.length,
            valid: this.validTitles.length,
            errors: this.errors.length
        };
    }

    /**
     * Analyze title tag in HTML content
     */
    analyzeTitleTag(content, filePath) {
        // Check for title tag existence
        const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/is);
        
        if (!titleMatch) {
            return {
                file: filePath,
                status: 'missing',
                currentTitle: null,
                suggestedTitle: this.generateTitleFromContent(content, filePath),
                pageContent: this.extractPageInfo(content)
            };
        }

        const titleContent = titleMatch[1].trim();
        
        if (!titleContent || titleContent.length === 0) {
            return {
                file: filePath,
                status: 'empty',
                currentTitle: titleContent,
                suggestedTitle: this.generateTitleFromContent(content, filePath),
                pageContent: this.extractPageInfo(content)
            };
        }

        return {
            file: filePath,
            status: 'valid',
            currentTitle: titleContent,
            pageContent: this.extractPageInfo(content)
        };
    }

    /**
     * Generate appropriate title based on page content and filename
     */
    generateTitleFromContent(content, filePath) {
        const pageInfo = this.extractPageInfo(content);
        const fileName = path.basename(filePath, '.html');
        
        // Special cases for specific pages
        if (fileName === 'index') {
            return 'Cool Symbols Copy and Paste ❦ ༊*·╰⊱♥⊱╮ೃ⁀➷ | CoolSymbol';
        }
        
        if (fileName === 'contact') {
            return 'Contact Us - Cool Symbols | CoolSymbol';
        }
        
        if (fileName === 'privacy') {
            return 'Privacy Policy - Cool Symbols | CoolSymbol';
        }
        
        if (fileName === 'terms') {
            return 'Terms of Service - Cool Symbols | CoolSymbol';
        }

        // Generate title based on content patterns
        if (pageInfo.h1) {
            return `${pageInfo.h1} | CoolSymbol`;
        }
        
        if (pageInfo.metaDescription) {
            const desc = pageInfo.metaDescription.substring(0, 50);
            return `${desc}... | CoolSymbol`;
        }
        
        // Generate from filename
        const titleFromFile = this.generateTitleFromFileName(fileName);
        return `${titleFromFile} | CoolSymbol`;
    }

    /**
     * Generate title from filename
     */
    generateTitleFromFileName(fileName) {
        // Handle special patterns
        const patterns = {
            'lenny-face': 'Lenny Face Emoticons',
            'arrow-symbol': 'Arrow Symbols',
            'heart-symbol': 'Heart Symbols',
            'star-symbol': 'Star Symbols',
            'music-symbol': 'Music Symbols',
            'circle-symbol': 'Circle Symbols',
            'cross-symbol': 'Cross Symbols',
            'crown-symbol': 'Crown Symbols',
            'flower-symbol': 'Flower Symbols',
            'moon-symbol': 'Moon Symbols',
            'currency-symbol': 'Currency Symbols',
            'check-mark-symbol': 'Check Mark Symbols',
            'bullet-points-symbol': 'Bullet Point Symbols',
            'bracket-symbol': 'Bracket Symbols',
            'corner-symbols': 'Corner Symbols',
            'comparison-symbol': 'Comparison Symbols',
            'copyright-trademark-symbols': 'Copyright & Trademark Symbols',
            'cryptocurrency-symbols': 'Cryptocurrency Symbols',
            'chinese-symbol': 'Chinese Symbols',
            'korean-symbols': 'Korean Symbols',
            'greek-alphabet-symbol': 'Greek Alphabet Symbols',
            'aesthetic-symbols': 'Aesthetic Symbols',
            'cool-': 'Cool ',
            'animal-emoji': 'Animal Emojis',
            'bubble-text': 'Bubble Text Generator',
            'cursive-letters': 'Cursive Letters',
            'font-generator': 'Font Generator'
        };

        // Check for pattern matches
        for (const [pattern, replacement] of Object.entries(patterns)) {
            if (fileName.includes(pattern)) {
                if (pattern === 'cool-') {
                    return fileName.replace(/-/g, ' ')
                        .replace(/\b\w/g, l => l.toUpperCase())
                        .replace('Cool ', 'Cool ');
                }
                return replacement;
            }
        }

        // Default: convert kebab-case to title case
        return fileName
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace(/\bLenny\b/g, 'Lenny')
            .replace(/\bFace\b/g, 'Face')
            .replace(/\bSymbol\b/g, 'Symbols')
            .replace(/\bEmoji\b/g, 'Emojis');
    }

    /**
     * Extract page information for title generation
     */
    extractPageInfo(content) {
        const info = {};
        
        // Extract H1
        const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/is);
        if (h1Match) {
            info.h1 = h1Match[1].replace(/<[^>]*>/g, '').trim();
        }
        
        // Extract meta description
        const metaDescMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
        if (metaDescMatch) {
            info.metaDescription = metaDescMatch[1].trim();
        }
        
        // Extract keywords from meta
        const keywordsMatch = content.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i);
        if (keywordsMatch) {
            info.keywords = keywordsMatch[1].trim();
        }
        
        return info;
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
     * Generate fixes for missing/empty titles
     */
    generateTitleFixes(directory) {
        const fixes = [];
        
        [...this.missingTitles, ...this.emptyTitles].forEach(item => {
            const filePath = path.join(directory, item.file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            let newContent;
            if (item.status === 'missing') {
                // Add title tag after <head>
                newContent = content.replace(
                    /(<head[^>]*>)/i,
                    `$1\n\t<title>${item.suggestedTitle}</title>`
                );
            } else {
                // Replace empty title
                newContent = content.replace(
                    /<title[^>]*><\/title>/i,
                    `<title>${item.suggestedTitle}</title>`
                );
            }
            
            fixes.push({
                file: item.file,
                oldTitle: item.currentTitle,
                newTitle: item.suggestedTitle,
                content: newContent
            });
        });
        
        return fixes;
    }

    /**
     * Apply title fixes to files
     */
    applyFixes(directory, fixes) {
        let appliedCount = 0;
        
        fixes.forEach(fix => {
            try {
                const filePath = path.join(directory, fix.file);
                fs.writeFileSync(filePath, fix.content, 'utf8');
                console.log(`✅ Fixed title in ${fix.file}`);
                console.log(`   New title: ${fix.newTitle}`);
                appliedCount++;
            } catch (error) {
                console.error(`❌ Error fixing ${fix.file}: ${error.message}`);
                this.errors.push(`Error fixing ${fix.file}: ${error.message}`);
            }
        });
        
        return appliedCount;
    }

    /**
     * Generate analysis report
     */
    generateReport(results, directory) {
        const report = {
            timestamp: new Date().toISOString(),
            summary: results,
            missingTitles: this.missingTitles,
            emptyTitles: this.emptyTitles,
            validTitles: this.validTitles.slice(0, 10), // Show first 10 valid titles
            errors: this.errors
        };

        // Save JSON report
        fs.writeFileSync(
            path.join(directory, 'title-analysis-report.json'),
            JSON.stringify(report, null, 2)
        );

        // Generate HTML report
        const htmlReport = this.generateHtmlReport(report);
        fs.writeFileSync(
            path.join(directory, 'title-analysis-report.html'),
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
    <title>Title Tag Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #dee2e6; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .stat-card { background: white; border: 1px solid #ddd; padding: 15px; border-radius: 5px; text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; }
        .missing { color: #dc3545; }
        .empty { color: #fd7e14; }
        .valid { color: #28a745; }
        .issue-item { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .issue-item.missing { background: #f8d7da; border-color: #f5c6cb; }
        .file-name { font-weight: bold; color: #495057; }
        .suggested-title { font-family: monospace; background: #e9ecef; padding: 5px; border-radius: 3px; margin: 5px 0; }
        .page-info { font-size: 0.9em; color: #6c757d; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📋 Title Tag Analysis Report</h1>
        <p>Generated on: ${new Date(report.timestamp).toLocaleString()}</p>
        <p>Analysis of HTML files for missing or empty &lt;title&gt; tags.</p>
    </div>

    <div class="summary">
        <div class="stat-card">
            <div class="stat-number">${report.summary.total}</div>
            <div>Total Files</div>
        </div>
        <div class="stat-card">
            <div class="stat-number missing">${report.summary.missing}</div>
            <div>Missing Titles</div>
        </div>
        <div class="stat-card">
            <div class="stat-number empty">${report.summary.empty}</div>
            <div>Empty Titles</div>
        </div>
        <div class="stat-card">
            <div class="stat-number valid">${report.summary.valid}</div>
            <div>Valid Titles</div>
        </div>
    </div>

    ${report.missingTitles.length > 0 ? `
    <h2>❌ Files with Missing Title Tags (${report.missingTitles.length})</h2>
    ${report.missingTitles.map(item => `
    <div class="issue-item missing">
        <div class="file-name">📄 ${item.file}</div>
        <div class="suggested-title"><strong>Suggested:</strong> ${item.suggestedTitle}</div>
        ${item.pageContent.h1 ? `<div class="page-info">H1: ${item.pageContent.h1}</div>` : ''}
        ${item.pageContent.metaDescription ? `<div class="page-info">Description: ${item.pageContent.metaDescription.substring(0, 100)}...</div>` : ''}
    </div>
    `).join('')}
    ` : ''}

    ${report.emptyTitles.length > 0 ? `
    <h2>⚠️ Files with Empty Title Tags (${report.emptyTitles.length})</h2>
    ${report.emptyTitles.map(item => `
    <div class="issue-item">
        <div class="file-name">📄 ${item.file}</div>
        <div class="suggested-title"><strong>Suggested:</strong> ${item.suggestedTitle}</div>
        ${item.pageContent.h1 ? `<div class="page-info">H1: ${item.pageContent.h1}</div>` : ''}
        ${item.pageContent.metaDescription ? `<div class="page-info">Description: ${item.pageContent.metaDescription.substring(0, 100)}...</div>` : ''}
    </div>
    `).join('')}
    ` : ''}

    ${report.summary.missing === 0 && report.summary.empty === 0 ? `
    <h2>✅ All Title Tags Are Present and Valid!</h2>
    <p>No missing or empty title tags were found. All ${report.summary.total} HTML files have proper titles.</p>
    ` : ''}

    ${report.errors.length > 0 ? `
    <h2>⚠️ Errors Encountered</h2>
    <ul>
        ${report.errors.map(error => `<li>${error}</li>`).join('')}
    </ul>
    ` : ''}
</body>
</html>`;
    }

    /**
     * Main execution function
     */
    async run(directory, autoFix = false) {
        try {
            console.log('🚀 Starting Title Tag Analysis...');
            
            const results = this.analyzeAllFiles(directory);
            const report = this.generateReport(results, directory);
            
            console.log('\n📊 ANALYSIS RESULTS');
            console.log('='.repeat(50));
            console.log(`Total files analyzed: ${results.total}`);
            console.log(`Missing title tags: ${results.missing}`);
            console.log(`Empty title tags: ${results.empty}`);
            console.log(`Valid title tags: ${results.valid}`);
            console.log(`Errors: ${results.errors}`);
            
            if (autoFix && (results.missing > 0 || results.empty > 0)) {
                console.log('\n🔧 APPLYING FIXES...');
                const fixes = this.generateTitleFixes(directory);
                const appliedCount = this.applyFixes(directory, fixes);
                console.log(`✅ Applied fixes to ${appliedCount} files`);
            }
            
            console.log('\n📄 Reports saved:');
            console.log('   - title-analysis-report.json');
            console.log('   - title-analysis-report.html');

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
    
    console.log(`Analyzing title tags in: ${directory}`);
    if (autoFix) console.log('Auto-fix mode enabled');
    
    const analyzer = new TitleTagAnalyzer();
    analyzer.run(directory, autoFix)
        .then(() => {
            console.log('\n✅ Title tag analysis completed successfully!');
            process.exit(0);
        })
        .catch(error => {
            console.error('\n❌ Analysis failed:', error.message);
            process.exit(1);
        });
}

module.exports = TitleTagAnalyzer;
