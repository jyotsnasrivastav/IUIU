const fs = require('fs');
const path = require('path');

// Missing pages that need to be created
const missingPages = [
    {
        filename: 'math-symbol.html',
        title: 'Math Symbols ∑∏∫ | Mathematical Copy Paste',
        description: 'Copy and paste math symbols including ∑ (sum), ∏ (product), ∫ (integral), ∞ (infinity), ± (plus-minus), ≠ (not equal), ≤ (less than or equal), ≥ (greater than or equal), and more mathematical symbols.',
        keywords: 'math symbols, mathematical symbols, sum symbol, integral symbol, infinity symbol, plus minus, mathematical notation',
        symbols: ['∑', '∏', '∫', '∞', '±', '≠', '≤', '≥', '√', '∂', '∇', '∆', '∈', '∉', '⊂', '⊃', '∪', '∩', '∅', '∝', '∴', '∵', '≈', '≡', '≢', '∼', '∝', '∀', '∃', '∄', '⊕', '⊗', '⊙', '⊥', '∥', '∠', '∡', '∢', '°', '′', '″', '‴']
    },
    {
        filename: 'peace-symbol.html',
        title: 'Peace Symbols ☮ | Peace Sign Copy Paste',
        description: 'Copy and paste peace symbols including ☮ (peace sign), ✌ (victory hand), 🕊 (dove), and other peace-related symbols for spreading love and harmony.',
        keywords: 'peace symbol, peace sign, victory hand, dove symbol, harmony symbols, love symbols',
        symbols: ['☮', '✌', '🕊', '☯', '♡', '♥', '💙', '💚', '💛', '💜', '🤍', '🖤', '💗', '💖', '💕', '💓', '💞', '💝', '💘', '💟', '☪', '✡', '🔯', '☸', '☦', '✝', '☨', '⚛', '🕎', '☬']
    },
    {
        filename: 'phone-symbol.html',
        title: 'Phone Symbols ☎📱 | Telephone Copy Paste',
        description: 'Copy and paste phone symbols including ☎ (telephone), 📱 (mobile phone), 📞 (phone receiver), and other communication symbols.',
        keywords: 'phone symbols, telephone symbol, mobile phone, communication symbols, call symbols',
        symbols: ['☎', '📱', '📞', '📟', '📠', '☏', '📲', '📳', '📴', '📵', '📶', '📡', '📢', '📣', '📯', '📻', '📺', '📹', '📷', '📸', '🎥', '🎬', '🎞', '📽', '🎙', '🎚', '🎛', '📼', '💿', '📀']
    },
    {
        filename: 'playing-cards-symbol.html',
        title: 'Playing Card Symbols ♠♥♦♣ | Card Suits Copy Paste',
        description: 'Copy and paste playing card symbols including ♠ (spades), ♥ (hearts), ♦ (diamonds), ♣ (clubs), and other card game symbols.',
        keywords: 'playing card symbols, card suits, spades, hearts, diamonds, clubs, poker symbols',
        symbols: ['♠', '♥', '♦', '♣', '♤', '♡', '♢', '♧', '🂠', '🂡', '🂢', '🂣', '🂤', '🂥', '🂦', '🂧', '🂨', '🂩', '🂪', '🂫', '🂬', '🂭', '🂮', '🃏', '🎰', '🎲', '🎯', '🎱', '🎳', '🎮']
    },
    {
        filename: 'left-arrow-symbol.html',
        title: 'Left Arrow Symbols ← | Leftward Arrow Copy Paste',
        description: 'Copy and paste left arrow symbols including ← (leftward arrow), ⇐ (double leftward arrow), ↖ (northwest arrow), and other left-pointing arrows.',
        keywords: 'left arrow symbols, leftward arrow, back arrow, previous arrow, navigation symbols',
        symbols: ['←', '⇐', '↖', '↙', '⬅', '◀', '◁', '⊲', '⊳', '⟵', '⟸', '⟻', '⟽', '↞', '↢', '↤', '↦', '↩', '↪', '↫', '↬', '↭', '↮', '↯', '↰', '↱', '↲', '↳', '↴', '↵']
    },
    {
        filename: 'right-arrow-symbol.html',
        title: 'Right Arrow Symbols → | Rightward Arrow Copy Paste',
        description: 'Copy and paste right arrow symbols including → (rightward arrow), ⇒ (double rightward arrow), ↗ (northeast arrow), and other right-pointing arrows.',
        keywords: 'right arrow symbols, rightward arrow, forward arrow, next arrow, navigation symbols',
        symbols: ['→', '⇒', '↗', '↘', '➡', '▶', '▷', '⊲', '⊳', '⟶', '⟹', '⟼', '⟾', '↠', '↣', '↥', '↦', '↩', '↪', '↫', '↬', '↭', '↮', '↯', '↰', '↱', '↲', '↳', '↴', '↵']
    },
    {
        filename: 'straight-lines.html',
        title: 'Straight Line Symbols ─│ | Line Characters Copy Paste',
        description: 'Copy and paste straight line symbols including ─ (horizontal line), │ (vertical line), ┌ (top-left corner), and other line drawing characters.',
        keywords: 'straight line symbols, line characters, horizontal line, vertical line, box drawing, border symbols',
        symbols: ['─', '│', '┌', '┐', '└', '┘', '├', '┤', '┬', '┴', '┼', '═', '║', '╔', '╗', '╚', '╝', '╠', '╣', '╦', '╩', '╬', '╭', '╮', '╯', '╰', '╱', '╲', '╳', '╴', '╵', '╶', '╷', '╸', '╹', '╺', '╻', '╼', '╽', '╾', '╿']
    },
    {
        filename: 'text-art.html',
        title: 'Text Art Symbols ░▒▓ | ASCII Art Copy Paste',
        description: 'Copy and paste text art symbols including ░ (light shade), ▒ (medium shade), ▓ (dark shade), and other ASCII art characters for creating text-based artwork.',
        keywords: 'text art symbols, ascii art, shade symbols, block characters, pixel art, text graphics',
        symbols: ['░', '▒', '▓', '█', '▄', '▀', '▌', '▐', '▆', '▇', '▉', '▊', '▋', '▍', '▎', '▏', '■', '□', '▢', '▣', '▤', '▥', '▦', '▧', '▨', '▩', '▪', '▫', '▬', '▭', '▮', '▯', '▰', '▱', '▲', '△', '▴', '▵', '▶', '▷', '▸', '▹', '►', '▻', '▼', '▽', '▾', '▿', '◀', '◁', '◂', '◃', '◄', '◅']
    }
];

function createMissingPages() {
    let createdCount = 0;
    let errorCount = 0;
    const results = [];

    console.log('🔧 Creating missing symbol pages...\n');

    missingPages.forEach(pageData => {
        const filePath = path.join(__dirname, pageData.filename);
        
        try {
            if (fs.existsSync(filePath)) {
                console.log(`⚠️  File already exists: ${pageData.filename}`);
                results.push({ file: pageData.filename, status: 'already_exists' });
                return;
            }

            const htmlContent = generatePageHTML(pageData);
            fs.writeFileSync(filePath, htmlContent, 'utf8');
            
            console.log(`✅ Created: ${pageData.filename}`);
            results.push({ file: pageData.filename, status: 'created', symbols_count: pageData.symbols.length });
            createdCount++;
            
        } catch (error) {
            console.log(`❌ Error creating ${pageData.filename}: ${error.message}`);
            results.push({ file: pageData.filename, status: 'error', error: error.message });
            errorCount++;
        }
    });

    // Generate summary report
    console.log('\n📊 SUMMARY REPORT');
    console.log('==================');
    console.log(`✅ Pages created: ${createdCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📁 Total pages processed: ${missingPages.length}`);

    // Save detailed results
    const reportPath = path.join(__dirname, 'missing-pages-creation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
        timestamp: new Date().toISOString(),
        summary: {
            total_pages: missingPages.length,
            created_count: createdCount,
            error_count: errorCount
        },
        results: results
    }, null, 2));

    console.log(`\n📄 Detailed report saved to: missing-pages-creation-report.json`);
}

function generatePageHTML(pageData) {
    const symbolsHTML = pageData.symbols.map(symbol => 
        `<div class="symbol" onclick="copyToClipboard('${symbol}', event)">${symbol}</div>`
    ).join('\n\t\t\t');

    return `<!DOCTYPE html>
<html lang="en">
<head>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7064720037053690"
     crossorigin="anonymous"></script>
    <!-- Preconnect for faster loading -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link rel="preload" href="main.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
	<noscript><link rel="stylesheet" href="main.css" /></noscript>
	<title>${pageData.title}</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Resource hints for performance -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//www.google-analytics.com" />
	<meta name="description" content="${pageData.description}" />
	<meta name="keywords" content="${pageData.keywords}" />
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content="#230AC7" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta name="apple-mobile-web-app-title" content="Cool Symbols" />
	<link rel="icon" type="image/ico" sizes="16x16" href="img/favicon.ico" />
	<link rel="canonical" href="https://www.symbolsemoji.com/${pageData.filename}" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://www.symbolsemoji.com/${pageData.filename}" />
	<meta property="twitter:title" content="${pageData.title}" />
	<meta property="twitter:description" content="${pageData.description}" />
	<link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png" />
	<link rel="apple-touch-icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png" />
	<link rel="apple-touch-icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="img/apple-touch-icon.png" />
</head>
<body>
	<header class="modern-header" role="banner">
		<nav class="main-nav">
			<a href="index.html" class="main-logo">Symbols Emoji</a>
			<div class="nav-center">
				<a href="all-symbol.html" class="nav-item">All Symbols</a>
				<a href="aesthetic-symbols.html" class="nav-item">Aesthetic</a>
				<a href="heart-symbol.html" class="nav-item">Heart</a>
				<a href="arrow-symbol.html" class="nav-item">Arrow</a>
			</div>
		</nav>
	</header>

	<div class="mainbox">
		<div class="outcont">
			<div class="symbolContainer">
				<div class="rightContainer">
					<div class="maindata">
						<h1 class="titlesymbol">${pageData.title.replace(' | ', ' ')}</h1>
						<div class="symbol-grid">
							${symbolsHTML}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="info-title">
		<h2>${pageData.title.split(' |')[0]} Copy and Paste</h2>
		<div class="info">
			<p>${pageData.description}</p>
			<main class="semantic-content">
				<section class="symbol-info">
					<h2>How to Copy and Use These Symbols</h2>
					<p>Simply click on any symbol to copy it to your clipboard. These symbols are compatible with all modern devices and applications, including social media platforms, messaging apps, and document editors.</p>
					
					<h3>Symbol Compatibility</h3>
					<p>All symbols in this collection are Unicode characters that display correctly across different operating systems and applications. They work on Windows, Mac, iOS, Android, and web browsers.</p>
				</section>
			</main>
		</div>
	</div>

	<div class="footer" role="contentinfo">
		<div class="footer-content">
			<div class="footer-left">
				<p class="site-name">Symbols Emoji.com</p>
			</div>
			<div class="footer-links">
				<a href="privacy.html" class="footer-link">Privacy</a>
				<a href="terms.html" class="footer-link">Terms</a>
				<a href="contact.html" class="footer-link">Contact</a>
			</div>
			<div class="footer-copyright">
				<p class="copyright">© 2025 SymbolsEmoji.com</p>
			</div>
		</div>
	</div>

	<script src="script.min.js" defer></script>
	<script src="universal-share-modal.js" defer></script>
</body>
</html>`;
}

// Run the creation process
createMissingPages();
