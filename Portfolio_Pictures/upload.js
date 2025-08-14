// upload-images.js
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { createClient } from "@supabase/supabase-js";

// ====== CONFIG ======
const BASE_DIR = "./images"; // Change this to your main images directory

// Cloudinary config
cloudinary.config({
  cloud_name: "dk4pwokx3",
  api_key: "416725619821285",
  api_secret: "8UAinZzDSFntc2aHPbqDb5yrTEk",
});

// Supabase config
const supabase = createClient(
  "https://jpcapezxtugpijsrgtkx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwY2FwZXp4dHVncGlqc3JndGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MjYwNjIsImV4cCI6MjA3MDQwMjA2Mn0.pIBrPNtPZDemWPDOd5kunQRY0dSKRp7XQAc2vwulvnw"
);

// ====== MAIN FUNCTION ======
async function uploadAllFolders() {
  try {
    const folders = fs.readdirSync(BASE_DIR).filter((f) =>
      fs.statSync(path.join(BASE_DIR, f)).isDirectory()
    );

    for (const folder of folders) {
      const folderPath = path.join(BASE_DIR, folder);
      const files = fs.readdirSync(folderPath).filter((f) =>
        /\.(jpg|jpeg|png|webp)$/i.test(f)
      );

      console.log(`📂 Uploading images from folder: ${folder}`);

      for (const file of files) {
        const filePath = path.join(folderPath, file);

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
          folder: folder, // Cloudinary folder name
        });

        console.log(`✅ Uploaded: ${file} → ${result.secure_url}`);

        // Insert into Supabase
        const { error } = await supabase.from("images").insert([
          {
            url: result.secure_url,
            folder: folder,
          },
        ]);

        if (error) {
          console.error(`❌ Error inserting into Supabase:`, error.message);
        } else {
          console.log(`📦 Added to DB: (${folder})`);
        }
      }
    }

    console.log("🎉 All uploads completed!");
  } catch (err) {
    console.error("Error:", err);
  }
}

uploadAllFolders();
