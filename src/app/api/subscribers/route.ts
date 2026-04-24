import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";

export const runtime = "nodejs";

type SubscriberRequestBody = {
  email?: string;
  announcements?: boolean;
  events?: boolean;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function createSubscriberId(email: string) {
  return `subscriber-${normalizeEmail(email).replace(/[^a-z0-9]+/g, "-")}`;
}

export async function POST(request: NextRequest) {
  try {
    if (!writeClient) {
      return NextResponse.json(
        { error: "Subscriber storage is not configured yet." },
        { status: 500 }
      );
    }

    let body: SubscriberRequestBody;

    try {
      body = (await request.json()) as SubscriberRequestBody;
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const email = normalizeEmail(body.email || "");
    const announcements = Boolean(body.announcements);
    const events = Boolean(body.events);

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    if (!announcements && !events) {
      return NextResponse.json(
        { error: "Select at least one type of update." },
        { status: 400 }
      );
    }

    const existingSubscriber = await writeClient.fetch<{ _rev?: string } | null>(
      `*[_type == "subscriber" && email == $email][0]{ _rev }`,
      { email }
    );

    const now = new Date().toISOString();
    const subscriberId = createSubscriberId(email);

    await writeClient.createOrReplace({
      _id: subscriberId,
      _type: "subscriber",
      email,
      announcements,
      events,
      isActive: true,
      subscribedAt: now,
      ...(existingSubscriber?._rev ? { _rev: existingSubscriber._rev } : {}),
    });

    return NextResponse.json({
      success: true,
      message: "You are now subscribed for church updates.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not save your subscription right now.",
      },
      { status: 500 }
    );
  }
}
