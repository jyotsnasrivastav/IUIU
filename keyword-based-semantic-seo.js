const fs = require('fs');
const path = require('path');

// Keyword-based semantic SEO content for different page types
const keywordBasedContent = {
    'star-symbol': {
        h2: 'Star Symbol Collection - Copy & Paste ⭐ Special Characters',
        h3_1: 'Complete Star Symbols and Stellar Unicode Characters',
        p1: 'Discover the ultimate collection of star symbols and stellar characters, featuring thousands of Unicode star symbols carefully organized for easy access and instant copying. Our comprehensive star database includes five-pointed stars, six-pointed stars, eight-pointed stars, shooting stars, sparkle symbols, astronomical symbols, and decorative stellar elements that enhance any type of digital content. Whether you\'re creating celestial documents, designing cosmic social media posts, developing stellar websites, or working on astronomical creative projects, our star symbol collection provides the perfect stellar characters to express your cosmic ideas clearly and attractively.',
        p2: 'Star symbols and stellar characters play a crucial role in modern digital communication, helping to convey celestial information more effectively than words alone. They\'re essential for astronomical documentation, where precise stellar notation can prevent misunderstandings and improve cosmic clarity. In creative fields, star symbols add celestial visual interest and can help establish stellar brand identity or cosmic artistic style. For international communication, many star symbols transcend language barriers, making stellar content more accessible to global audiences.',
        p3: 'We maintain our star symbol collection with rigorous attention to stellar quality and cosmic compatibility, regularly testing each star character across different platforms and updating our stellar database as new Unicode star standards are released. This ensures that every star symbol in our collection works reliably across various devices and applications, from mobile phones to desktop computers, from web browsers to word processors.',
        keywords: 'star symbol, star emoji, star copy paste, five pointed star, six pointed star, shooting star, sparkle symbol, stellar symbols, astronomical symbols, star characters'
    },
    'heart-symbol': {
        h2: 'Heart Symbol Collection - Copy & Paste ❤️ Special Characters',
        h3_1: 'Complete Heart Symbols and Love Unicode Characters',
        p1: 'Discover the ultimate collection of heart symbols and love characters, featuring thousands of Unicode heart symbols carefully organized for easy access and instant copying. Our comprehensive heart database includes red hearts, black hearts, white hearts, broken hearts, sparkling hearts, decorative hearts, and romantic elements that enhance any type of digital content. Whether you\'re creating romantic documents, designing loving social media posts, developing heartfelt websites, or working on emotional creative projects, our heart symbol collection provides the perfect romantic characters to express your loving ideas clearly and attractively.',
        p2: 'Heart symbols and love characters play a crucial role in modern digital communication, helping to convey emotional information more effectively than words alone. They\'re essential for romantic documentation, where precise emotional notation can prevent misunderstandings and improve loving clarity. In creative fields, heart symbols add emotional visual interest and can help establish romantic brand identity or loving artistic style. For international communication, many heart symbols transcend language barriers, making emotional content more accessible to global audiences.',
        p3: 'We maintain our heart symbol collection with rigorous attention to emotional quality and romantic compatibility, regularly testing each heart character across different platforms and updating our love database as new Unicode heart standards are released. This ensures that every heart symbol in our collection works reliably across various devices and applications, from mobile phones to desktop computers, from web browsers to word processors.',
        keywords: 'heart symbol, heart emoji, love symbol, red heart, black heart, broken heart, heart copy paste, romantic symbols, love characters, heart emoticons'
    },
    'arrow-symbol': {
        h2: 'Arrow Symbol Collection - Copy & Paste → Special Characters',
        h3_1: 'Complete Arrow Symbols and Directional Unicode Characters',
        p1: 'Discover the ultimate collection of arrow symbols and directional characters, featuring thousands of Unicode arrow symbols carefully organized for easy access and instant copying. Our comprehensive arrow database includes up arrows, down arrows, left arrows, right arrows, curved arrows, double arrows, and navigational elements that enhance any type of digital content. Whether you\'re creating directional documents, designing navigational social media posts, developing flow-based websites, or working on instructional creative projects, our arrow symbol collection provides the perfect directional characters to express your navigational ideas clearly and attractively.',
        p2: 'Arrow symbols and directional characters play a crucial role in modern digital communication, helping to convey navigational information more effectively than words alone. They\'re essential for instructional documentation, where precise directional notation can prevent misunderstandings and improve navigational clarity. In creative fields, arrow symbols add directional visual interest and can help establish flow-based brand identity or navigational artistic style. For international communication, many arrow symbols transcend language barriers, making directional content more accessible to global audiences.',
        p3: 'We maintain our arrow symbol collection with rigorous attention to directional quality and navigational compatibility, regularly testing each arrow character across different platforms and updating our directional database as new Unicode arrow standards are released. This ensures that every arrow symbol in our collection works reliably across various devices and applications, from mobile phones to desktop computers, from web browsers to word processors.',
        keywords: 'arrow symbol, arrow emoji, direction arrow, up arrow, down arrow, left arrow, right arrow, curved arrow, arrow copy paste, directional symbols'
    },
    'music-symbol': {
        h2: 'Music Symbol Collection - Copy & Paste 🎵 Special Characters',
        h3_1: 'Complete Music Symbols and Musical Unicode Characters',
        p1: 'Discover the ultimate collection of music symbols and musical characters, featuring thousands of Unicode music symbols carefully organized for easy access and instant copying. Our comprehensive music database includes musical notes, treble clefs, bass clefs, sharp symbols, flat symbols, natural symbols, and musical elements that enhance any type of digital content. Whether you\'re creating musical documents, designing melodic social media posts, developing music-themed websites, or working on musical creative projects, our music symbol collection provides the perfect musical characters to express your melodic ideas clearly and attractively.',
        p2: 'Music symbols and musical characters play a crucial role in modern digital communication, helping to convey musical information more effectively than words alone. They\'re essential for musical documentation, where precise musical notation can prevent misunderstandings and improve melodic clarity. In creative fields, music symbols add musical visual interest and can help establish melodic brand identity or musical artistic style. For international communication, many music symbols transcend language barriers, making musical content more accessible to global audiences.',
        p3: 'We maintain our music symbol collection with rigorous attention to musical quality and melodic compatibility, regularly testing each music character across different platforms and updating our musical database as new Unicode music standards are released. This ensures that every music symbol in our collection works reliably across various devices and applications, from mobile phones to desktop computers, from web browsers to word processors.',
        keywords: 'music symbol, music emoji, musical note, treble clef, bass clef, music notation, musical symbols, music copy paste, note symbols, musical characters'
    },
    'lenny-face': {
        h2: 'Lenny Face Collection - Copy & Paste ( ͡° ͜ʖ ͡°) Special Characters',
        h3_1: 'Complete Lenny Face Symbols and Emoticon Unicode Characters',
        p1: 'Discover the ultimate collection of Lenny face symbols and emoticon characters, featuring thousands of Unicode Lenny face symbols carefully organized for easy access and instant copying. Our comprehensive Lenny face database includes happy faces, sad faces, angry faces, cute faces, weird faces, expressive emoticons, and ASCII art elements that enhance any type of digital content. Whether you\'re creating humorous documents, designing expressive social media posts, developing entertaining websites, or working on comedic creative projects, our Lenny face collection provides the perfect emoticon characters to express your humorous ideas clearly and attractively.',
        p2: 'Lenny face symbols and emoticon characters play a crucial role in modern digital communication, helping to convey emotional information more effectively than words alone. They\'re essential for expressive documentation, where precise emotional notation can prevent misunderstandings and improve humorous clarity. In creative fields, Lenny face symbols add emotional visual interest and can help establish expressive brand identity or humorous artistic style. For international communication, many Lenny face symbols transcend language barriers, making emotional content more accessible to global audiences.',
        p3: 'We maintain our Lenny face collection with rigorous attention to emotional quality and expressive compatibility, regularly testing each Lenny face character across different platforms and updating our emoticon database as new Unicode Lenny face standards are released. This ensures that every Lenny face symbol in our collection works reliably across various devices and applications, from mobile phones to desktop computers, from web browsers to word processors.',
        keywords: 'lenny face, emoticon, text face, ascii art, lenny face copy paste, funny faces, text emoticons, kaomoji, dongers, lenny face symbols'
    },
    'animal-emoji': {
        h2: 'Animal Emoji Collection - Copy & Paste 🐼 Special Characters',
        h3_1: 'Complete Animal Symbols and Wildlife Unicode Characters',
        p1: 'Discover the ultimate collection of animal emoji and wildlife characters, featuring thousands of Unicode animal symbols carefully organized for easy access and instant copying. Our comprehensive animal database includes pet emojis, wild animal symbols, farm animals, sea creatures, birds, insects, and wildlife elements that enhance any type of digital content. Whether you\'re creating nature documents, designing wildlife social media posts, developing animal-themed websites, or working on zoological creative projects, our animal emoji collection provides the perfect wildlife characters to express your natural ideas clearly and attractively.',
        p2: 'Animal emoji and wildlife characters play a crucial role in modern digital communication, helping to convey natural information more effectively than words alone. They\'re essential for zoological documentation, where precise animal notation can prevent misunderstandings and improve wildlife clarity. In creative fields, animal symbols add natural visual interest and can help establish wildlife brand identity or zoological artistic style. For international communication, many animal symbols transcend language barriers, making wildlife content more accessible to global audiences.',
        p3: 'We maintain our animal emoji collection with rigorous attention to wildlife quality and zoological compatibility, regularly testing each animal character across different platforms and updating our wildlife database as new Unicode animal standards are released. This ensures that every animal emoji in our collection works reliably across various devices and applications, from mobile phones to desktop computers, from web browsers to word processors.',
        keywords: 'animal emoji, animal symbols, pet emoji, wild animals, farm animals, sea creatures, animal copy paste, wildlife symbols, zoo animals, nature emoji'
    },
    'aesthetic-symbols': {
        h2: 'Aesthetic Symbol Collection - Copy & Paste ✨ Special Characters',
        h3_1: 'Complete Aesthetic Symbols and Decorative Unicode Characters',
        p1: 'Discover the ultimate collection of aesthetic symbols and decorative characters, featuring thousands of Unicode aesthetic symbols carefully organized for easy access and instant copying. Our comprehensive aesthetic database includes kawaii symbols, cute decorations, fancy borders, ornamental elements, trendy symbols, and aesthetic elements that enhance any type of digital content. Whether you\'re creating stylish documents, designing aesthetic social media posts, developing trendy websites, or working on decorative creative projects, our aesthetic symbol collection provides the perfect decorative characters to express your stylish ideas clearly and attractively.',
        p2: 'Aesthetic symbols and decorative characters play a crucial role in modern digital communication, helping to convey stylistic information more effectively than words alone. They\'re essential for decorative documentation, where precise aesthetic notation can prevent misunderstandings and improve stylistic clarity. In creative fields, aesthetic symbols add decorative visual interest and can help establish trendy brand identity or stylish artistic style. For international communication, many aesthetic symbols transcend language barriers, making decorative content more accessible to global audiences.',
        p3: 'We maintain our aesthetic symbol collection with rigorous attention to decorative quality and stylistic compatibility, regularly testing each aesthetic character across different platforms and updating our decorative database as new Unicode aesthetic standards are released. This ensures that every aesthetic symbol in our collection works reliably across various devices and applications, from mobile phones to desktop computers, from web browsers to word processors.',
        keywords: 'aesthetic symbols, cute symbols, kawaii symbols, decorative symbols, fancy symbols, aesthetic text, pretty symbols, ornamental symbols, trendy symbols'
    },
    'currency-symbol': {
        h2: 'Currency Symbol Collection - Copy & Paste $ Special Characters',
        h3_1: 'Complete Currency Symbols and Financial Unicode Characters',
        p1: 'Discover the ultimate collection of currency symbols and financial characters, featuring thousands of Unicode currency symbols carefully organized for easy access and instant copying. Our comprehensive currency database includes dollar signs, euro symbols, pound sterling, yen symbols, bitcoin symbols, cryptocurrency signs, and financial elements that enhance any type of digital content. Whether you\'re creating financial documents, designing economic social media posts, developing commerce websites, or working on monetary creative projects, our currency symbol collection provides the perfect financial characters to express your economic ideas clearly and attractively.',
        p2: 'Currency symbols and financial characters play a crucial role in modern digital communication, helping to convey economic information more effectively than words alone. They\'re essential for financial documentation, where precise monetary notation can prevent misunderstandings and improve economic clarity. In creative fields, currency symbols add financial visual interest and can help establish economic brand identity or monetary artistic style. For international communication, many currency symbols transcend language barriers, making financial content more accessible to global audiences.',
        p3: 'We maintain our currency symbol collection with rigorous attention to financial quality and economic compatibility, regularly testing each currency character across different platforms and updating our monetary database as new Unicode currency standards are released. This ensures that every currency symbol in our collection works reliably across various devices and applications, from mobile phones to desktop computers, from web browsers to word processors.',
        keywords: 'currency symbol, money symbol, dollar sign, euro symbol, pound sterling, yen symbol, bitcoin symbol, cryptocurrency symbols, financial symbols'
    },
    'circle-symbol': {
        h2: 'Circle Symbol Collection - Copy & Paste ● Special Characters',
        h3_1: 'Complete Circle Symbols and Round Unicode Characters',
        p1: 'Discover the ultimate collection of circle symbols and round characters, featuring thousands of Unicode circle symbols carefully organized for easy access and instant copying. Our comprehensive circle database includes filled circles, empty circles, dotted circles, geometric circles, bullet points, radio buttons, and circular elements that enhance any type of digital content. Whether you\'re creating geometric documents, designing circular social media posts, developing round-themed websites, or working on geometric creative projects, our circle symbol collection provides the perfect circular characters to express your geometric ideas clearly and attractively.',
        p2: 'Circle symbols and round characters play a crucial role in modern digital communication, helping to convey geometric information more effectively than words alone. They\'re essential for geometric documentation, where precise circular notation can prevent misunderstandings and improve geometric clarity. In creative fields, circle symbols add geometric visual interest and can help establish circular brand identity or round artistic style. For international communication, many circle symbols transcend language barriers, making geometric content more accessible to global audiences.',
        p3: 'We maintain our circle symbol collection with rigorous attention to geometric quality and circular compatibility, regularly testing each circle character across different platforms and updating our geometric database as new Unicode circle standards are released. This ensures that every circle symbol in our collection works reliably across various devices and applications, from mobile phones to desktop computers, from web browsers to word processors.',
        keywords: 'circle symbol, round symbol, bullet point, filled circle, empty circle, geometric circle, circle copy paste, circular symbols, dot symbol'
    },
    'square-symbol': {
        h2: 'Square Symbol Collection - Copy & Paste ■ Special Characters',
        h3_1: 'Complete Square Symbols and Rectangular Unicode Characters',
        p1: 'Discover the ultimate collection of square symbols and rectangular characters, featuring thousands of Unicode square symbols carefully organized for easy access and instant copying. Our comprehensive square database includes filled squares, empty squares, rounded squares, geometric rectangles, checkbox symbols, block elements, and rectangular elements that enhance any type of digital content. Whether you\'re creating geometric documents, designing square social media posts, developing block-themed websites, or working on rectangular creative projects, our square symbol collection provides the perfect geometric characters to express your structured ideas clearly and attractively.',
        p2: 'Square symbols and rectangular characters play a crucial role in modern digital communication, helping to convey structured information more effectively than words alone. They\'re essential for geometric documentation, where precise rectangular notation can prevent misunderstandings and improve structural clarity. In creative fields, square symbols add geometric visual interest and can help establish structured brand identity or rectangular artistic style. For international communication, many square symbols transcend language barriers, making geometric content more accessible to global audiences.',
        p3: 'We maintain our square symbol collection with rigorous attention to geometric quality and rectangular compatibility, regularly testing each square character across different platforms and updating our geometric database as new Unicode square standards are released. This ensures that every square symbol in our collection works reliably across various devices and applications, from mobile phones to desktop computers, from web browsers to word processors.',
        keywords: 'square symbol, rectangle symbol, block symbol, filled square, empty square, checkbox symbol, geometric square, square copy paste, rectangular symbols'
    },
    'triangle-symbol': {
        h2: 'Triangle Symbol Collection - Copy & Paste ▲ Special Characters',
        h3_1: 'Complete Triangle Symbols and Angular Unicode Characters',
        p1: 'Discover the ultimate collection of triangle symbols and angular characters, featuring thousands of Unicode triangle symbols carefully organized for easy access and instant copying. Our comprehensive triangle database includes up triangles, down triangles, left triangles, right triangles, filled triangles, empty triangles, and angular elements that enhance any type of digital content. Whether you\'re creating geometric documents, designing angular social media posts, developing triangle-themed websites, or working on geometric creative projects, our triangle symbol collection provides the perfect angular characters to express your geometric ideas clearly and attractively.',
        p2: 'Triangle symbols and angular characters play a crucial role in modern digital communication, helping to convey geometric information more effectively than words alone. They\'re essential for geometric documentation, where precise angular notation can prevent misunderstandings and improve geometric clarity. In creative fields, triangle symbols add angular visual interest and can help establish geometric brand identity or angular artistic style. For international communication, many triangle symbols transcend language barriers, making geometric content more accessible to global audiences.',
        p3: 'We maintain our triangle symbol collection with rigorous attention to geometric quality and angular compatibility, regularly testing each triangle character across different platforms and updating our geometric database as new Unicode triangle standards are released. This ensures that every triangle symbol in our collection works reliably across various devices and applications, from mobile phones to desktop computers, from web browsers to word processors.',
        keywords: 'triangle symbol, triangle emoji, up triangle, down triangle, filled triangle, empty triangle, angular symbols, triangle copy paste, geometric triangles'
    },
    'bracket-symbol': {
        h2: 'Bracket Symbol Collection - Copy & Paste 【】 Special Characters',
        h3_1: 'Complete Bracket Symbols and Punctuation Unicode Characters',
        p1: 'Discover the ultimate collection of bracket symbols and punctuation characters, featuring thousands of Unicode bracket symbols carefully organized for easy access and instant copying. Our comprehensive bracket database includes round brackets, square brackets, curly brackets, angle brackets, decorative brackets, ornamental brackets, and punctuation elements that enhance any type of digital content. Whether you\'re creating formatted documents, designing structured social media posts, developing code-based websites, or working on punctuation creative projects, our bracket symbol collection provides the perfect punctuation characters to express your structured ideas clearly and attractively.',
        p2: 'Bracket symbols and punctuation characters play a crucial role in modern digital communication, helping to convey structural information more effectively than words alone. They\'re essential for programming documentation, where precise bracket notation can prevent misunderstandings and improve code clarity. In creative fields, bracket symbols add structural visual interest and can help establish formatted brand identity or punctuation artistic style. For international communication, many bracket symbols transcend language barriers, making structured content more accessible to global audiences.',
        p3: 'We maintain our bracket symbol collection with rigorous attention to punctuation quality and structural compatibility, regularly testing each bracket character across different platforms and updating our punctuation database as new Unicode bracket standards are released. This ensures that every bracket symbol in our collection works reliably across various devices and applications, from mobile phones to desktop computers, from web browsers to word processors.',
        keywords: 'bracket symbol, bracket copy paste, square brackets, round brackets, curly brackets, angle brackets, decorative brackets, punctuation symbols'
    },
    'default': {
        h2: 'Symbol Collection - Copy & Paste Special Characters',
        h3_1: 'Comprehensive Unicode Symbols and Special Characters',
        p1: 'Discover the ultimate collection of symbols and special characters, featuring thousands of Unicode symbols carefully organized for easy access and instant copying. Our comprehensive database includes mathematical symbols, currency signs, punctuation marks, geometric shapes, technical symbols, and decorative elements that enhance any type of digital content. Whether you\'re creating professional documents, designing social media posts, developing websites, or working on creative projects, our symbol collection provides the perfect characters to express your ideas clearly and attractively. Each symbol is Unicode-standard, ensuring compatibility across all modern devices, operating systems, and applications. From basic punctuation to complex mathematical notation, from simple shapes to intricate decorative elements, our collection serves professionals, students, designers, and anyone who needs reliable access to special characters.',
        p2: 'Special characters and symbols play a crucial role in modern digital communication, helping to convey information more effectively than words alone. They\'re essential for technical documentation, where precise notation can prevent misunderstandings and improve clarity. In creative fields, symbols add visual interest and can help establish brand identity or artistic style. For international communication, many symbols transcend language barriers, making content more accessible to global audiences. Our collection is particularly valuable for educators creating engaging learning materials, businesses developing professional presentations, and content creators who want to make their work more visually appealing and memorable.',
        p3: 'We maintain our symbol collection with rigorous attention to quality and compatibility, regularly testing each character across different platforms and updating our database as new Unicode standards are released. This ensures that every symbol in our collection works reliably across various devices and applications, from mobile phones to desktop computers, from web browsers to word processors. Our user-friendly interface makes it easy to find exactly the symbol you need, with intuitive categories and search functionality that saves time and improves productivity. Whether you need a single special character or want to explore our entire collection, our platform provides fast, reliable access to the symbols that make your content more effective and engaging.',
        keywords: 'symbols, emoji, copy paste, text symbols, special characters, unicode symbols, cool symbols, symbol collection'
    }
};

// Function to determine page type and get appropriate content
function getPageTypeContent(filename) {
    const pageKey = filename.replace('.html', '');
    
    // Check for specific page types
    if (pageKey.includes('star')) return keywordBasedContent['star-symbol'];
    if (pageKey.includes('heart')) return keywordBasedContent['heart-symbol'];
    if (pageKey.includes('arrow')) return keywordBasedContent['arrow-symbol'];
    if (pageKey.includes('music')) return keywordBasedContent['music-symbol'];
    if (pageKey.includes('lenny-face')) return keywordBasedContent['lenny-face'];
    if (pageKey.includes('animal')) return keywordBasedContent['animal-emoji'];
    if (pageKey.includes('aesthetic')) return keywordBasedContent['aesthetic-symbols'];
    if (pageKey.includes('currency')) return keywordBasedContent['currency-symbol'];
    if (pageKey.includes('circle')) return keywordBasedContent['circle-symbol'];
    if (pageKey.includes('square')) return keywordBasedContent['square-symbol'];
    if (pageKey.includes('triangle')) return keywordBasedContent['triangle-symbol'];
    if (pageKey.includes('bracket')) return keywordBasedContent['bracket-symbol'];
    
    return keywordBasedContent['default'];
}

// Function to update semantic content in HTML file
function updateSemanticContent(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const filename = path.basename(filePath);
        const pageContent = getPageTypeContent(filename);
        
        // Create keyword-optimized semantic HTML structure
        const semanticHTML = `
\t<main class="semantic-content">
\t\t<section class="symbol-info">
\t\t\t<h2>${pageContent.h2}</h2>
\t\t\t<p>${pageContent.p1}</p>
\t\t\t
\t\t\t<h3>${pageContent.h3_1}</h3>
\t\t\t<p>${pageContent.p2}</p>
\t\t\t
\t\t\t<h3>How to Copy and Use These Symbols</h3>
\t\t\t<p>${pageContent.p3}</p>
\t\t</section>
\t</main>`;
        
        // Replace existing semantic content
        const semanticStart = content.indexOf('<main class="semantic-content">');
        const semanticEnd = content.indexOf('</main>');
        
        if (semanticStart !== -1 && semanticEnd !== -1) {
            const beforeSemantic = content.substring(0, semanticStart);
            const afterSemantic = content.substring(semanticEnd + 7); // +7 for '</main>'
            
            const newContent = beforeSemantic + semanticHTML + afterSemantic;
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✓ Updated keyword-based semantic content in ${filename}`);
        } else {
            console.log(`✗ No existing semantic content found in ${filename}`);
        }
        
    } catch (error) {
        console.error(`✗ Error processing ${filePath}:`, error.message);
    }
}

// Main function
function applyKeywordBasedSemanticContent() {
    const currentDir = __dirname;
    const files = fs.readdirSync(currentDir);
    
    const htmlFiles = files.filter(file => 
        file.endsWith('.html') && 
        !file.startsWith('.') &&
        file !== 'index.html' // Skip index.html as it may have special structure
    );
    
    console.log(`Applying keyword-based semantic SEO content to ${htmlFiles.length} HTML files...\n`);
    
    htmlFiles.forEach(file => {
        const filePath = path.join(currentDir, file);
        updateSemanticContent(filePath);
    });
    
    console.log(`\n✅ Completed applying keyword-based semantic SEO content to all HTML files!`);
    console.log('Each page now has content optimized for its specific keywords and page type.');
}

// Run the script
applyKeywordBasedSemanticContent();
