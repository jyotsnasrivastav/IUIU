#!/usr/bin/env node

/**
 * Canonical URL Checker Tool
 * Identifies canonical URLs that return 3XX redirect responses
 * and provides recommendations for fixing them.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

class CanonicalURLChecker {
    constructor() {
        this.results = [];
        this.errors = [];
        this.redirectChains = new Map();
    }

    /**
     * Extract canonical URLs from HTML files
     */
    extractCanonicalUrls(directory) {
        const canonicalUrls = new Map();
        const htmlFiles = this.findHtmlFiles(directory);

        htmlFiles.forEach(filePath => {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
                
                if (canonicalMatch) {
                    const canonicalUrl = canonicalMatch[1].trim();
                    const relativePath = path.relative(directory, filePath);
                    
                    // Validate URL format before adding
                    try {
                        new URL(canonicalUrl);
                        canonicalUrls.set(relativePath, canonicalUrl);
                    } catch (urlError) {
                        this.errors.push(`Invalid canonical URL in ${relativePath}: ${canonicalUrl}`);
                    }
                }
            } catch (error) {
                this.errors.push(`Error reading ${filePath}: ${error.message}`);
            }
        });

        return canonicalUrls;
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
     * Check HTTP response code for a URL
     */
    async checkUrlStatus(url, maxRedirects = 5) {
        return new Promise((resolve) => {
            const redirectChain = [];
            let currentUrl = url;
            let redirectCount = 0;

            const makeRequest = (requestUrl) => {
                let urlObj;
                try {
                    urlObj = new URL(requestUrl);
                } catch (error) {
                    resolve({
                        error: `Invalid URL: ${requestUrl}`,
                        redirectChain,
                        finalStatusCode: null,
                        isRedirect: false,
                        finalUrl: requestUrl
                    });
                    return;
                }
                
                const client = urlObj.protocol === 'https:' ? https : http;
                
                const options = {
                    method: 'HEAD',
                    timeout: 10000,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                };

                const req = client.request(requestUrl, options, (res) => {
                    const statusCode = res.statusCode;
                    redirectChain.push({
                        url: requestUrl,
                        statusCode,
                        location: res.headers.location
                    });

                    if (statusCode >= 300 && statusCode < 400 && res.headers.location) {
                        redirectCount++;
                        if (redirectCount <= maxRedirects) {
                            const nextUrl = new URL(res.headers.location, requestUrl).href;
                            makeRequest(nextUrl);
                            return;
                        }
                    }

                    resolve({
                        finalStatusCode: statusCode,
                        redirectChain,
                        isRedirect: statusCode >= 300 && statusCode < 400,
                        finalUrl: requestUrl
                    });
                });

                req.on('error', (error) => {
                    resolve({
                        error: error.message,
                        redirectChain,
                        finalStatusCode: null,
                        isRedirect: false,
                        finalUrl: requestUrl
                    });
                });

                req.on('timeout', () => {
                    req.destroy();
                    resolve({
                        error: 'Request timeout',
                        redirectChain,
                        finalStatusCode: null,
                        isRedirect: false,
                        finalUrl: requestUrl
                    });
                });

                req.end();
            };

            makeRequest(currentUrl);
        });
    }

    /**
     * Analyze canonical URLs and check for redirects
     */
    async analyzeCanonicalUrls(directory) {
        console.log('🔍 Extracting canonical URLs from HTML files...');
        const canonicalUrls = this.extractCanonicalUrls(directory);
        
        console.log(`📊 Found ${canonicalUrls.size} canonical URLs to check`);
        
        const uniqueUrls = new Set(canonicalUrls.values());
        const urlChecks = [];

        for (const url of uniqueUrls) {
            urlChecks.push(this.checkUrlStatus(url));
        }

        console.log('🌐 Checking HTTP response codes...');
        const results = await Promise.all(urlChecks);
        
        // Map results back to files
        const urlToResult = new Map();
        let index = 0;
        for (const url of uniqueUrls) {
            urlToResult.set(url, results[index]);
            index++;
        }

        // Generate report
        const report = {
            totalFiles: canonicalUrls.size,
            totalUniqueUrls: uniqueUrls.size,
            redirectIssues: [],
            okUrls: [],
            errorUrls: [],
            summary: {}
        };

        canonicalUrls.forEach((canonicalUrl, filePath) => {
            const result = urlToResult.get(canonicalUrl);
            const issue = {
                filePath,
                canonicalUrl,
                ...result
            };

            if (result.error) {
                report.errorUrls.push(issue);
            } else if (result.isRedirect) {
                report.redirectIssues.push(issue);
            } else {
                report.okUrls.push(issue);
            }
        });

        // Generate summary statistics
        report.summary = {
            totalChecked: canonicalUrls.size,
            redirectIssues: report.redirectIssues.length,
            okUrls: report.okUrls.length,
            errorUrls: report.errorUrls.length,
            redirectPercentage: ((report.redirectIssues.length / canonicalUrls.size) * 100).toFixed(1)
        };

        return report;
    }

    /**
     * Generate fix recommendations
     */
    generateFixRecommendations(report) {
        const recommendations = [];

        report.redirectIssues.forEach(issue => {
            const finalUrl = issue.redirectChain[issue.redirectChain.length - 1];
            
            recommendations.push({
                file: issue.filePath,
                currentCanonical: issue.canonicalUrl,
                recommendedCanonical: finalUrl.url,
                statusCode: issue.finalStatusCode,
                redirectChain: issue.redirectChain.map(r => `${r.url} (${r.statusCode})`).join(' → '),
                fix: `Update canonical URL from "${issue.canonicalUrl}" to "${finalUrl.url}"`
            });
        });

        return recommendations;
    }

    /**
     * Generate HTML report
     */
    generateHtmlReport(report, recommendations) {
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canonical URL Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { background: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .stat-card { background: white; border: 1px solid #ddd; padding: 15px; border-radius: 5px; text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; color: #333; }
        .stat-label { color: #666; font-size: 0.9em; }
        .redirect-issues { background: #fff3cd; border: 1px solid #ffeaa7; }
        .ok-urls { background: #d4edda; border: 1px solid #c3e6cb; }
        .error-urls { background: #f8d7da; border: 1px solid #f5c6cb; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f8f9fa; font-weight: bold; }
        .redirect-chain { font-family: monospace; font-size: 0.9em; }
        .fix-action { background: #e7f3ff; padding: 10px; border-radius: 3px; margin: 5px 0; }
        .issue-high { border-left: 4px solid #dc3545; }
        .issue-medium { border-left: 4px solid #ffc107; }
        .issue-low { border-left: 4px solid #28a745; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔍 Canonical URL Analysis Report</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
        <p>This report identifies canonical URLs that return 3XX redirect responses and provides fix recommendations.</p>
    </div>

    <div class="summary">
        <div class="stat-card">
            <div class="stat-number">${report.summary.totalChecked}</div>
            <div class="stat-label">Total Files Checked</div>
        </div>
        <div class="stat-card redirect-issues">
            <div class="stat-number">${report.summary.redirectIssues}</div>
            <div class="stat-label">Redirect Issues Found</div>
        </div>
        <div class="stat-card ok-urls">
            <div class="stat-number">${report.summary.okUrls}</div>
            <div class="stat-label">URLs Returning 200 OK</div>
        </div>
        <div class="stat-card error-urls">
            <div class="stat-number">${report.summary.errorUrls}</div>
            <div class="stat-label">URLs with Errors</div>
        </div>
    </div>

    ${report.redirectIssues.length > 0 ? `
    <h2>🚨 Canonical URLs with Redirect Issues</h2>
    <p>These canonical URLs return 3XX redirect responses and should be updated to point to the final destination URL.</p>
    
    <table>
        <thead>
            <tr>
                <th>File</th>
                <th>Current Canonical URL</th>
                <th>Status Code</th>
                <th>Redirect Chain</th>
                <th>Recommended Fix</th>
            </tr>
        </thead>
        <tbody>
            ${recommendations.map(rec => `
            <tr class="issue-high">
                <td><code>${rec.file}</code></td>
                <td><a href="${rec.currentCanonical}" target="_blank">${rec.currentCanonical}</a></td>
                <td><strong>${rec.statusCode}</strong></td>
                <td class="redirect-chain">${rec.redirectChain}</td>
                <td class="fix-action">${rec.fix}</td>
            </tr>
            `).join('')}
        </tbody>
    </table>
    ` : '<h2>✅ No Redirect Issues Found</h2><p>All canonical URLs return appropriate 200 OK responses.</p>'}

    ${report.errorUrls.length > 0 ? `
    <h2>⚠️ URLs with Errors</h2>
    <table>
        <thead>
            <tr>
                <th>File</th>
                <th>Canonical URL</th>
                <th>Error</th>
            </tr>
        </thead>
        <tbody>
            ${report.errorUrls.map(error => `
            <tr>
                <td><code>${error.filePath}</code></td>
                <td>${error.canonicalUrl}</td>
                <td>${error.error}</td>
            </tr>
            `).join('')}
        </tbody>
    </table>
    ` : ''}

    <h2>📋 Best Practices for Canonical URLs</h2>
    <ul>
        <li><strong>Always use absolute URLs:</strong> Canonical URLs should be complete URLs with protocol and domain</li>
        <li><strong>Point to 200 OK pages:</strong> Canonical URLs should never redirect (3XX) or return errors (4XX/5XX)</li>
        <li><strong>Use HTTPS when available:</strong> Prefer HTTPS versions of URLs for better SEO</li>
        <li><strong>Avoid redirect chains:</strong> Point directly to the final destination URL</li>
        <li><strong>Be consistent:</strong> Use the same canonical URL format across similar pages</li>
        <li><strong>Self-reference when appropriate:</strong> Pages can canonicalize to themselves if they're the preferred version</li>
    </ul>

    <h2>🛠️ How to Fix Redirect Issues</h2>
    <ol>
        <li>Identify the final destination URL by following the redirect chain</li>
        <li>Update the canonical URL in the HTML file to point directly to the final URL</li>
        <li>Ensure the final URL returns a 200 OK status code</li>
        <li>Test the updated canonical URL to confirm it doesn't redirect</li>
        <li>Update any internal links to use the canonical URL format</li>
    </ol>
</body>
</html>`;
        return html;
    }

    /**
     * Main analysis function
     */
    async run(directory) {
        try {
            console.log('🚀 Starting Canonical URL Analysis...');
            
            const report = await this.analyzeCanonicalUrls(directory);
            const recommendations = this.generateFixRecommendations(report);
            
            // Save JSON report
            const jsonReport = {
                ...report,
                recommendations,
                generatedAt: new Date().toISOString()
            };
            
            fs.writeFileSync(
                path.join(directory, 'canonical-url-report.json'),
                JSON.stringify(jsonReport, null, 2)
            );

            // Save HTML report
            const htmlReport = this.generateHtmlReport(report, recommendations);
            fs.writeFileSync(
                path.join(directory, 'canonical-url-report.html'),
                htmlReport
            );

            // Console output
            console.log('\n📊 ANALYSIS COMPLETE');
            console.log('='.repeat(50));
            console.log(`Total files checked: ${report.summary.totalChecked}`);
            console.log(`Redirect issues found: ${report.summary.redirectIssues}`);
            console.log(`URLs returning 200 OK: ${report.summary.okUrls}`);
            console.log(`URLs with errors: ${report.summary.errorUrls}`);
            console.log(`Redirect percentage: ${report.summary.redirectPercentage}%`);
            
            if (recommendations.length > 0) {
                console.log('\n🚨 ISSUES FOUND:');
                recommendations.forEach((rec, index) => {
                    console.log(`\n${index + 1}. ${rec.file}`);
                    console.log(`   Current: ${rec.currentCanonical}`);
                    console.log(`   Recommended: ${rec.recommendedCanonical}`);
                    console.log(`   Chain: ${rec.redirectChain}`);
                });
            }

            console.log('\n📄 Reports saved:');
            console.log(`   - canonical-url-report.json`);
            console.log(`   - canonical-url-report.html`);

            return { report, recommendations };

        } catch (error) {
            console.error('❌ Analysis failed:', error.message);
            throw error;
        }
    }
}

// CLI usage
if (require.main === module) {
    const directory = process.argv[2] || process.cwd();
    
    console.log(`Analyzing canonical URLs in: ${directory}`);
    
    const checker = new CanonicalURLChecker();
    checker.run(directory)
        .then(() => {
            console.log('\n✅ Analysis completed successfully!');
            process.exit(0);
        })
        .catch(error => {
            console.error('\n❌ Analysis failed:', error.message);
            process.exit(1);
        });
}

module.exports = CanonicalURLChecker;
