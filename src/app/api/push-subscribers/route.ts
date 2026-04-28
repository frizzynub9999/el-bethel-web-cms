import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";

export const runtime = "nodejs";

type PushSubscriberRequestBody = {
  token?: string;
  announcements?: boolean;
  events?: boolean;
  platform?: string;
  deviceName?: string;
};

function createPushSubscriberId(token: string) {
  return `push-subscriber-${Buffer.from(token).toString("base64url")}`;
}

export async function POST(request: NextRequest) {
  try {
    if (!writeClient) {
      return NextResponse.json(
        { error: "Push subscriber storage is not configured yet." },
        { status: 500 }
      );
    }

    let body: PushSubscriberRequestBody;

    try {
      body = (await request.json()) as PushSubscriberRequestBody;
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const token = body.token?.trim() || "";
    const announcements = body.announcements ?? true;
    const events = body.events ?? true;
    const platform = body.platform?.trim() || "unknown";
    const deviceName = body.deviceName?.trim() || "Unknown device";

    if (!token) {
      return NextResponse.json({ error: "Expo push token is required." }, { status: 400 });
    }

    if (!token.startsWith("ExponentPushToken[")) {
      return NextResponse.json({ error: "Invalid Expo push token." }, { status: 400 });
    }

    const now = new Date().toISOString();

    await writeClient.createOrReplace({
      _id: createPushSubscriberId(token),
      _type: "pushSubscriber",
      token,
      announcements: Boolean(announcements),
      events: Boolean(events),
      isActive: true,
      platform,
      deviceName,
      subscribedAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      success: true,
      message: "Push notifications are enabled for this device.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not save push subscription right now.",
      },
      { status: 500 }
    );
  }
}
