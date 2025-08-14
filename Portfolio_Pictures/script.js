// rename-images.js
import fs from "fs";
import path from "path";
import crypto from "crypto";

const baseDir = "./images";

// Function to generate random file name
function getRandomName(extension) {
  return crypto.randomBytes(8).toString("hex") + extension;
}

// Loop through all folders inside "images"
fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(folder => {
    const folderPath = path.join(baseDir, folder.name);

    fs.readdirSync(folderPath).forEach(file => {
      const oldPath = path.join(folderPath, file);
      const ext = path.extname(file); // Keep the original extension
      const newName = getRandomName(ext);
      const newPath = path.join(folderPath, newName);

      fs.renameSync(oldPath, newPath);
      console.log(`✅ Renamed: ${file} → ${newName}`);
    });
  });

console.log("🎉 All images renamed successfully!");
