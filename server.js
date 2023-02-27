require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const CLIENT_CONFIG = require("./config/client");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use(credentials);
app.use(cors(corsOptions));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const destPath = path.join(
      __dirname,
      "uploads",
      `${req.body[CLIENT_CONFIG.CUSTODIAN_KEY]}`
    );
    fs.mkdirSync(destPath, { recursive: true });
    callback(null, destPath);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });
// Upload Endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({
      message: `No files found.`,
    });
  }

  const multerUpload = uploads.array(CLIENT_CONFIG.FILE_KEY);

  multerUpload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: err,
        isUploaded: false,
      });
    } else {
      res.json({
        body: req.body,
        length: req.files.length,
        isUploaded: true,
      });
    }
  });
});

app.listen(8080, () => console.log(`Server running on port ${PORT}`));
