const fs = require('fs');

// Get all HTML files
const files = fs.readdirSync('.').filter(file => file.endsWith('.html'));

console.log(`Optimizing SEO for ${files.length} HTML files...\n`);

// SEO keyword mappings for different page types
const seoData = {
    'star-symbol': {
        keywords: 'star symbol, star emoji, copy paste star, black star, white star, shooting star, sparkle emoji, star text symbol, star character, star copy and paste, decorative stars, star icons',
        h2: 'Star Symbol Collection',
        h3: 'Popular Star Symbols',
        description: 'Copy and paste 100+ star symbols (★, ⭐, ✨, 🌟, ✯, ✪, ☪) with one click. Find all star text symbols including black stars, white stars, outlined stars, shooting stars, and decorative stars.'
    },
    'heart-symbol': {
        keywords: 'heart symbol, heart emoji, love symbol, heart copy paste, red heart, black heart, broken heart, heart text symbol, heart character, romantic symbols',
        h2: 'Heart Symbol Collection',
        h3: 'Love and Heart Symbols',
        description: 'Copy and paste beautiful heart symbols (❤️, 💙, 💚, 🖤, 💔, 💕) for social media, messages, and documents. Express love with various heart emojis and text symbols.'
    },
    'keyboard-symbols': {
        keywords: 'keyboard symbols, computer symbols, keyboard shortcuts, modifier keys, function keys, keyboard emoji, computer keyboard symbols, tech symbols',
        h2: 'Keyboard Symbol Collection',
        h3: 'Computer and Keyboard Symbols',
        description: 'Copy and paste keyboard symbols (⌨️, ⌘, ⌥, ⌃, ⇧, ⏎) including modifier keys, function keys, and computer-related symbols. Perfect for tech documentation and tutorials.'
    },
    'arrow-symbol': {
        keywords: 'arrow symbol, arrow emoji, direction arrow, up arrow, down arrow, left arrow, right arrow, arrow copy paste, directional symbols',
        h2: 'Arrow Symbol Collection',
        h3: 'Directional Arrow Symbols',
        description: 'Copy and paste arrow symbols (→, ←, ↑, ↓, ⇨, ⇦, ⇧, ⇩) for directions, navigation, and design. Find all types of arrow text symbols and emojis.'
    },
    'music-symbol': {
        keywords: 'music symbol, music emoji, musical note, treble clef, music copy paste, musical symbols, note symbols, music notation',
        h2: 'Music Symbol Collection',
        h3: 'Musical Note Symbols',
        description: 'Copy and paste music symbols (🎵, 🎶, ♪, ♫, 𝄞) including musical notes, clefs, and music-related emojis. Perfect for musicians and music lovers.'
    },
    'lenny-face': {
        keywords: 'lenny face, emoticon, text face, ascii art, lenny face copy paste, funny faces, text emoticons, kaomoji',
        h2: 'Lenny Face Collection',
        h3: 'Popular Lenny Faces',
        description: 'Copy and paste Lenny faces ( ͡° ͜ʖ ͡°) and text emoticons. Find funny, cute, and expressive Lenny face variations for chat and social media.'
    },
    'aesthetic-symbols': {
        keywords: 'aesthetic symbols, cute symbols, kawaii symbols, decorative symbols, fancy symbols, aesthetic text, pretty symbols, ornamental symbols',
        h2: 'Aesthetic Symbol Collection',
        h3: 'Decorative and Cute Symbols',
        description: 'Copy and paste aesthetic symbols and decorative characters for Instagram, TikTok, and social media. Create beautiful text with cute and fancy symbols.'
    },
    'default': {
        keywords: 'symbols, emoji, copy paste, text symbols, special characters, unicode symbols, cool symbols, symbol collection',
        h2: 'Symbol Collection',
        h3: 'Popular Symbols',
        description: 'Copy and paste symbols and special characters with one click. Find cool text symbols, emojis, and unicode characters for social media and documents.'
    }
};

let optimizedCount = 0;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // Determine page type from filename
        let pageType = 'default';
        for (let type in seoData) {
            if (file.includes(type)) {
                pageType = type;
                break;
            }
        }
        
        const seo = seoData[pageType];
        
        // Update meta description if it exists
        if (content.includes('<meta name="description"')) {
            content = content.replace(
                /<meta name="description" content="[^"]*">/,
                `<meta name="description" content="${seo.description}">`
            );
            modified = true;
        }
        
        // Update or add meta keywords
        if (content.includes('<meta name="keywords"')) {
            content = content.replace(
                /<meta name="keywords" content="[^"]*">/,
                `<meta name="keywords" content="${seo.keywords}">`
            );
        } else {
            // Add keywords after description
            content = content.replace(
                /(<meta name="description"[^>]*>)/,
                `$1\n\t<meta name="keywords" content="${seo.keywords}">`
            );
        }
        modified = true;
        
        // Add semantic HTML structure after the symbol container
        const semanticHTML = `
\t\t<section class="content-section">
\t\t\t<h2>${seo.h2}</h2>
\t\t\t<p>Discover and copy ${pageType === 'default' ? 'symbols' : pageType.replace('-', ' ')} with a single click. Our collection includes the most popular and useful symbols for social media, documents, and creative projects.</p>
\t\t\t
\t\t\t<h3>${seo.h3}</h3>
\t\t\t<p>Browse through our carefully curated selection of symbols. Each symbol can be copied instantly by clicking on it. Perfect for enhancing your text, social media posts, and digital content.</p>
\t\t\t
\t\t\t<h3>How to Use These Symbols</h3>
\t\t\t<p>Simply click on any symbol to copy it to your clipboard. Then paste it anywhere you need - in social media posts, messages, documents, or websites. All symbols are compatible with most platforms and devices.</p>
\t\t</section>`;
        
        // Insert semantic content before footer if not already present
        if (!content.includes('content-section') && content.includes('<footer')) {
            content = content.replace(
                /(<footer)/,
                `${semanticHTML}\n\t$1`
            );
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            optimizedCount++;
            console.log(`✓ Optimized ${file} (${pageType})`);
        }
        
    } catch (error) {
        console.error(`✗ Error optimizing ${file}:`, error.message);
    }
});

console.log(`\nCompleted! Optimized ${optimizedCount} HTML files with semantic SEO structure.`);
console.log('Added: H2/H3 headings, descriptive paragraphs, meta keywords, and improved descriptions.');
