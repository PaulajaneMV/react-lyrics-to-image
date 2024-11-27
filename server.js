const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 5000;

// Replace with your actual Make.com webhook URL
const MAKE_COM_WEBHOOK_URL = "https://hook.eu2.make.com/si4vn22dqysqrrokut2e19d7myh6f815";

app.use(cors());
app.use(bodyParser.json());

let latestImageUrl = ""; // Store the latest image URL

// Endpoint to receive the webhook from the frontend and send lyrics to Make.com
app.post("/webhook", async (req, res) => {
  const { lyrics } = req.body;
  console.log("Received lyrics:", lyrics);

  if (!lyrics || typeof lyrics !== "string") {
    console.error("Invalid lyrics received.");
    return res.status(400).send("Invalid lyrics provided.");
  }

  try {
    console.log("Forwarding lyrics to Make.com...");
    const response = await axios.post(MAKE_COM_WEBHOOK_URL, { lyrics });
    console.log("Successfully sent lyrics to Make.com. Response:", response.data);
    res.status(200).send("Lyrics received. Make.com will process this.");
  } catch (error) {
    console.error("Error sending lyrics to Make.com:", error.response?.data || error.message);
    res.status(500).send("Failed to send lyrics to Make.com.");
  }
});

// Endpoint to receive the generated image URL from Make.com
app.post("/make-webhook", (req, res) => {
  const { imageUrl } = req.body;

  if (imageUrl) {
    console.log("Received image URL:", imageUrl);
    latestImageUrl = imageUrl; // Update the latest image URL
    res.status(200).send("Image URL received.");
  } else {
    console.error("No imageUrl found in the request body!");
    res.status(400).send("Invalid request, imageUrl is required.");
  }
});

// Endpoint for React frontend to fetch the latest image URL
app.get("/latest-image", (req, res) => {
  console.log("Serving latest image URL:", latestImageUrl);
  res.json({ imageUrl: latestImageUrl });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
