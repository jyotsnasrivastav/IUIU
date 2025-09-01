const fs = require('fs');
const path = require('path');

const antiCLSCSS = `
		<style>
			/* Anti-CLS guardrails for header & language dropdown */
			.modern-header, .main-nav { min-height: 60px }
			.nav-right .language-selector { position: relative }
			.nav-right .language-selector .language-dropdown { position: absolute; top: 100%; right: 0; max-height: 60vh; overflow: auto; contain: layout paint; transform: translateZ(0) }
			.nav-right .language-selector .language-dropdown[aria-hidden="true"] { display: none }
			.outcont, .container, .maindata, .footer { contain: layout style paint }
		</style>`;

const directory = __dirname;

// Get all HTML files
try {
  const files = fs.readdirSync(directory).filter(file => 
    file.endsWith('.html') && file !== 'font-generator.html'
  );

  let updatedCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has the anti-CLS CSS
    if (content.includes('Anti-CLS guardrails')) {
      console.log(`Skipped (already has fixes): ${file}`);
      return;
    }
    
    // Insert right after existing style tag or before </head>
    const insertPoint = content.indexOf('</head>');
    if (insertPoint !== -1) {
      content = content.slice(0, insertPoint) + antiCLSCSS + content.slice(insertPoint);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${file}`);
      updatedCount++;
    } else {
      console.log(`Skipped (no head tag): ${file}`);
    }
  });
  
  console.log(`\n✅ Applied CLS fixes to ${updatedCount} files.`);
  
} catch (err) {
  console.error('Error applying CLS fixes:', err);
  process.exit(1);
}
