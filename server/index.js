import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security headers for Intercom Sheets
app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "frame-src 'self' https://intercom-sheets.com; frame-ancestors 'self' https://intercom-sheets.com https://*.intercom.com"
  );
  res.setHeader("X-Requested-With", "XMLHttpRequest");
  next();
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL ?? "https://146.190.172.209";

// Initial Canvas - displays when the app first loads in the Messenger
const initialCanvas = {
  canvas: {
    content: {
      components: [
        {
          type: "text",
          id: "widget-title",
          text: "Feedback Widget",
          align: "center",
          style: "header",
        },
        {
          type: "text",
          id: "widget-description",
          text: "Share your feedback, vote on features, and see our roadmap.",
          align: "center",
          style: "muted",
        },
        {
          type: "button",
          label: "Open Feedback Widget",
          style: "primary",
          id: "open_widget_button",
          action: {
            type: "sheet",
            url: `${BASE_URL}/intercom/sheet`,
          },
        },
      ],
    },
  },
};

// Home page - shows available endpoints
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Intercom Widget Integration Server</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        h1 { color: #333; }
        .endpoint { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .endpoint h3 { margin: 0 0 10px 0; color: #0066cc; }
        .endpoint code { background: #e0e0e0; padding: 2px 6px; border-radius: 4px; }
        .url { color: #008000; word-break: break-all; }
      </style>
    </head>
    <body>
      <h1>Intercom Widget Integration Server</h1>
      <p>Use these endpoints in your Intercom Developer Hub:</p>

      <div class="endpoint">
        <h3>Initialize URL (POST)</h3>
        <p class="url">${BASE_URL}/intercom/initialize</p>
        <p>This is called when the Messenger app first loads.</p>
      </div>

      <div class="endpoint">
        <h3>Sheet URL (POST)</h3>
        <p class="url">${BASE_URL}/intercom/sheet</p>
        <p>This opens the widget in an iframe sheet.</p>
      </div>

      <div class="endpoint">
        <h3>Submit Sheet URL (POST)</h3>
        <p class="url">${BASE_URL}/intercom/submit-sheet</p>
        <p>This handles when the user submits/closes the sheet.</p>
      </div>

      <h2>Setup Instructions</h2>
      <ol>
        <li>Go to your Intercom Developer Hub</li>
        <li>Open your app's Canvas Kit settings</li>
        <li>Enable "For users, leads, and visitors"</li>
        <li>Add the Initialize URL: <code>${BASE_URL}/intercom/initialize</code></li>
        <li>Add the Submit Sheet URL: <code>${BASE_URL}/intercom/submit-sheet</code></li>
        <li>Save and add the app to your Messenger home screen</li>
      </ol>
    </body>
    </html>
  `);
});

// Initialize endpoint - sends the first canvas to display
app.post("/intercom/initialize", (req, res) => {
  console.log("[Initialize] Request received:", JSON.stringify(req.body, null, 2));
  res.json(initialCanvas);
});

// Sheet endpoint - opens the iframe with the widget
app.post("/intercom/sheet", (req, res) => {
  console.log("[Sheet] Request received");

  // Parse intercom_data if present
  if (req.body.intercom_data) {
    try {
      const jsonParsed = JSON.parse(req.body.intercom_data);
      console.log("[Sheet] Parsed intercom_data:", JSON.stringify(jsonParsed, null, 2));

      // Optionally decode user if CLIENT_SECRET is set
      if (jsonParsed.user && process.env.CLIENT_SECRET) {
        try {
          const decodedUser = decodeUser(jsonParsed.user);
          console.log("[Sheet] Decoded user:", decodedUser);
        } catch (err) {
          console.log("[Sheet] Could not decode user:", err.message);
        }
      }
    } catch (err) {
      console.log("[Sheet] Could not parse intercom_data:", err.message);
    }
  }

  // Send the sheet HTML page
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Feedback Widget</title>
      <script src="https://s3.amazonaws.com/intercom-sheets.com/messenger-sheet-library.latest.js"></script>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        .close-btn {
          position: fixed;
          top: 10px;
          right: 10px;
          background: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #666;
          z-index: 1000;
          transition: background 0.2s;
        }
        .close-btn:hover {
          background: #e0e0e0;
        }
      </style>
    </head>
    <body>
      <button class="close-btn" id="closeBtn" title="Close">&times;</button>
      <iframe src="${BASE_URL}/widget" id="widgetFrame"></iframe>

      <script>
        document.getElementById('closeBtn').addEventListener('click', function() {
          // Submit the sheet to close it and return to Messenger
          if (typeof INTERCOM_MESSENGER_SHEET_LIBRARY !== 'undefined') {
            INTERCOM_MESSENGER_SHEET_LIBRARY.submitSheet({
              action: 'closed'
            });
          }
        });

        // Listen for messages from the iframe (optional - for future enhancements)
        window.addEventListener('message', function(event) {
          console.log('Message from widget:', event.data);

          // If the widget sends a close message, close the sheet
          if (event.data && event.data.type === 'close') {
            if (typeof INTERCOM_MESSENGER_SHEET_LIBRARY !== 'undefined') {
              INTERCOM_MESSENGER_SHEET_LIBRARY.submitSheet({
                action: 'closed',
                data: event.data
              });
            }
          }
        });
      </script>
    </body>
    </html>
  `);
});

// Submit Sheet endpoint - handles when the sheet is closed/submitted
app.post("/intercom/submit-sheet", (req, res) => {
  console.log("[Submit Sheet] Request received:", JSON.stringify(req.body, null, 2));

  // You can access sheet_values from req.body.sheet_values
  const sheetValues = req.body.sheet_values || {};

  // Return a canvas to display after the sheet closes
  const finalCanvas = {
    canvas: {
      content: {
        components: [
          {
            type: "text",
            id: "thank-you",
            text: "Thanks for your feedback!",
            align: "center",
            style: "header",
          },
          {
            type: "text",
            id: "message",
            text: "Your input helps us improve our product.",
            align: "center",
            style: "muted",
          },
          {
            type: "button",
            label: "Open Widget Again",
            style: "primary",
            id: "reopen_button",
            action: {
              type: "sheet",
              url: `${BASE_URL}/intercom/sheet`,
            },
          },
        ],
      },
    },
  };

  res.json(finalCanvas);
});

// Health check endpoint
app.get("/intercom/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Function to decode the encrypted user object from Intercom
function decodeUser(encodedUser) {
  const masterkey = process.env.CLIENT_SECRET;

  if (!masterkey) {
    throw new Error("CLIENT_SECRET not configured");
  }

  // base64 decoding
  const bData = Buffer.from(encodedUser, "base64");

  // convert data to buffers
  const ivlen = 12;
  const iv = bData.slice(0, ivlen);

  const taglen = 16;
  const tag = bData.slice(bData.length - taglen, bData.length);

  const cipherLen = bData.length - taglen;
  const cipherText = bData.slice(ivlen, cipherLen);

  let hash = crypto.createHash("sha256").update(masterkey);
  let key = Buffer.from(hash.digest("binary"), "binary");

  // AES 256 GCM Mode
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  // decrypt the given text
  let decrypted = decipher.update(cipherText, "binary", "utf8");
  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted);
}

// Start server
const listener = app.listen(PORT, () => {
  console.log(`Intercom integration server running on port ${listener.address().port}`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`\nEndpoints:`);
  console.log(`  Initialize: ${BASE_URL}/intercom/initialize`);
  console.log(`  Sheet:      ${BASE_URL}/intercom/sheet`);
  console.log(`  Submit:     ${BASE_URL}/intercom/submit-sheet`);
});
