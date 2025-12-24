import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  const BASE_URL = process.env.BASE_URL || "https://146.190.172.209";

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
              url: `${BASE_URL}/api/intercom/sheet`,
            },
          },
        ],
      },
    },
  };

  console.log("[Intercom Initialize] Request received, BASE_URL:", BASE_URL);
  return NextResponse.json(initialCanvas);
}

export async function GET() {
  return NextResponse.json({ message: "Initialize endpoint - use POST" });
}
