const fs = require('fs');
const path = require('path');

// Standardized semantic content for all pages
const standardSemanticContent = `
\t<main class="semantic-content">
\t\t<section class="symbol-info">
\t\t\t<h2>Symbol Collection - Copy & Paste Special Characters</h2>
\t\t\t<p>Discover the ultimate collection of symbols and special characters, featuring thousands of Unicode symbols carefully organized for easy access and instant copying. Our comprehensive database includes mathematical symbols, currency signs, punctuation marks, geometric shapes, technical symbols, and decorative elements that enhance any type of digital content. Whether you're creating professional documents, designing social media posts, developing websites, or working on creative projects, our symbol collection provides the perfect characters to express your ideas clearly and attractively. Each symbol is Unicode-standard, ensuring compatibility across all modern devices, operating systems, and applications. From basic punctuation to complex mathematical notation, from simple shapes to intricate decorative elements, our collection serves professionals, students, designers, and anyone who needs reliable access to special characters.</p>
\t\t\t
\t\t\t<h3>Comprehensive Unicode Symbols and Special Characters</h3>
\t\t\t<p>Special characters and symbols play a crucial role in modern digital communication, helping to convey information more effectively than words alone. They're essential for technical documentation, where precise notation can prevent misunderstandings and improve clarity. In creative fields, symbols add visual interest and can help establish brand identity or artistic style. For international communication, many symbols transcend language barriers, making content more accessible to global audiences. Our collection is particularly valuable for educators creating engaging learning materials, businesses developing professional presentations, and content creators who want to make their work more visually appealing and memorable.</p>
\t\t\t
\t\t\t<h3>How to Copy and Use These Symbols</h3>
\t\t\t<p>We maintain our symbol collection with rigorous attention to quality and compatibility, regularly testing each character across different platforms and updating our database as new Unicode standards are released. This ensures that every symbol in our collection works reliably across various devices and applications, from mobile phones to desktop computers, from web browsers to word processors. Our user-friendly interface makes it easy to find exactly the symbol you need, with intuitive categories and search functionality that saves time and improves productivity. Whether you need a single special character or want to explore our entire collection, our platform provides fast, reliable access to the symbols that make your content more effective and engaging.</p>
\t\t</section>
\t</main>`;

function updateSemanticContent(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const filename = path.basename(filePath);
        
        // Check if file has existing semantic content
        const semanticStart = content.indexOf('<main class="semantic-content">');
        const semanticEnd = content.indexOf('</main>');
        
        if (semanticStart !== -1 && semanticEnd !== -1) {
            // Replace existing semantic content
            const beforeSemantic = content.substring(0, semanticStart);
            const afterSemantic = content.substring(semanticEnd + 7); // +7 for '</main>'
            
            const newContent = beforeSemantic + standardSemanticContent + afterSemantic;
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✓ Updated semantic content in ${filename}`);
        } else {
            // Add semantic content if not present
            let insertionPoint = -1;
            
            if (content.includes('<footer') || content.includes('class="footer"')) {
                const footerMatch = content.match(/(\s*<footer|\s*<div[^>]*class="footer")/);
                if (footerMatch) {
                    insertionPoint = content.indexOf(footerMatch[0]);
                }
            }
            
            if (insertionPoint === -1 && content.includes('</body>')) {
                insertionPoint = content.indexOf('</body>');
            }
            
            if (insertionPoint !== -1) {
                const newContent = content.slice(0, insertionPoint) + standardSemanticContent + '\n' + content.slice(insertionPoint);
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`✓ Added semantic content to ${filename}`);
            } else {
                console.log(`✗ Could not find insertion point in ${filename}`);
            }
        }
        
    } catch (error) {
        console.error(`✗ Error processing ${filePath}:`, error.message);
    }
}

// Main function
function standardizeAllSemanticContent() {
    const currentDir = __dirname;
    const files = fs.readdirSync(currentDir);
    
    const htmlFiles = files.filter(file => 
        file.endsWith('.html') && 
        !file.startsWith('.') &&
        file !== 'index.html' // Skip index.html as it may have special structure
    );
    
    console.log(`Standardizing semantic SEO content across ${htmlFiles.length} HTML files...\n`);
    
    htmlFiles.forEach(file => {
        const filePath = path.join(currentDir, file);
        updateSemanticContent(filePath);
    });
    
    console.log(`\n✅ Completed standardizing semantic SEO content across all HTML files!`);
    console.log('All pages now have identical semantic content structure with the exact text provided.');
}

// Run the script
standardizeAllSemanticContent();
