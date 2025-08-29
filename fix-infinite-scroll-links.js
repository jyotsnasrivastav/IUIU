// Fix InfiniteScroll pagination link issues across all HTML files
const fs = require('fs');
const path = require('path');

// Get all HTML files in the directory
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));

const fixes = [
    // Remove ./ prefix from page-next links to fix InfiniteScroll parsing
    { from: /class="page-next" href="\.\/([^"]+)"/g, to: 'class="page-next" href="$1"' },
    
    // Fix any remaining relative path issues in navigation
    { from: /href="\.\/cool-sparkles\.html"/g, to: 'href="cool-sparkles.html"' },
    { from: /href="\.\/cool-heart\.html"/g, to: 'href="cool-heart.html"' },
    { from: /href="\.\/cool-waves\.html"/g, to: 'href="cool-waves.html"' },
    { from: /href="\.\/cool-star\.html"/g, to: 'href="cool-star.html"' },
    { from: /href="\.\/cool-triangle\.html"/g, to: 'href="cool-triangle.html"' },
    { from: /href="\.\/cool-borders\.html"/g, to: 'href="cool-borders.html"' },
    { from: /href="\.\/cool-dividers\.html"/g, to: 'href="cool-dividers.html"' },
    { from: /href="\.\/cool-flower\.html"/g, to: 'href="cool-flower.html"' },
    { from: /href="\.\/cool-arrow\.html"/g, to: 'href="cool-arrow.html"' },
    { from: /href="\.\/cool-brackets\.html"/g, to: 'href="cool-brackets.html"' },
    { from: /href="\.\/cool-circle\.html"/g, to: 'href="cool-circle.html"' },
    { from: /href="\.\/cool-music\.html"/g, to: 'href="cool-music.html"' },
    { from: /href="\.\/cool-dot\.html"/g, to: 'href="cool-dot.html"' },
    { from: /href="\.\/cool-square\.html"/g, to: 'href="cool-square.html"' }
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
            console.log(`Fixed InfiniteScroll links in: ${file}`);
            totalFixed++;
        }
    } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
    }
});

console.log(`\nInfiniteScroll link fixes complete! Fixed ${totalFixed} files.`);
