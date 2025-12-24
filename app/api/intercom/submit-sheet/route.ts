import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL || "https://146.190.172.209";

export async function POST(request: NextRequest) {
  console.log("[Intercom Submit Sheet] Request received");

  try {
    const body = await request.json();
    console.log("[Intercom Submit Sheet] Body:", JSON.stringify(body, null, 2));
  } catch (err) {
    console.log("[Intercom Submit Sheet] Could not parse body");
  }

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
              url: `${BASE_URL}/api/intercom/sheet`,
            },
          },
        ],
      },
    },
  };

  return NextResponse.json(finalCanvas);
}

export async function GET() {
  return NextResponse.json({ message: "Submit Sheet endpoint - use POST" });
}
