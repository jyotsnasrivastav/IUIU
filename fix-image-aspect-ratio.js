const fs = require('fs');

// Fix logo image aspect ratio across all HTML files
// Change from 200x50 (4.17 ratio) to 270x54 (5.00 ratio) to match natural dimensions
function fixImageAspectRatio() {
    const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
    
    const fixes = [
        // Fix incorrect aspect ratio: 200x50 -> 270x54
        { from: /width="200" height="50"/g, to: 'width="270" height="54"' },
        
        // Also fix any instances where dimensions might be reversed or different
        { from: /width="200" height="48"/g, to: 'width="270" height="54"' },
        { from: /width="270" height="50"/g, to: 'width="270" height="54"' }
    ];
    
    let totalFixed = 0;
    
    htmlFiles.forEach(file => {
        try {
            let content = fs.readFileSync(file, 'utf8');
            let fileFixed = false;
            
            fixes.forEach(fix => {
                if (fix.from.test(content)) {
                    content = content.replace(fix.from, fix.to);
                    fileFixed = true;
                }
            });
            
            if (fileFixed) {
                fs.writeFileSync(file, content);
                console.log(`Fixed image aspect ratio in: ${file}`);
                totalFixed++;
            }
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    });
    
    console.log(`\nImage aspect ratio fixes complete! Fixed ${totalFixed} files.`);
    console.log('Logo images now display with correct 270x54 dimensions (5.00 aspect ratio)');
}

fixImageAspectRatio();
