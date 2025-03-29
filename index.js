const express = require("express");
const cors = require("cors");
const Router = require("./routers/Router");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const database = require("./config/db");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const os = require("os");
const Banner = require("./models/banner_model"); // Import your Mongoose model

//Server Terms
const app = express();
const port = 8080;

//Applycation Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
); //Set Cors Credentials Before Live
app.use(cookieParser());

// Database Connection
database();

app.get("/health", (req, res) => {
  res.status(200).send("Healthy");
});

// DELETE a specific image from a banner
app.delete("/api/banner/:bannerId/image/:imgIndex", async (req, res) => {
  try {
    const { bannerId, imgIndex } = req.params;

    // Find the banner by ID
    const banner = await Banner.findById(bannerId);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // Check if the image index is valid
    if (imgIndex < 0 || imgIndex >= banner.images.length) {
      return res.status(400).json({ message: "Invalid image index" });
    }

    // Remove the image from the array
    banner.images.splice(imgIndex, 1);

    // Save the updated banner
    await banner.save();

    res.json({ message: "Image deleted successfully", banner });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API to download the 'uploads' folder as a ZIP file
app.get("/download-uploadFolder", (req, res) => {
  const folderPath = path.resolve("uploads"); // Ensure absolute path
  const zipFileName = "uploads.zip";
  const zipFilePath = path.join(os.tmpdir(), zipFileName); // Store in temporary directory

  // Ensure the folder exists
  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ error: "Folder not found" });
  }

  res.attachment(zipFileName);
  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.pipe(res);

  archive.directory(folderPath, false);
  archive.finalize().catch((err) => {
    console.error("Error creating zip:", err);
    res.status(500).json({ error: "Error creating zip file" });
  });
});

// Routers
app.use("/api", Router);
app.use("/uploads", express.static("uploads"));

app.listen(8080, "0.0.0.0", () => {
  console.log(`Server Run Port: ${port}`);
});
