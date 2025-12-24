import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL || "https://146.190.172.209";

export async function POST(request: NextRequest) {
  console.log("[Intercom Sheet] Request received");

  // Parse the form data
  try {
    const formData = await request.formData();
    const intercomData = formData.get("intercom_data");

    if (intercomData) {
      console.log("[Intercom Sheet] intercom_data:", intercomData);
    }
  } catch (err) {
    console.log("[Intercom Sheet] No form data");
  }

  // Return the HTML page with the embedded widget
  const html = `
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
          background: #fff;
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
      <iframe src="${BASE_URL}/widget" id="widgetFrame" allow="clipboard-write"></iframe>

      <script>
        document.getElementById('closeBtn').addEventListener('click', function() {
          if (typeof INTERCOM_MESSENGER_SHEET_LIBRARY !== 'undefined') {
            INTERCOM_MESSENGER_SHEET_LIBRARY.submitSheet({
              action: 'closed'
            });
          }
        });

        window.addEventListener('message', function(event) {
          console.log('Message from widget:', event.data);
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
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
      "Content-Security-Policy": "frame-src 'self' https://intercom-sheets.com; frame-ancestors 'self' https://intercom-sheets.com https://*.intercom.com",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
}

export async function GET() {
  return NextResponse.json({ message: "Sheet endpoint - use POST" });
}
