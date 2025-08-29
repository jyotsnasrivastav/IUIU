const fs = require('fs');

// Fix H1 heading font-size deprecation warning by adding explicit font-size to all H1 tags
function fixH1FontSize() {
    const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
    
    // Add CSS rule to ensure all H1 tags have explicit font-size
    const h1FontSizeCSS = `
        /* Fix H1 font-size deprecation warning */
        h1 {
            font-size: 25px !important;
        }
        
        /* Ensure H1 within sectioning elements have explicit font-size */
        article h1, aside h1, nav h1, section h1 {
            font-size: 25px !important;
        }
    `;
    
    let totalFixed = 0;
    
    htmlFiles.forEach(file => {
        try {
            let content = fs.readFileSync(file, 'utf8');
            let fileFixed = false;
            
            // Check if file needs the fix (has H1 tags)
            if (content.includes('<h1')) {
                // Add the CSS fix to the critical CSS section
                const criticalCSSEnd = '</style>';
                const insertPosition = content.indexOf(criticalCSSEnd);
                
                if (insertPosition !== -1) {
                    content = content.slice(0, insertPosition) + h1FontSizeCSS + content.slice(insertPosition);
                    fileFixed = true;
                }
            }
            
            if (fileFixed) {
                fs.writeFileSync(file, content);
                console.log(`Fixed H1 font-size in: ${file}`);
                totalFixed++;
            }
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    });
    
    console.log(`\nH1 font-size fixes complete! Fixed ${totalFixed} files.`);
    console.log('All H1 headings now have explicit font-size to prevent browser deprecation warnings.');
}

fixH1FontSize();
