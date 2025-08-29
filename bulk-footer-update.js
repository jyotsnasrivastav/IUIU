const fs = require('fs');
const path = require('path');

// New footer HTML structure
const newFooterHTML = `	<div class="footer" role="contentinfo" itemscope itemtype="https://schema.org/WPFooter">
		<div class="footer-content">
			<div class="footer-left">
				<p class="site-name">SymbolsEmoji.com</p>
			</div>
			<div class="footer-links">
				<a href="privacy-policy.html" class="footer-link">Privacy</a>
				<a href="terms-of-service.html" class="footer-link">Terms</a>
				<a href="contact.html" class="footer-link">Contact</a>
			</div>
			<div class="footer-copyright">
				<p class="copyright">© 2025 SymbolsEmoji.com</p>
			</div>
		</div>
	</div>`;

// Function to update footer in HTML file
function updateFooter(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Look for the simpler footer structure used in most files
        const simpleFooterRegex = /<div class="footer">\s*<p>©[^<]*<\/p><a[^>]*>www\.symbolsemoji\.com<\/a>\s*<div>\s*<a[^>]*>Privacy<\/a>\s*<a[^>]*>Terms<\/a>\s*<a[^>]*>Contact<\/a>\s*<\/div>\s*<button[^>]*>Privacy Manager<\/button>\s*<\/div>/;
        
        // Also look for footer with role="contentinfo" (like index.html)
        const complexFooterRegex = /<div class="footer"[^>]*role="contentinfo"[^>]*>[\s\S]*?<\/div>\s*(?=\s*<link rel="stylesheet" href="footer-fix\.css">)/;
        
        let updated = false;
        
        if (complexFooterRegex.test(content)) {
            content = content.replace(complexFooterRegex, newFooterHTML);
            updated = true;
        } else if (simpleFooterRegex.test(content)) {
            content = content.replace(simpleFooterRegex, newFooterHTML);
            updated = true;
        } else {
            // Try a more flexible approach - find any div with class="footer"
            const flexibleFooterRegex = /<div class="footer">[\s\S]*?<\/div>(?=\s*<link rel="stylesheet" href="footer-fix\.css">)/;
            if (flexibleFooterRegex.test(content)) {
                content = content.replace(flexibleFooterRegex, newFooterHTML);
                updated = true;
            }
        }
        
        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✓ Updated: ${path.basename(filePath)}`);
            return true;
        } else {
            console.log(`⚠ No footer found in: ${path.basename(filePath)}`);
            return false;
        }
    } catch (error) {
        console.error(`✗ Error updating ${path.basename(filePath)}:`, error.message);
        return false;
    }
}

// Get all HTML files in current directory
const currentDir = __dirname;
const htmlFiles = fs.readdirSync(currentDir)
    .filter(file => file.endsWith('.html'))
    .map(file => path.join(currentDir, file));

console.log(`Found ${htmlFiles.length} HTML files to update...`);
console.log('');

let updatedCount = 0;
let skippedCount = 0;

// Update each HTML file
htmlFiles.forEach(filePath => {
    if (updateFooter(filePath)) {
        updatedCount++;
    } else {
        skippedCount++;
    }
});

console.log('');
console.log('='.repeat(50));
console.log(`Footer Update Complete!`);
console.log(`Updated: ${updatedCount} files`);
console.log(`Skipped: ${skippedCount} files`);
console.log('='.repeat(50));
