const fs = require('fs');
const path = require('path');

// Function to rename all .js files to .ts in the current directory
function renameJsToTs() {
  const currentDir = __dirname; // Get the current directory

  // Read all files in the current directory
  fs.readdir(currentDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // Filter files with .js extension
    const jsFiles = files.filter((file) => path.extname(file) === '.js');

    if (jsFiles.length === 0) {
      console.log('No .js files found in the current directory.');
      return;
    }

    // Rename each .js file to .ts
    jsFiles.forEach((file) => {
      const oldPath = path.join(currentDir, file);
      const newPath = path.join(currentDir, file.replace('.js', '.ts'));

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error(`Error renaming file ${file}:`, err);
        } else {
          console.log(`Renamed: ${file} -> ${path.basename(newPath)}`);
        }
      });
    });
  });
}

// Run the function
renameJsToTs();
