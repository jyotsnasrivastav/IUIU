#!/usr/bin/env node

/**
 * NoIndex Directive Analyzer and Fixer
 * Identifies and fixes inappropriate noindex directives that prevent
 * important pages from being indexed by search engines
 */

const fs = require('fs');
const path = require('path');

class NoIndexAnalyzer {
    constructor() {
        this.noindexPages = [];
        this.fixedPages = [];
        this.errors = [];
    }

    /**
     * Analyze all HTML files for noindex directives
     */
    analyzeNoIndexDirectives(directory) {
        console.log('🔍 Analyzing noindex directives in HTML files...');
        
        const htmlFiles = this.findHtmlFiles(directory);
        
        htmlFiles.forEach(filePath => {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const relativePath = path.relative(directory, filePath);
                
                const noindexAnalysis = this.analyzePageForNoIndex(content, relativePath);
                
                if (noindexAnalysis.hasNoIndex) {
                    this.noindexPages.push(noindexAnalysis);
                }
                
            } catch (error) {
                this.errors.push(`Error analyzing ${filePath}: ${error.message}`);
            }
        });

        return {
            totalFiles: htmlFiles.length,
            noindexPages: this.noindexPages.length,
            errors: this.errors.length
        };
    }

    /**
     * Analyze a page for noindex directives
     */
    analyzePageForNoIndex(content, filePath) {
        const noindexMatch = content.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*noindex[^"']*)["']/i);
        
        if (!noindexMatch) {
            return { file: filePath, hasNoIndex: false };
        }

        const robotsContent = noindexMatch[1];
        const fileName = path.basename(filePath, '.html');
        
        return {
            file: filePath,
            hasNoIndex: true,
            robotsDirective: robotsContent,
            shouldBeIndexed: this.shouldPageBeIndexed(fileName, content),
            pageType: this.determinePageType(fileName, content),
            recommendation: this.getIndexingRecommendation(fileName, content)
        };
    }

    /**
     * Determine if a page should be indexed based on its content and purpose
     */
    shouldPageBeIndexed(fileName, content) {
        // Pages that should typically be indexed
        const shouldIndex = [
            'contact',    // Contact pages help with local SEO and user trust
            'privacy',    // Privacy policies are required and show legitimacy
            'terms',      // Terms of service show legitimacy and legal compliance
            'about',      // About pages are important for SEO
            'sitemap',    // HTML sitemaps help with SEO
            'help',       // Help pages provide value to users
            'faq'         // FAQ pages target long-tail keywords
        ];

        // Pages that should typically NOT be indexed
        const shouldNotIndex = [
            'thank-you',  // Thank you pages after form submissions
            'error',      // Error pages
            '404',        // 404 pages
            'search',     // Search result pages
            'login',      // Login pages
            'admin',      // Admin pages
            'test',       // Test pages
            'temp',       // Temporary pages
            'draft'       // Draft pages
        ];

        const lowerFileName = fileName.toLowerCase();
        
        if (shouldIndex.some(keyword => lowerFileName.includes(keyword))) {
            return true;
        }
        
        if (shouldNotIndex.some(keyword => lowerFileName.includes(keyword))) {
            return false;
        }

        // Check content for indicators
        if (content.includes('form') && content.includes('submit')) {
            // Forms might be valuable for indexing
            return true;
        }

        // Default: most content pages should be indexed
        return true;
    }

    /**
     * Determine the type of page
     */
    determinePageType(fileName, content) {
        const lowerFileName = fileName.toLowerCase();
        
        if (lowerFileName.includes('contact')) return 'Contact Page';
        if (lowerFileName.includes('privacy')) return 'Privacy Policy';
        if (lowerFileName.includes('terms')) return 'Terms of Service';
        if (lowerFileName.includes('about')) return 'About Page';
        if (lowerFileName.includes('help')) return 'Help Page';
        if (lowerFileName.includes('faq')) return 'FAQ Page';
        if (lowerFileName.includes('sitemap')) return 'Sitemap Page';
        
        return 'Content Page';
    }

    /**
     * Get indexing recommendation
     */
    getIndexingRecommendation(fileName, content) {
        const shouldIndex = this.shouldPageBeIndexed(fileName, content);
        const pageType = this.determinePageType(fileName, content);
        
        if (shouldIndex) {
            const reasons = [];
            
            if (fileName.includes('contact')) {
                reasons.push('Contact pages improve local SEO and user trust');
                reasons.push('Helps users find ways to reach your business');
            }
            
            if (fileName.includes('privacy')) {
                reasons.push('Privacy policies demonstrate legitimacy and compliance');
                reasons.push('Required for GDPR and other privacy regulations');
                reasons.push('Builds user trust and confidence');
            }
            
            if (fileName.includes('terms')) {
                reasons.push('Terms of service show legal compliance');
                reasons.push('Demonstrates professional business practices');
                reasons.push('Required for many business operations');
            }
            
            return {
                action: 'REMOVE_NOINDEX',
                reasons: reasons.length > 0 ? reasons : ['This page provides value to users and should be discoverable'],
                newDirective: 'index, follow'
            };
        } else {
            return {
                action: 'KEEP_NOINDEX',
                reasons: ['This page type typically should not be indexed'],
                newDirective: 'noindex, nofollow'
            };
        }
    }

    /**
     * Generate fixes for inappropriate noindex directives
     */
    generateNoIndexFixes(directory) {
        const fixes = [];
        
        this.noindexPages.forEach(page => {
            if (page.recommendation.action === 'REMOVE_NOINDEX') {
                const filePath = path.join(directory, page.file);
                const content = fs.readFileSync(filePath, 'utf8');
                
                // Replace noindex with index, follow
                const newContent = content.replace(
                    /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex[^"']*["']/gi,
                    `<meta name="robots" content="${page.recommendation.newDirective}">`
                );
                
                fixes.push({
                    file: page.file,
                    pageType: page.pageType,
                    oldDirective: page.robotsDirective,
                    newDirective: page.recommendation.newDirective,
                    reasons: page.recommendation.reasons,
                    content: newContent
                });
            }
        });
        
        return fixes;
    }

    /**
     * Apply noindex fixes to files
     */
    applyFixes(directory, fixes) {
        let appliedCount = 0;
        
        fixes.forEach(fix => {
            try {
                const filePath = path.join(directory, fix.file);
                fs.writeFileSync(filePath, fix.content, 'utf8');
                console.log(`✅ Fixed noindex directive in ${fix.file}`);
                console.log(`   ${fix.oldDirective} → ${fix.newDirective}`);
                this.fixedPages.push(fix);
                appliedCount++;
            } catch (error) {
                console.error(`❌ Error fixing ${fix.file}: ${error.message}`);
                this.errors.push(`Error fixing ${fix.file}: ${error.message}`);
            }
        });
        
        return appliedCount;
    }

    /**
     * Check robots.txt for conflicts
     */
    checkRobotsTxtConflicts(directory) {
        const robotsTxtPath = path.join(directory, 'robots.txt');
        const conflicts = [];
        
        if (fs.existsSync(robotsTxtPath)) {
            const robotsTxtContent = fs.readFileSync(robotsTxtPath, 'utf8');
            
            this.noindexPages.forEach(page => {
                const pagePath = '/' + page.file.replace(/\\/g, '/');
                
                // Check if the page is disallowed in robots.txt
                const disallowPattern = new RegExp(`^Disallow:\\s*${pagePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'mi');
                
                if (disallowPattern.test(robotsTxtContent)) {
                    conflicts.push({
                        file: page.file,
                        issue: 'Page is both noindex and disallowed in robots.txt',
                        recommendation: 'Remove from robots.txt disallow list to let search engines see the noindex directive'
                    });
                }
            });
        }
        
        return conflicts;
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
    generateReport(results, directory, fixes, conflicts) {
        const report = {
            timestamp: new Date().toISOString(),
            summary: results,
            noindexPages: this.noindexPages,
            appliedFixes: this.fixedPages,
            robotsTxtConflicts: conflicts,
            errors: this.errors,
            recommendations: this.generateRecommendations()
        };

        // Save JSON report
        fs.writeFileSync(
            path.join(directory, 'noindex-analysis-report.json'),
            JSON.stringify(report, null, 2)
        );

        // Generate HTML report
        const htmlReport = this.generateHtmlReport(report);
        fs.writeFileSync(
            path.join(directory, 'noindex-analysis-report.html'),
            htmlReport
        );

        return report;
    }

    /**
     * Generate recommendations
     */
    generateRecommendations() {
        return [
            "Review each noindex directive to ensure it's intentional",
            "Contact, Privacy, and Terms pages should typically be indexed",
            "Monitor search console for indexing status changes",
            "Ensure robots.txt doesn't block pages with noindex directives",
            "Consider the SEO value of each page before applying noindex"
        ];
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
    <title>NoIndex Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #dee2e6; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .stat-card { background: white; border: 1px solid #ddd; padding: 15px; border-radius: 5px; text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; color: #dc3545; }
        .page-item { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .page-item.fixed { background: #d4edda; border-color: #c3e6cb; }
        .page-item.conflict { background: #f8d7da; border-color: #f5c6cb; }
        .file-name { font-weight: bold; color: #495057; margin-bottom: 10px; }
        .directive { font-family: monospace; background: #e9ecef; padding: 5px; border-radius: 3px; margin: 5px 0; }
        .reasons { margin: 10px 0; }
        .reasons li { margin: 5px 0; color: #495057; }
        .recommendation { background: #e7f3ff; border: 1px solid #b8daff; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .recommendation h3 { margin-top: 0; color: #004085; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚫 NoIndex Directive Analysis Report</h1>
        <p>Generated on: ${new Date(report.timestamp).toLocaleString()}</p>
        <p>Analysis of HTML files for noindex directives that may prevent important pages from being indexed.</p>
    </div>

    <div class="summary">
        <div class="stat-card">
            <div class="stat-number">${report.summary.totalFiles}</div>
            <div>Total Files</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${report.summary.noindexPages}</div>
            <div>Pages with NoIndex</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${report.appliedFixes.length}</div>
            <div>Fixes Applied</div>
        </div>
    </div>

    ${report.noindexPages.length > 0 ? `
    <h2>📋 Pages with NoIndex Directives (${report.noindexPages.length})</h2>
    ${report.noindexPages.map(page => `
    <div class="page-item ${report.appliedFixes.some(fix => fix.file === page.file) ? 'fixed' : ''}">
        <div class="file-name">📄 ${page.file} (${page.pageType})</div>
        <div class="directive"><strong>Current:</strong> ${page.robotsDirective}</div>
        ${page.recommendation.action === 'REMOVE_NOINDEX' ? `
        <div class="directive"><strong>Recommended:</strong> ${page.recommendation.newDirective}</div>
        <div class="reasons">
            <strong>Why this page should be indexed:</strong>
            <ul>
                ${page.recommendation.reasons.map(reason => `<li>${reason}</li>`).join('')}
            </ul>
        </div>
        ` : `
        <div class="reasons">
            <strong>Why noindex is appropriate:</strong>
            <ul>
                ${page.recommendation.reasons.map(reason => `<li>${reason}</li>`).join('')}
            </ul>
        </div>
        `}
    </div>
    `).join('')}
    ` : '<h2>✅ No NoIndex Directives Found</h2>'}

    ${report.appliedFixes.length > 0 ? `
    <h2>✅ Fixes Applied (${report.appliedFixes.length})</h2>
    ${report.appliedFixes.map(fix => `
    <div class="page-item fixed">
        <div class="file-name">📄 ${fix.file} (${fix.pageType})</div>
        <div class="directive"><strong>Before:</strong> ${fix.oldDirective}</div>
        <div class="directive"><strong>After:</strong> ${fix.newDirective}</div>
        <div class="reasons">
            <strong>Benefits:</strong>
            <ul>
                ${fix.reasons.map(reason => `<li>${reason}</li>`).join('')}
            </ul>
        </div>
    </div>
    `).join('')}
    ` : ''}

    ${report.robotsTxtConflicts.length > 0 ? `
    <h2>⚠️ Robots.txt Conflicts (${report.robotsTxtConflicts.length})</h2>
    ${report.robotsTxtConflicts.map(conflict => `
    <div class="page-item conflict">
        <div class="file-name">📄 ${conflict.file}</div>
        <div><strong>Issue:</strong> ${conflict.issue}</div>
        <div><strong>Recommendation:</strong> ${conflict.recommendation}</div>
    </div>
    `).join('')}
    ` : ''}

    <div class="recommendation">
        <h3>📋 General Recommendations</h3>
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

    <h2>📈 SEO Impact</h2>
    <ul>
        <li><strong>Improved Discoverability:</strong> Important pages can now be found in search results</li>
        <li><strong>Better User Experience:</strong> Users can find contact and legal information through search</li>
        <li><strong>Enhanced Trust:</strong> Indexed privacy and terms pages demonstrate legitimacy</li>
        <li><strong>Local SEO Benefits:</strong> Contact pages help with local search rankings</li>
    </ul>
</body>
</html>`;
    }

    /**
     * Main execution function
     */
    async run(directory, autoFix = false) {
        try {
            console.log('🚀 Starting NoIndex Analysis...');
            
            const results = this.analyzeNoIndexDirectives(directory);
            const conflicts = this.checkRobotsTxtConflicts(directory);
            
            let fixes = [];
            if (results.noindexPages > 0) {
                fixes = this.generateNoIndexFixes(directory);
                
                if (autoFix && fixes.length > 0) {
                    console.log('\n🔧 APPLYING FIXES...');
                    const appliedCount = this.applyFixes(directory, fixes);
                    console.log(`✅ Applied fixes to ${appliedCount} files`);
                }
            }
            
            const report = this.generateReport(results, directory, fixes, conflicts);
            
            console.log('\n📊 ANALYSIS RESULTS');
            console.log('='.repeat(50));
            console.log(`Total files analyzed: ${results.totalFiles}`);
            console.log(`Pages with noindex: ${results.noindexPages}`);
            console.log(`Fixes available: ${fixes.length}`);
            console.log(`Fixes applied: ${this.fixedPages.length}`);
            console.log(`Robots.txt conflicts: ${conflicts.length}`);
            console.log(`Errors: ${results.errors}`);
            
            console.log('\n📄 Reports saved:');
            console.log('   - noindex-analysis-report.json');
            console.log('   - noindex-analysis-report.html');

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
    
    console.log(`Analyzing noindex directives in: ${directory}`);
    if (autoFix) console.log('Auto-fix mode enabled');
    
    const analyzer = new NoIndexAnalyzer();
    analyzer.run(directory, autoFix)
        .then(() => {
            console.log('\n✅ NoIndex analysis completed successfully!');
            process.exit(0);
        })
        .catch(error => {
            console.error('\n❌ Analysis failed:', error.message);
            process.exit(1);
        });
}

module.exports = NoIndexAnalyzer;
