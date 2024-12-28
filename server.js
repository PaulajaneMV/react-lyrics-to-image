const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Replace with your actual Make.com webhook URL
const MAKE_COM_WEBHOOK_URL = "https://hook.eu2.make.com/sxicmi9ls5m4v4ci0ylrytcxzy9w3bke";

app.use(cors());
app.use(bodyParser.json());

let latestVideoUrl = ""; // Store the latest video URL

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

// Endpoint to receive generated image URLs and create a video
app.post("/make-webhook", async (req, res) => {
  const { imageUrls } = req.body; // Expect an array of image URLs

  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    console.error("No imageUrls found in the request body!");
    return res.status(400).send("Invalid request, imageUrls are required.");
  }

  try {
    console.log("Received image URLs:", imageUrls);

    // Create a temporary folder for the images
    const tempFolder = path.join(__dirname, "temp-images");
    if (!fs.existsSync(tempFolder)) fs.mkdirSync(tempFolder);

    // Download images locally
    const downloadedImages = [];
    for (let i = 0; i < imageUrls.length; i++) {
      const imagePath = path.join(tempFolder, `image${i + 1}.jpg`);
      const writer = fs.createWriteStream(imagePath);
      const response = await axios({
        url: imageUrls[i],
        method: "GET",
        responseType: "stream",
      });
      response.data.pipe(writer);
      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
      downloadedImages.push(imagePath);
    }

    // Create video using FFmpeg
    const videoPath = path.join(__dirname, "generated-video.mp4");
    const ffmpegCommand = ffmpeg();

    downloadedImages.forEach((image) => {
      ffmpegCommand.input(image).loop(5); // Each image stays for 5 seconds
    });

    ffmpegCommand
      .on("end", () => {
        console.log("Video successfully created:", videoPath);
        latestVideoUrl = `http://localhost:${PORT}/video`; // Serve the video
        res.status(200).send({ message: "Video created successfully!", videoUrl: latestVideoUrl });

        // Clean up temporary images
        downloadedImages.forEach((image) => fs.unlinkSync(image));
        fs.rmdirSync(tempFolder);
      })
      .on("error", (err) => {
        console.error("Error creating video:", err.message);
        res.status(500).send("Error creating video.");
      })
      .save(videoPath);
  } catch (error) {
    console.error("Error processing image URLs:", error.message);
    res.status(500).send("Failed to process image URLs.");
  }
});

// Endpoint to serve the latest generated video
app.get("/video", (req, res) => {
  const videoPath = path.join(__dirname, "generated-video.mp4");
  if (fs.existsSync(videoPath)) {
    res.sendFile(videoPath);
  } else {
    res.status(404).send("Video not found.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
