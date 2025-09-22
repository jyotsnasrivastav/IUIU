const fs = require('fs');
const path = require('path');

// Old and new GA tracking IDs
const oldTrackingId = 'G-NP21SYTW1D';
const newTrackingId = 'G-M7MH3WM8';

// Function to process HTML files
async function updateGATrackingId() {
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
        
        // Check if the old GA tracking ID exists in the file
        if (content.includes(oldTrackingId)) {
          // Replace the old tracking ID with the new one
          const newContent = content.replace(
            new RegExp(oldTrackingId, 'g'),
            newTrackingId
          );
          
          // Write the updated content back to the file
          fs.writeFileSync(file, newContent, 'utf8');
          console.log(`Updated GA tracking ID in ${file}`);
          updatedCount++;
        } else {
          console.log(`GA tracking ID ${oldTrackingId} not found in ${file}`);
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
    console.log(`Files without old tracking ID: ${notFoundCount}`);
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
updateGATrackingId();
