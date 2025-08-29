// CSS and JS Minification and Compression
// Node.js script to minify and compress assets

const fs = require('fs');
const path = require('path');

// Simple CSS minifier
function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
        .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
        .replace(/;\s*/g, ';') // Remove spaces after semicolon
        .replace(/,\s*/g, ',') // Remove spaces after comma
        .replace(/:\s*/g, ':') // Remove spaces after colon
        .replace(/\s*>\s*/g, '>') // Remove spaces around >
        .replace(/\s*\+\s*/g, '+') // Remove spaces around +
        .replace(/\s*~\s*/g, '~') // Remove spaces around ~
        .trim();
}

// Simple JS minifier
function minifyJS(js) {
    return js
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/.*$/gm, '') // Remove line comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
        .replace(/\s*{\s*/g, '{') // Remove spaces around braces
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';') // Remove spaces around semicolon
        .replace(/\s*,\s*/g, ',') // Remove spaces around comma
        .replace(/\s*\(\s*/g, '(') // Remove spaces around parentheses
        .replace(/\s*\)\s*/g, ')')
        .trim();
}

// Minify CSS files
const cssFiles = ['main.css', 'critical-performance.css', 'footer-fix.css'];
cssFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const minified = minifyCSS(content);
        const minifiedPath = filePath.replace('.css', '.min.css');
        fs.writeFileSync(minifiedPath, minified);
        console.log(`Minified ${file} -> ${path.basename(minifiedPath)}`);
        console.log(`Size reduction: ${content.length} -> ${minified.length} bytes`);
    }
});

// Minify JS files
const jsFiles = [
    'critical-performance-fix.js',
    'ultra-performance-optimizer.js', 
    'image-optimizer.js',
    'instant-performance-fix.js'
];

jsFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const minified = minifyJS(content);
        const minifiedPath = filePath.replace('.js', '.min.js');
        fs.writeFileSync(minifiedPath, minified);
        console.log(`Minified ${file} -> ${path.basename(minifiedPath)}`);
        console.log(`Size reduction: ${content.length} -> ${minified.length} bytes`);
    }
});

console.log('Minification complete!');
