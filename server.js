const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Import the CORS middleware

const imagePaths = {
  "Phòng trống VIP": "./img/blue-crown.png",
  "Phòng trống VIP": "./img/orange-crown.png",
  "Phòng trống VIP": "./img/red-crown.png",
  "Phòng trống VIP": "./img/yellow-crown.png",

  // Add other mappings here if needed
};

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Endpoint to update data.json
app.post("/update-json", (req, res) => {
  const data = req.body;

  // Add the image path based on the type
  if (newRoomData.type && imagePaths[newRoomData.type]) {
    newRoomData.image = imagePaths[newRoomData.type];
  }

  const dataFilePath = path.join(__dirname, "data.json"); // Constructs the full path to data.json

  fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error writing to file");
    }
    res.send("File successfully updated");
  });
});

// Optional: A route for the root URL to avoid "CANNOT GET /" error
app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
