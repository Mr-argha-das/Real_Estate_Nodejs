const express = require("express");
const cors = require("cors");
const Router = require("./routers/Router");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const database = require("./config/db");

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

// Routers
app.use("/api", Router);
app.use("/uploads", express.static("uploads"));

app.listen(port, "localhost", () => {
  console.log(`Server Run Port: ${port}`);
});
