const fs = require('fs');
const path = require('path');

// List of Lenny face pages that should be indexed
const lennyFacePages = [
    'good-morning-lenny-face.html',
    'excited-lenny-face.html',
    'flip-table-lenny-face.html',
    'flirty-lenny-face.html',
    'good-night-lenny-face.html',
    'gun-lenny-face.html',
    'happy-lenny-face.html',
    'heart-lenny-face.html',
    'hello-lenny-face.html',
    'helpless-lenny-face.html',
    'hiding-lenny-face.html',
    'hug-lenny-face.html',
    'love-lenny-face.html',
    'magic-lenny-face.html',
    'people-lenny-face.html',
    'pointing-lenny-face.html',
    'sleeping-lenny-face.html',
    // Add more as needed
];

function fixLennyFaceIndexing() {
    let fixedCount = 0;
    let errorCount = 0;
    const results = [];

    console.log('🔧 Starting Lenny Face indexing fix...\n');

    lennyFacePages.forEach(filename => {
        const filePath = path.join(__dirname, filename);
        
        try {
            if (!fs.existsSync(filePath)) {
                console.log(`⚠️  File not found: ${filename}`);
                results.push({ file: filename, status: 'not_found' });
                return;
            }

            let content = fs.readFileSync(filePath, 'utf8');
            
            // Check current robots meta tag
            const currentRobotsMatch = content.match(/<meta name="robots" content="([^"]+)"/);
            
            if (!currentRobotsMatch) {
                console.log(`❌ No robots meta tag found in: ${filename}`);
                results.push({ file: filename, status: 'no_robots_tag' });
                errorCount++;
                return;
            }

            const currentRobots = currentRobotsMatch[1];
            
            if (currentRobots === 'noindex,follow') {
                // Fix the robots meta tag
                content = content.replace(
                    /<meta name="robots" content="noindex,follow" \/>/,
                    '<meta name="robots" content="index, follow" />'
                );
                
                // Write the updated content back to file
                fs.writeFileSync(filePath, content, 'utf8');
                
                console.log(`✅ Fixed: ${filename} (noindex,follow → index, follow)`);
                results.push({ 
                    file: filename, 
                    status: 'fixed', 
                    change: 'noindex,follow → index, follow' 
                });
                fixedCount++;
                
            } else if (currentRobots === 'index, follow') {
                console.log(`✓  Already correct: ${filename} (${currentRobots})`);
                results.push({ file: filename, status: 'already_correct', current: currentRobots });
                
            } else {
                console.log(`⚠️  Unexpected robots value in ${filename}: ${currentRobots}`);
                results.push({ file: filename, status: 'unexpected_value', current: currentRobots });
            }
            
        } catch (error) {
            console.log(`❌ Error processing ${filename}: ${error.message}`);
            results.push({ file: filename, status: 'error', error: error.message });
            errorCount++;
        }
    });

    // Generate summary report
    console.log('\n📊 SUMMARY REPORT');
    console.log('==================');
    console.log(`✅ Files fixed: ${fixedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📁 Total files processed: ${lennyFacePages.length}`);

    // Save detailed results
    const reportPath = path.join(__dirname, 'lenny-face-indexing-fix-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
        timestamp: new Date().toISOString(),
        summary: {
            total_files: lennyFacePages.length,
            fixed_count: fixedCount,
            error_count: errorCount
        },
        results: results
    }, null, 2));

    console.log(`\n📄 Detailed report saved to: lenny-face-indexing-fix-report.json`);

    // Generate HTML report
    generateHTMLReport(results, fixedCount, errorCount);
}

function generateHTMLReport(results, fixedCount, errorCount) {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex,follow" />
    <title>Lenny Face Indexing Fix Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px; }
        .summary { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .summary h2 { margin-top: 0; color: #2e7d32; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f2f2f2; font-weight: bold; }
        .status-fixed { color: #4CAF50; font-weight: bold; }
        .status-error { color: #f44336; font-weight: bold; }
        .status-correct { color: #2196F3; }
        .status-warning { color: #ff9800; }
        .timestamp { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 Lenny Face Indexing Fix Report</h1>
        <p class="timestamp">Generated: ${new Date().toLocaleString()}</p>
        
        <div class="summary">
            <h2>📊 Summary</h2>
            <p><strong>✅ Files Fixed:</strong> ${fixedCount}</p>
            <p><strong>❌ Errors:</strong> ${errorCount}</p>
            <p><strong>📁 Total Files Processed:</strong> ${results.length}</p>
        </div>

        <h2>📋 Detailed Results</h2>
        <table>
            <thead>
                <tr>
                    <th>File</th>
                    <th>Status</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                ${results.map(result => `
                    <tr>
                        <td>${result.file}</td>
                        <td class="status-${result.status.replace('_', '-')}">${result.status.replace('_', ' ').toUpperCase()}</td>
                        <td>${result.change || result.current || result.error || 'N/A'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>

        <div style="margin-top: 30px; padding: 15px; background: #fff3cd; border-radius: 5px;">
            <h3>🎯 Next Steps</h3>
            <ul>
                <li>Verify the changes in Google Search Console</li>
                <li>Request re-indexing for fixed pages</li>
                <li>Monitor indexing status over the next few days</li>
                <li>Create missing symbol pages if needed</li>
            </ul>
        </div>
    </div>
</body>
</html>`;

    const htmlReportPath = path.join(__dirname, 'lenny-face-indexing-fix-report.html');
    fs.writeFileSync(htmlReportPath, htmlContent);
    console.log(`📄 HTML report saved to: lenny-face-indexing-fix-report.html`);
}

// Run the fix
fixLennyFaceIndexing();
