const fs = require('fs');

// Get all HTML files
const files = fs.readdirSync('.').filter(file => file.endsWith('.html'));

console.log(`Adding semantic SEO structure to ${files.length} HTML files...\n`);

// SEO content mappings for different page types
const seoContent = {
    'star-symbol': {
        h2: 'Star Symbol Collection - Copy & Paste ⭐',
        h3: 'Popular Star Symbols and Emojis',
        p1: 'Discover our comprehensive collection of star symbols and emojis. Copy any star symbol with a single click and use them in your social media posts, documents, and creative projects. Our collection includes black stars, white stars, shooting stars, and decorative star symbols.',
        p2: 'These star symbols are perfect for highlighting important content, creating decorative text, or adding visual appeal to your messages. All symbols are Unicode-compatible and work across all platforms and devices.',
        keywords: 'star symbol, star emoji, copy paste star, black star, white star, shooting star, sparkle emoji, star text symbol, star character, decorative stars, star icons'
    },
    'heart-symbol': {
        h2: 'Heart Symbol Collection - Copy & Paste ❤️',
        h3: 'Love and Heart Symbols for Every Occasion',
        p1: 'Express your emotions with our beautiful collection of heart symbols and emojis. From classic red hearts to broken hearts, find the perfect symbol to convey your feelings in messages, social media posts, and documents.',
        p2: 'Our heart symbol collection includes various colors and styles - red hearts, blue hearts, green hearts, black hearts, and decorative heart symbols. Perfect for romantic messages, friendship posts, and emotional expressions.',
        keywords: 'heart symbol, heart emoji, love symbol, heart copy paste, red heart, black heart, broken heart, heart text symbol, romantic symbols, love emoji'
    },
    'keyboard-symbols': {
        h2: 'Keyboard Symbol Collection - Copy & Paste ⌨️',
        h3: 'Computer and Keyboard Symbols for Tech Content',
        p1: 'Access a complete collection of keyboard and computer symbols including modifier keys, function keys, and tech-related emojis. Perfect for technical documentation, tutorials, and computer-related content.',
        p2: 'Our keyboard symbol collection features Command keys, Option keys, Control keys, Shift keys, Enter symbols, and various computer hardware symbols. Essential for developers, tech writers, and computer enthusiasts.',
        keywords: 'keyboard symbols, computer symbols, keyboard shortcuts, modifier keys, function keys, keyboard emoji, tech symbols, computer keyboard symbols'
    },
    'arrow-symbol': {
        h2: 'Arrow Symbol Collection - Copy & Paste →',
        h3: 'Directional Arrows and Navigation Symbols',
        p1: 'Navigate with style using our comprehensive arrow symbol collection. Find up arrows, down arrows, left arrows, right arrows, and decorative directional symbols for all your design and navigation needs.',
        p2: 'These arrow symbols are perfect for creating flowcharts, indicating directions, highlighting important points, or adding visual flow to your content. Compatible with all platforms and applications.',
        keywords: 'arrow symbol, arrow emoji, direction arrow, up arrow, down arrow, left arrow, right arrow, directional symbols, navigation arrows'
    },
    'music-symbol': {
        h2: 'Music Symbol Collection - Copy & Paste 🎵',
        h3: 'Musical Notes and Music Symbols',
        p1: 'Enhance your musical content with our collection of music symbols and musical note emojis. Perfect for musicians, music teachers, and music lovers who want to add musical flair to their text.',
        p2: 'Our music symbol collection includes treble clefs, musical notes, music emojis, and various musical notation symbols. Great for social media posts about music, educational content, and creative projects.',
        keywords: 'music symbol, music emoji, musical note, treble clef, music notation, musical symbols, note symbols, music copy paste'
    },
    'lenny-face': {
        h2: 'Lenny Face Collection - Copy & Paste ( ͡° ͜ʖ ͡°)',
        h3: 'Funny Lenny Faces and Text Emoticons',
        p1: 'Express yourself with our hilarious collection of Lenny faces and text emoticons. These ASCII art faces are perfect for adding humor and personality to your messages and social media posts.',
        p2: 'Our Lenny face collection includes happy faces, sad faces, angry faces, and many other emotional expressions. These text-based emoticons work on all platforms and add character to your digital communication.',
        keywords: 'lenny face, emoticon, text face, ascii art, lenny face copy paste, funny faces, text emoticons, kaomoji, dongers'
    },
    'aesthetic-symbols': {
        h2: 'Aesthetic Symbol Collection - Copy & Paste ✨',
        h3: 'Cute and Decorative Aesthetic Symbols',
        p1: 'Create beautiful and aesthetic text with our collection of cute symbols and decorative characters. Perfect for Instagram bios, TikTok captions, and social media posts that need that special aesthetic touch.',
        p2: 'Our aesthetic symbol collection includes kawaii symbols, decorative borders, cute dividers, and ornamental characters. Transform your plain text into visually appealing content with these trendy symbols.',
        keywords: 'aesthetic symbols, cute symbols, kawaii symbols, decorative symbols, fancy symbols, aesthetic text, pretty symbols, ornamental symbols'
    },
    'default': {
        h2: 'Symbol Collection - Copy & Paste Special Characters',
        h3: 'Popular Symbols and Special Characters',
        p1: 'Discover our extensive collection of symbols and special characters. Copy any symbol with one click and use them to enhance your text, social media posts, documents, and creative projects.',
        p2: 'All symbols in our collection are Unicode-compatible and work across different platforms and devices. Perfect for adding visual interest and personality to your digital content.',
        keywords: 'symbols, emoji, copy paste, text symbols, special characters, unicode symbols, cool symbols, symbol collection'
    }
};

let optimizedCount = 0;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // Skip if already has semantic content
        if (content.includes('semantic-content')) {
            console.log(`- Skipped ${file} (already optimized)`);
            return;
        }
        
        // Determine page type from filename
        let pageType = 'default';
        for (let type in seoContent) {
            if (file.includes(type)) {
                pageType = type;
                break;
            }
        }
        
        const seo = seoContent[pageType];
        
        // Update meta description
        if (content.includes('<meta name="description"')) {
            content = content.replace(
                /<meta name="description" content="[^"]*">/,
                `<meta name="description" content="${seo.p1.substring(0, 155)}...">`
            );
            modified = true;
        }
        
        // Update or add meta keywords
        if (content.includes('<meta name="keywords"')) {
            content = content.replace(
                /<meta name="keywords" content="[^"]*">/,
                `<meta name="keywords" content="${seo.keywords}">`
            );
        } else if (content.includes('<meta name="description"')) {
            content = content.replace(
                /(<meta name="description"[^>]*>)/,
                `$1\n\t<meta name="keywords" content="${seo.keywords}">`
            );
        }
        modified = true;
        
        // Add semantic HTML structure before the footer
        const semanticHTML = `
\t<main class="semantic-content">
\t\t<section class="symbol-info">
\t\t\t<h2>${seo.h2}</h2>
\t\t\t<p>${seo.p1}</p>
\t\t\t
\t\t\t<h3>${seo.h3}</h3>
\t\t\t<p>${seo.p2}</p>
\t\t\t
\t\t\t<h3>How to Copy and Use These Symbols</h3>
\t\t\t<p>Simply click on any symbol above to copy it to your clipboard instantly. Then paste it anywhere you need - in social media posts, text messages, documents, or websites. All symbols are Unicode-compatible and work on most platforms and devices including Windows, Mac, iOS, and Android.</p>
\t\t</section>
\t</main>`;
        
        // Insert semantic content before footer
        if (content.includes('<footer') || content.includes('class="footer"')) {
            content = content.replace(
                /(\s*<footer|\s*<div[^>]*class="footer")/,
                `${semanticHTML}\n$1`
            );
            modified = true;
        } else if (content.includes('</body>')) {
            // Fallback: insert before closing body tag
            content = content.replace(
                /(\s*<\/body>)/,
                `${semanticHTML}\n$1`
            );
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            optimizedCount++;
            console.log(`✓ Added semantic SEO to ${file} (${pageType})`);
        }
        
    } catch (error) {
        console.error(`✗ Error optimizing ${file}:`, error.message);
    }
});

console.log(`\nCompleted! Added semantic SEO structure to ${optimizedCount} HTML files.`);
console.log('Added: H2/H3 headings, descriptive paragraphs, meta keywords, and improved descriptions.');
