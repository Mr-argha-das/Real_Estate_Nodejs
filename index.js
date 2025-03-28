const express = require("express");
const cors = require("cors");
const Router = require("./routers/Router");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const database = require("./config/db");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

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

// API to download the 'uploads' folder as a ZIP file
app.get("/download-uploadFolder", (req, res) => {
  const folderPath = path.join(__dirname, "uploads"); // Folder to be zipped
  const zipFileName = "uploads.zip";
  const zipFilePath = path.join(__dirname, zipFileName);

  // Ensure the folder exists
  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ error: "Folder not found" });
  }

  // Create a zip stream
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  // Pipe the archive data to the output file
  archive.pipe(output);
  archive.directory(folderPath, false);
  archive.finalize();

  // Once the zip is ready, send it as a response
  output.on("close", () => {
    res.download(zipFilePath, zipFileName, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).json({ error: "Error downloading the file" });
      }

      // Delete the zip file after download
      fs.unlinkSync(zipFilePath);
    });
  });

  output.on("error", (err) => {
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
