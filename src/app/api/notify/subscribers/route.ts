import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const runtime = "nodejs";

type WebhookBody = {
  _id?: string;
  _type?: string;
};

type SubscriberRecord = {
  email: string;
};

type PushSubscriberRecord = {
  token: string;
};

type AnnouncementRecord = {
  _id: string;
  _type: "announcement";
  title: string;
  body: string;
  sendNotification?: boolean;
  notificationSent?: boolean;
};

type EventRecord = {
  _id: string;
  _type: "event";
  title: string;
  eventDate: string;
  time?: string;
  location?: string;
  sendNotification?: boolean;
  notificationSent?: boolean;
};

const announcementQuery = `*[_type == "announcement" && _id == $id][0]{
  _id,
  _type,
  title,
  body,
  sendNotification,
  notificationSent
}`;

const eventQuery = `*[_type == "event" && _id == $id][0]{
  _id,
  _type,
  title,
  eventDate,
  time,
  location,
  sendNotification,
  notificationSent
}`;

function getBaseUrl(request: NextRequest) {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return configuredUrl ? configuredUrl.replace(/\/$/, "") : request.nextUrl.origin;
}

function getWebhookSecret(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }

  return (
    request.headers.get("x-webhook-secret") ||
    request.headers.get("sanity-webhook-secret") ||
    ""
  ).trim();
}

function formatEventDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

async function sendEmail({
  from,
  to,
  subject,
  html,
}: {
  from: string;
  to: string;
  subject: string;
  html: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();

  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend failed: ${errorText}`);
  }
}

async function sendPushNotifications({
  tokens,
  title,
  body,
  data,
}: {
  tokens: string[];
  title: string;
  body: string;
  data: Record<string, string>;
}) {
  if (tokens.length === 0) {
    return;
  }

  const messages = tokens.map((token) => ({
    to: token,
    sound: "default",
    title,
    body,
    data,
  }));

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(messages),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Expo push failed: ${errorText}`);
  }
}

function buildAnnouncementEmail(announcement: AnnouncementRecord, baseUrl: string) {
  return {
    subject: `New Announcement: ${announcement.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="color: #6d28d9; margin-bottom: 16px;">EL Bethel Global Harvest Church</h2>
        <h3 style="margin-bottom: 12px;">${announcement.title}</h3>
        <p style="margin-bottom: 20px;">${announcement.body}</p>
        <p>
          <a href="${baseUrl}/events" style="display: inline-block; background: #8B19E6; color: white; text-decoration: none; padding: 12px 18px; border-radius: 12px; font-weight: bold;">
            View Announcements
          </a>
        </p>
      </div>
    `,
  };
}

function buildEventEmail(event: EventRecord, baseUrl: string) {
  return {
    subject: `New Event: ${event.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="color: #6d28d9; margin-bottom: 16px;">EL Bethel Global Harvest Church</h2>
        <h3 style="margin-bottom: 12px;">${event.title}</h3>
        <p style="margin: 0 0 8px;"><strong>Date:</strong> ${formatEventDate(event.eventDate)}</p>
        <p style="margin: 0 0 8px;"><strong>Time:</strong> ${event.time || "To be announced"}</p>
        <p style="margin: 0 0 20px;"><strong>Location:</strong> ${event.location || "To be announced"}</p>
        <p>
          <a href="${baseUrl}/events/${encodeURIComponent(event._id)}" style="display: inline-block; background: #8B19E6; color: white; text-decoration: none; padding: 12px 18px; border-radius: 12px; font-weight: bold;">
            View Event Details
          </a>
        </p>
      </div>
    `,
  };
}

async function markNotificationSent(id: string) {
  if (!writeClient) {
    throw new Error("SANITY_API_WRITE_TOKEN is not configured.");
  }

  await writeClient
    .patch(id)
    .set({
      sendNotification: false,
      notificationSent: true,
      notificationSentAt: new Date().toISOString(),
    })
    .commit();
}

async function getSubscribers(type: "announcement" | "event") {
  if (!client) {
    throw new Error("Sanity client is not configured.");
  }

  const field = type === "announcement" ? "announcements" : "events";

  return client.fetch<SubscriberRecord[]>(
    `*[_type == "subscriber" && isActive == true && ${field} == true]{ email }`
  );
}

async function getPushSubscribers(type: "announcement" | "event") {
  if (!client) {
    throw new Error("Sanity client is not configured.");
  }

  const field = type === "announcement" ? "announcements" : "events";

  return client.fetch<PushSubscriberRecord[]>(
    `*[_type == "pushSubscriber" && isActive == true && ${field} == true]{ token }`
  );
}

export async function POST(request: NextRequest) {
  try {
    const expectedSecret = process.env.SANITY_WEBHOOK_SECRET?.trim();

    if (expectedSecret) {
      const providedSecret = getWebhookSecret(request);
      if (!providedSecret || providedSecret !== expectedSecret) {
        return NextResponse.json({ error: "Unauthorized webhook request." }, { status: 401 });
      }
    }

    if (!client || !writeClient) {
      return NextResponse.json(
        { error: "Sanity read/write clients are not configured." },
        { status: 500 }
      );
    }

    const resendFromEmail = process.env.RESEND_FROM_EMAIL?.trim();
    if (!resendFromEmail) {
      return NextResponse.json(
        { error: "RESEND_FROM_EMAIL is not configured." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as WebhookBody;
    const id = body._id?.trim();
    const type = body._type?.trim();

    if (!id || (type !== "announcement" && type !== "event")) {
      return NextResponse.json({ error: "Webhook payload is incomplete." }, { status: 400 });
    }

    const document =
      type === "announcement"
        ? await client.fetch<AnnouncementRecord | null>(announcementQuery, { id })
        : await client.fetch<EventRecord | null>(eventQuery, { id });

    if (!document) {
      return NextResponse.json({ message: "Document not found. Nothing to notify." });
    }

    if (!document.sendNotification || document.notificationSent) {
      return NextResponse.json({ message: "Notification not requested or already sent." });
    }

    const [subscribers, pushSubscribers] = await Promise.all([
      getSubscribers(type),
      getPushSubscribers(type),
    ]);

    if (subscribers.length === 0 && pushSubscribers.length === 0) {
      await markNotificationSent(id);
      return NextResponse.json({
        message: "No email or push subscribers found. Document marked as sent.",
      });
    }

    const baseUrl = getBaseUrl(request);
    const emailContent =
      type === "announcement"
        ? buildAnnouncementEmail(document as AnnouncementRecord, baseUrl)
        : buildEventEmail(document as EventRecord, baseUrl);

    const pushTitle =
      type === "announcement"
        ? `New Announcement: ${document.title}`
        : `New Event: ${document.title}`;
    const pushBody =
      type === "announcement"
        ? (document as AnnouncementRecord).body
        : `${formatEventDate((document as EventRecord).eventDate)}${(document as EventRecord).time ? ` at ${(document as EventRecord).time}` : ""}`;

    for (const subscriber of subscribers) {
      await sendEmail({
        from: resendFromEmail,
        to: subscriber.email,
        subject: emailContent.subject,
        html: emailContent.html,
      });
    }

    await sendPushNotifications({
      tokens: pushSubscribers.map((subscriber) => subscriber.token),
      title: pushTitle,
      body: pushBody,
      data: {
        screen: "events",
        path: "/events",
        type,
        id,
      },
    });

    await markNotificationSent(id);

    return NextResponse.json({
      success: true,
      message: `Notification sent to ${subscribers.length} email subscriber(s) and ${pushSubscribers.length} push subscriber(s).`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not process subscriber notifications.",
      },
      { status: 500 }
    );
  }
}
