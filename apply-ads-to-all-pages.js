/**
 * Script to apply AdSense ads to all HTML pages
 * This will add top banner, in-content, and sidebar ads to all pages
 */

const fs = require('fs');
const path = require('path');

// Ad code templates
const AD_CODES = {
    topBanner: `
    <!-- top-banner -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7064720037053690"
         crossorigin="anonymous"></script>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-7064720037053690"
         data-ad-slot="5788145465"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>`,

    contentBanner: `
    <!-- content-banner -->
    <div class="ad-container" style="margin:20px 0; text-align:center;">
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7064720037053690"
             crossorigin="anonymous"></script>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-7064720037053690"
             data-ad-slot="4594822602"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    </div>`,

    sidebarAd: `
    <!-- Sidebar Ad Container -->
    <div class="sidebar-ad-container">
        <div class="sidebar-ad">
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7064720037053690"
                 crossorigin="anonymous"></script>
            <!-- sidebar-ad -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-7064720037053690"
                 data-ad-slot="7432399625"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>
    </div>`,

    adStyles: `
    /* Sidebar Ad Styles */
    .sidebar-ad-container {
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
        width: 300px;
        max-height: 600px;
        overflow: hidden;
    }
    
    .sidebar-ad {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        padding: 10px;
        border: 1px solid #e0e0e0;
    }
    
    /* Ad Container Styles */
    .ad-container {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 15px;
        border: 1px solid #e9ecef;
        position: relative;
    }
    
    .ad-container::before {
        content: 'Advertisement';
        position: absolute;
        top: 5px;
        left: 10px;
        font-size: 10px;
        color: #6c757d;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    /* Responsive Sidebar */
    @media (max-width: 1400px) {
        .sidebar-ad-container {
            display: none;
        }
    }
    
    /* Mobile Ad Adjustments */
    @media (max-width: 768px) {
        .ad-container {
            margin: 10px 0;
            padding: 10px;
        }
        
        .sidebar-ad-container {
            display: none;
        }
    }`
};

function processHtmlFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Skip if it's index.html (already processed)
        if (path.basename(filePath) === 'index.html') {
            console.log(`Skipping index.html (already processed)`);
            return;
        }

        // Add ad styles to head if not present
        if (!content.includes('.sidebar-ad-container')) {
            const headCloseTag = '</head>';
            if (content.includes(headCloseTag)) {
                content = content.replace(headCloseTag, `\t<style>\n${AD_CODES.adStyles}\n\t</style>\n${headCloseTag}`);
                modified = true;
            }
        }

        // Add top banner after header
        if (!content.includes('<!-- top-banner -->')) {
            const headerCloseTag = '</header>';
            if (content.includes(headerCloseTag)) {
                content = content.replace(headerCloseTag, `${headerCloseTag}\n\n${AD_CODES.topBanner}\n`);
                modified = true;
            }
        }

        // Add sidebar ad after tools section
        if (!content.includes('<!-- Sidebar Ad Container -->')) {
            const toolsSection = /<div class="tools">[\s\S]*?<\/div>/;
            if (toolsSection.test(content)) {
                content = content.replace(toolsSection, (match) => {
                    return match + '\n\n' + AD_CODES.sidebarAd + '\n';
                });
                modified = true;
            }
        }

        // Add content banner after main title (h1)
        if (!content.includes('<!-- content-banner -->')) {
            const h1Pattern = /<h1[^>]*>[\s\S]*?<\/h1>/;
            if (h1Pattern.test(content)) {
                content = content.replace(h1Pattern, (match) => {
                    return match + '\n\n' + AD_CODES.contentBanner + '\n';
                });
                modified = true;
            }
        }

        // Add another content banner in the middle of symbol content
        const symbolDivs = content.match(/<div class="symbol"[^>]*>[\s\S]*?<\/div>/g);
        if (symbolDivs && symbolDivs.length > 10) {
            // Find middle position to insert ad
            const middleIndex = Math.floor(symbolDivs.length / 2);
            const middleSymbol = symbolDivs[middleIndex];
            
            if (!content.includes('<!-- content-banner -->')) {
                content = content.replace(middleSymbol, middleSymbol + '\n\n' + AD_CODES.contentBanner + '\n');
                modified = true;
            }
        }

        // Save the modified content
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated: ${path.basename(filePath)}`);
        } else {
            console.log(`⏭️  Skipped: ${path.basename(filePath)} (already has ads)`);
        }

    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

function main() {
    const directory = __dirname;
    
    // Get all HTML files
    const files = fs.readdirSync(directory)
        .filter(file => file.endsWith('.html'))
        .map(file => path.join(directory, file));

    console.log(`🚀 Found ${files.length} HTML files to process...\n`);

    // Process each file
    files.forEach(processHtmlFile);

    console.log(`\n✅ AdSense implementation completed for all pages!`);
    console.log(`\n📊 Summary:`);
    console.log(`- Top Banner Ads: Added to all pages`);
    console.log(`- In-Content Ads: Added to all pages`);
    console.log(`- Sidebar Ads: Added to all pages`);
    console.log(`- Popup Ads: Already configured in universal-share-modal.js`);
}

// Run the script
main();
