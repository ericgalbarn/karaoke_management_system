const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const imagePaths = {
  "Phòng trống VIP": "./img/blue-crown.png",
  "Phòng chờ": "./img/yellow-desktop.png",
  "Phòng đang sử dụng": "./img/red-computer.png",
  "Phòng trống": "./img/blue-computer.png",
  "Phòng tạm": "./img/orange-computer.png",
};

const app = express();
const port = 5005;

app.use(cors());
app.use(bodyParser.json());

app.post("/update-json", (req, res) => {
  console.log("Request body:", req.body); // Log the request body
  const data = req.body;

  // Add the image path based on the type
  if (data.type && imagePaths[data.type]) {
    data.image = imagePaths[data.type];
  }

  const dataFilePath = path.join(__dirname, "data.json");

  fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res.status(500).send("Error writing to file");
    }
    res.send("File successfully updated");
  });
});

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
