const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

const ML_API_URL = "https://my-own-api-rrre.onrender.com/predict"; // Your Flask API endpoint

// Route to render the HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API Route to send data to ML model
app.post("/predict", async (req, res) => {
    try {
        const response = await axios.post(ML_API_URL, req.body);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error connecting to ML API" });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
