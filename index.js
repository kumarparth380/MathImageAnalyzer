require("dotenv").config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.CLOUD_VISION_API_KEY;

const VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + API_KEY;

const imagesDir = './images';

// Function to check if text contains math-related patterns
const isMathImage = (text) => {
  const mathPatterns = [
    /[\d\+\-\*\/\=\(\)\[\]\{\}x]/,  // Numbers and basic math symbols
    /graph|plot|equation|formula/,   // Keywords related to math
  ];

  return mathPatterns.some(pattern => pattern.test(text));
};

const processImages = async () => {
  try {
    // Read all files from image dir
    const files = fs.readdirSync(imagesDir);

    // only taking PNG images
    const imageFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');

    for (const imageFile of imageFiles) {
      const filePath = path.join(imagesDir, imageFile);
      console.log(`Processing image: ${imageFile}`);

      // Read the image file and convert to Base64
      const imageBuffer = fs.readFileSync(filePath);
      const imageBase64 = imageBuffer.toString('base64');

      const requestBody = {
        requests: [
          {
            image: {
              content: imageBase64,
            },
            features: [
              {
                type: "LABEL_DETECTION",
                maxResults: 10,
              },
              {
                  type: "TEXT_DETECTION",
                  maxResults: 10,
              },
              {
                  type: "DOCUMENT_TEXT_DETECTION",
                  maxResults: 10,
              }
            ],
          },
        ],
      };

      // call Google Vision API
      const response = await axios.post(VISION_API_URL, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const detections = response.data.responses[0].textAnnotations;

      // If no text is detected, assume no math elements
      if (detections && detections.length > 0) {
        const fullText = detections.map(text => text.description).join(' ');

        // Check if the detected text contains math-related elements
        if (isMathImage(fullText)) {
          console.log(`${imageFile}: true (Math visual element detected)`);
        } else {
          console.log(`${imageFile}: false (No math visual element detected)`);
        }
      } else {
        console.log(`${imageFile}: false (No text detected)`);
      }
    }
  } catch (error) {
    console.error('Error processing images:', error);
  }
};

processImages();
