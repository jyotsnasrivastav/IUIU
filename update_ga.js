const fs = require('fs');
const path = require('path');

// The old GA tracking code to be replaced
const oldGACode = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-NP21SYTW1D"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    gtag('config', 'G-NP21SYTW1D');
    </script>`;

// The new GA tracking code
const newGACode = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NP21SYTW1D"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-NP21SYTW1D');
</script>`;

// Function to process HTML files
async function updateGACode() {
  try {
    // Get all HTML files in the directory and subdirectories
    const files = await getAllFiles(path.join(__dirname));
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    console.log(`Found ${htmlFiles.length} HTML files to process.`);

    let updatedCount = 0;
    let notFoundCount = 0;
    let errorCount = 0;

    for (const file of htmlFiles) {
      try {
        // Read file content
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if the old GA code exists in the file
        if (content.includes('gtag/js?id=G-NP21SYTW1D')) {
          // Replace the old GA code with the new one
          const newContent = content.replace(
            /<script async[\s\S]*?gtag\('config', 'G-NP21SYTW1D'\);[\s\s]*?<\/script>/,
            newGACode
          );
          
          // Write the updated content back to the file
          fs.writeFileSync(file, newContent, 'utf8');
          console.log(`Updated GA code in ${file}`);
          updatedCount++;
        } else {
          console.log(`GA code not found in ${file}`);
          notFoundCount++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
        errorCount++;
      }
    }

    console.log('\nUpdate complete!');
    console.log(`Total files processed: ${htmlFiles.length}`);
    console.log(`Files updated: ${updatedCount}`);
    console.log(`Files without GA code: ${notFoundCount}`);
    console.log(`Errors: ${errorCount}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Helper function to get all files in directory and subdirectories
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (path.extname(filePath).toLowerCase() === '.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Run the script
updateGACode();
