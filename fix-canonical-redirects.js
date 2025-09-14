#!/usr/bin/env node

/**
 * Canonical URL Redirect Fixer
 * Automatically fixes canonical URLs that return 3XX redirects
 * by updating them to point to the final destination URL
 */

const fs = require('fs');
const path = require('path');

class CanonicalRedirectFixer {
    constructor() {
        this.fixedFiles = [];
        this.errors = [];
    }

    /**
     * Fix canonical URLs that redirect from non-www to www
     */
    fixRedirectingCanonicals(directory) {
        console.log('🔧 Starting canonical URL redirect fixes...');
        
        // Define the redirect mappings based on our analysis
        const redirectFixes = [
            {
                from: 'https://symbolsemoji.com/',
                to: 'https://www.symbolsemoji.com/',
                reason: '301 redirect from non-www to www'
            }
        ];

        const htmlFiles = this.findHtmlFiles(directory);
        let totalFixed = 0;

        htmlFiles.forEach(filePath => {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                let modified = false;
                const relativePath = path.relative(directory, filePath);

                redirectFixes.forEach(fix => {
                    // Fix canonical URLs
                    const canonicalRegex = new RegExp(
                        `(<link\\s+rel=["']canonical["']\\s+href=["'])${this.escapeRegex(fix.from)}(["'])`,
                        'gi'
                    );
                    
                    if (canonicalRegex.test(content)) {
                        content = content.replace(canonicalRegex, `$1${fix.to}$2`);
                        modified = true;
                        console.log(`✅ Fixed canonical URL in ${relativePath}`);
                        console.log(`   ${fix.from} → ${fix.to}`);
                    }

                    // Also fix other references in structured data, og:url, etc.
                    const urlReferences = [
                        // JSON-LD structured data
                        /"url":\s*"https:\/\/symbolsemoji\.com\/"/g,
                        /"@id":\s*"https:\/\/symbolsemoji\.com\/#website"/g,
                        /"target":\s*"https:\/\/symbolsemoji\.com\/\?q=/g,
                        // Open Graph URLs
                        /(<meta\s+property=["']og:url["']\s+content=["'])https:\/\/symbolsemoji\.com\/(["'])/gi,
                        // Twitter URLs  
                        /(<meta\s+property=["']twitter:url["']\s+content=["'])https:\/\/symbolsemoji\.com\/(["'])/gi,
                        // Other meta references
                        /(<meta\s+property=["']og:image["']\s+content=["'])https:\/\/symbolsemoji\.com\//gi
                    ];

                    urlReferences.forEach(regex => {
                        if (regex.test(content)) {
                            if (regex.source.includes('og:image') || regex.source.includes('"target"')) {
                                // For image URLs and search targets, keep the full path
                                content = content.replace(regex, (match) => {
                                    return match.replace('https://symbolsemoji.com/', 'https://www.symbolsemoji.com/');
                                });
                            } else if (regex.source.includes('@id')) {
                                // For @id references
                                content = content.replace(regex, '"@id": "https://www.symbolsemoji.com/#website"');
                            } else if (regex.source.includes('"url"')) {
                                // For JSON-LD url references
                                content = content.replace(regex, '"url": "https://www.symbolsemoji.com/"');
                            } else {
                                // For og:url and twitter:url
                                content = content.replace(regex, '$1https://www.symbolsemoji.com/$2');
                            }
                            modified = true;
                        }
                    });
                });

                if (modified) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    this.fixedFiles.push({
                        file: relativePath,
                        fixes: redirectFixes.filter(fix => 
                            fs.readFileSync(filePath, 'utf8').includes(fix.from)
                        )
                    });
                    totalFixed++;
                }

            } catch (error) {
                this.errors.push(`Error processing ${filePath}: ${error.message}`);
                console.error(`❌ Error processing ${filePath}: ${error.message}`);
            }
        });

        return {
            totalFiles: htmlFiles.length,
            fixedFiles: totalFixed,
            fixes: this.fixedFiles,
            errors: this.errors
        };
    }

    /**
     * Escape special regex characters
     */
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
                    htmlFiles.push(fullPath);
                }
            });
        };

        scanDirectory(directory);
        return htmlFiles;
    }

    /**
     * Generate a report of the fixes applied
     */
    generateFixReport(results, directory) {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalFilesScanned: results.totalFiles,
                filesFixed: results.fixedFiles,
                errorsEncountered: results.errors.length
            },
            fixesApplied: results.fixes,
            errors: results.errors,
            recommendations: [
                "Verify that all fixed URLs return 200 OK responses",
                "Update any internal links to use the canonical URL format",
                "Consider implementing proper redirects at the server level",
                "Monitor search console for any indexing issues after the changes"
            ]
        };

        // Save JSON report
        fs.writeFileSync(
            path.join(directory, 'canonical-fixes-report.json'),
            JSON.stringify(report, null, 2)
        );

        // Generate HTML report
        const htmlReport = this.generateHtmlFixReport(report);
        fs.writeFileSync(
            path.join(directory, 'canonical-fixes-report.html'),
            htmlReport
        );

        return report;
    }

    /**
     * Generate HTML report for fixes
     */
    generateHtmlFixReport(report) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canonical URL Fixes Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { background: #d4edda; padding: 20px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #c3e6cb; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .stat-card { background: white; border: 1px solid #ddd; padding: 15px; border-radius: 5px; text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; color: #28a745; }
        .stat-label { color: #666; font-size: 0.9em; }
        .fix-item { background: #f8f9fa; border: 1px solid #dee2e6; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .fix-item h4 { margin: 0 0 10px 0; color: #495057; }
        .url-change { font-family: monospace; background: #e9ecef; padding: 5px; border-radius: 3px; }
        .before { color: #dc3545; }
        .after { color: #28a745; }
        .recommendations { background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 5px; }
        .recommendations h3 { margin-top: 0; color: #856404; }
        .recommendations ul { padding-left: 20px; }
        .recommendations li { margin: 10px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>✅ Canonical URL Fixes Applied</h1>
        <p>Report generated on: ${new Date(report.timestamp).toLocaleString()}</p>
        <p>All canonical URLs that were returning 3XX redirects have been updated to point directly to their final destination URLs.</p>
    </div>

    <div class="summary">
        <div class="stat-card">
            <div class="stat-number">${report.summary.totalFilesScanned}</div>
            <div class="stat-label">Files Scanned</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${report.summary.filesFixed}</div>
            <div class="stat-label">Files Fixed</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${report.summary.errorsEncountered}</div>
            <div class="stat-label">Errors</div>
        </div>
    </div>

    ${report.fixesApplied.length > 0 ? `
    <h2>🔧 Files Fixed</h2>
    ${report.fixesApplied.map(fix => `
    <div class="fix-item">
        <h4>📄 ${fix.file}</h4>
        <p><strong>Canonical URL updated:</strong></p>
        <div class="url-change">
            <div class="before">❌ Before: https://symbolsemoji.com/</div>
            <div class="after">✅ After:  https://www.symbolsemoji.com/</div>
        </div>
        <p><small>This change eliminates the 301 redirect and improves SEO performance.</small></p>
    </div>
    `).join('')}
    ` : '<h2>ℹ️ No fixes were needed - all canonical URLs were already correct!</h2>'}

    ${report.errors.length > 0 ? `
    <h2>⚠️ Errors Encountered</h2>
    <ul>
        ${report.errors.map(error => `<li>${error}</li>`).join('')}
    </ul>
    ` : ''}

    <div class="recommendations">
        <h3>📋 Next Steps & Recommendations</h3>
        <ul>
            ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
    </div>

    <h2>📈 SEO Benefits</h2>
    <ul>
        <li><strong>Improved crawl efficiency:</strong> Search engines no longer need to follow redirects</li>
        <li><strong>Faster page loading:</strong> Eliminates redirect latency for canonical URLs</li>
        <li><strong>Clearer signals:</strong> Direct canonical URLs provide stronger SEO signals</li>
        <li><strong>Reduced crawl budget waste:</strong> Search engines can focus on content instead of redirects</li>
    </ul>
</body>
</html>`;
    }

    /**
     * Main execution function
     */
    async run(directory) {
        try {
            console.log('🚀 Starting Canonical URL Redirect Fixes...');
            
            const results = this.fixRedirectingCanonicals(directory);
            const report = this.generateFixReport(results, directory);
            
            console.log('\n📊 FIX RESULTS');
            console.log('='.repeat(50));
            console.log(`Files scanned: ${results.totalFiles}`);
            console.log(`Files fixed: ${results.fixedFiles}`);
            console.log(`Errors: ${results.errors.length}`);
            
            if (results.fixedFiles > 0) {
                console.log('\n✅ FIXES APPLIED:');
                this.fixedFiles.forEach((fix, index) => {
                    console.log(`${index + 1}. ${fix.file}`);
                });
            } else {
                console.log('\n✅ No fixes needed - all canonical URLs are already correct!');
            }

            console.log('\n📄 Reports saved:');
            console.log('   - canonical-fixes-report.json');
            console.log('   - canonical-fixes-report.html');

            return report;

        } catch (error) {
            console.error('❌ Fix process failed:', error.message);
            throw error;
        }
    }
}

// CLI usage
if (require.main === module) {
    const directory = process.argv[2] || process.cwd();
    
    console.log(`Fixing canonical redirects in: ${directory}`);
    
    const fixer = new CanonicalRedirectFixer();
    fixer.run(directory)
        .then(() => {
            console.log('\n✅ Canonical URL fixes completed successfully!');
            process.exit(0);
        })
        .catch(error => {
            console.error('\n❌ Fix process failed:', error.message);
            process.exit(1);
        });
}

module.exports = CanonicalRedirectFixer;
