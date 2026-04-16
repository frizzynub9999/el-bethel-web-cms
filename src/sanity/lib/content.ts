import { client } from "./client";

export type EventItem = {
  id: string;
  title: string;
  date: string;
  day: string;
  rawDate: string;
  time: string;
  location: string;
  category: string;
  image: string;
  featured: boolean;
};

export type AnnouncementItem = {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  pinned: boolean;
};

export type WeeklyScheduleItem = {
  title: string;
  day: string;
  time: string;
  description: string;
};

export type SermonItem = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  series: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  directVideoUrl?: string;
  liveStatus?: string;
  featured: boolean;
};

type MetaVideo = {
  id: string;
  title?: string;
  description?: string;
  created_time?: string;
  permalink_url?: string;
  length?: number;
  picture?: string;
  source?: string;
  thumbnails?: {
    data?: {
      uri?: string;
    }[];
  };
};


type MetaVideoResponse = {
  data?: MetaVideo[];
  error?: {
    message?: string;
  };
};

const metaVideoFields =
  "id,title,description,created_time,permalink_url,length,picture,thumbnails";

export const defaultAnnouncements: AnnouncementItem[] = [
  {
    id: "1",
    title: "Stay Connected",
    body: "Check this page for the latest church announcements and reminders.",
    publishedAt: "2026-04-14",
    pinned: true,
  },
];

export const defaultEvents: EventItem[] = [
  {
    id: "1",
    title: "Youth Night: The Awakening",
    date: "MAR 22",
    day: "Sunday",
    rawDate: "2026-03-22",
    time: "6:00 PM - 8:30 PM",
    location: "Main Sanctuary",
    category: "Youth",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800",
    featured: true,
  },
  {
    id: "2",
    title: "Community Outreach",
    date: "MAR 25",
    day: "Wednesday",
    rawDate: "2026-03-25",
    time: "10:00 AM",
    location: "Downtown Plaza",
    category: "Outreach",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800",
    featured: false,
  },
  {
    id: "3",
    title: "Worship Night",
    date: "APR 02",
    day: "Thursday",
    rawDate: "2026-04-02",
    time: "7:30 PM",
    location: "Chapel",
    category: "Worship",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800",
    featured: false,
  },
];

export const defaultWeeklySchedule: WeeklyScheduleItem[] = [
  {
    title: "Sunday Worship Service",
    day: "Sunday",
    time: "9:00 AM & 11:00 AM",
    description: "Join us for uplifting worship and biblical teaching",
  },
  {
    title: "Wednesday Bible Study",
    day: "Wednesday",
    time: "7:00 PM",
    description: "Dive deep into God's Word with our community",
  },
  {
    title: "Friday Prayer Night",
    day: "Friday",
    time: "8:00 PM",
    description: "Corporate prayer and intercession",
  },
  {
    title: "Saturday Youth Service",
    day: "Saturday",
    time: "6:00 PM",
    description: "Dynamic service designed for teenagers",
  },
];

export const defaultSermons: SermonItem[] = [
  {
    id: "1",
    title: "Walking in Faith",
    speaker: "Pastor James Williams",
    date: "March 10, 2026",
    duration: "45 min",
    series: "Faith Series",
    description:
      "Discover what it means to trust God completely and walk in faith through every season of life.",
    thumbnail:
      "https://images.unsplash.com/photo-1690430979952-b2fe90150f44?q=80&w=1080",
    videoUrl:
      "https://www.facebook.com/ElBethelGlobalHarvestChurchOfficial/videos/1644983739215541",
    featured: true,
  },
  {
    id: "2",
    title: "The Power of Prayer",
    speaker: "Pastor Sarah Johnson",
    date: "March 3, 2026",
    duration: "38 min",
    series: "Spiritual Disciplines",
    description:
      "Learn how to develop a powerful prayer life that transforms your relationship with God.",
    thumbnail:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1080",
    videoUrl:
      "https://www.facebook.com/ElBethelGlobalHarvestChurchOfficial/videos/1644983739215541",
    featured: false,
  },
  {
    id: "3",
    title: "Living with Purpose",
    speaker: "Pastor Michael Lee",
    date: "February 24, 2026",
    duration: "41 min",
    series: "Purpose Driven Life",
    description:
      "Understand how God has called each of us to live with intention and purpose.",
    thumbnail:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1080",
    videoUrl:
      "https://www.facebook.com/ElBethelGlobalHarvestChurchOfficial/videos/1644983739215541",
    featured: false,
  },
];

const sermonsQuery = `*[_type == "sermon"] | order(featured desc, publishedAt desc){
  "id": _id,
  title,
  speaker,
  "date": publishedAt,
  duration,
  series,
  description,
  "thumbnail": coalesce(thumbnail.asset->url, thumbnailUrl),
  videoUrl,
  "featured": coalesce(featured, false)
}`;

const eventsQuery = `*[_type == "event"] | order(featured desc, eventDate asc){
  "id": _id,
  title,
  "date": eventDate,
  "rawDate": eventDate,
  day,
  time,
  location,
  category,
  "image": image.asset->url,
  "featured": coalesce(featured, false)
}`;

const announcementsQuery = `*[_type == "announcement" && coalesce(published, true) == true] | order(coalesce(pinned, false) desc, publishedAt desc)[0...10]{
  "id": _id,
  title,
  body,
  "publishedAt": coalesce(publishedAt, _createdAt),
  "pinned": coalesce(pinned, false)
}`;

function formatEventDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  })
    .format(date)
    .replace(" ", " ")
    .toUpperCase();
}

function formatSermonDate(value: string) {
  const date = new Date(value.includes("T") ? value : `${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function stripHtml(value = "") {
  return value.replace(/<[^>]+>/g, "").trim();
}

function pickSermonTitle(video: MetaVideo, index: number) {
  const title = video.title?.trim();
  if (title) {
    return title;
  }

  const description = stripHtml(video.description || "");
  if (description) {
    return description.split("\n")[0].slice(0, 80);
  }

  return `Facebook Sermon ${index + 1}`;
}

function pickSermonDuration(seconds: number | undefined) {
  if (!seconds || seconds <= 0) {
    return "Watch now";
  }

  const minutes = Math.max(1, Math.round(seconds / 60));
  return `${minutes} min`;
}

function pickSermonThumbnail(video: MetaVideo) {
  return (
    video.thumbnails?.data?.find((thumbnail) => thumbnail.uri)?.uri ||
    video.picture ||
    defaultSermons[0].thumbnail
  );
}

async function getFacebookSermons() {
  const pageId = process.env.META_PAGE_ID?.trim();
  const pageAccessToken = process.env.META_PAGE_ACCESS_TOKEN?.trim();
  const graphApiVersion = process.env.META_GRAPH_API_VERSION?.trim() || "v25.0";

  if (!pageId || !pageAccessToken) {
    return null;
  }

  const fetchVideos = async (includeSource: boolean) => {
    const url = new URL(`https://graph.facebook.com/${graphApiVersion}/${pageId}/videos`);

    url.searchParams.set(
      "fields",
      includeSource ? `${metaVideoFields},source` : metaVideoFields
    );
    url.searchParams.set("limit", "20");
    url.searchParams.set("access_token", pageAccessToken);

    const response = await fetch(url.toString(), {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    const json = (await response.json()) as MetaVideoResponse;

    if (!response.ok || json.error) {
      throw new Error(json.error?.message || "Failed to fetch Facebook videos.");
    }

    return json.data || [];
  };

  try {
    let videos: MetaVideo[] = [];

    try {
      videos = await fetchVideos(true);
    } catch (error) {
      console.warn(
        "Facebook videos with source failed; retrying without source:",
        error instanceof Error ? error.message : error
      );
      videos = await fetchVideos(false);
    }

    if (videos.length === 0) {
      return null;
    }

    return videos.map((video, index) => ({
      id: video.id,
      title: pickSermonTitle(video, index),
      speaker: "EL Bethel Global Harvest Church",
      date: video.created_time ? formatSermonDate(video.created_time) : defaultSermons[0].date,
      duration: pickSermonDuration(video.length),
      series: "Facebook Sermons",
      description: stripHtml(video.description || defaultSermons[0].description),
      thumbnail: pickSermonThumbnail(video),
      videoUrl: `https://www.facebook.com/watch/?v=${video.id}`,
      directVideoUrl: video.source || "",
      liveStatus: video.source?.includes(".m3u8") ? "live" : "",
      featured: index === 0,
    }));
  } catch (error) {
    console.warn(
      "Facebook sermon fetch failed:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

export async function getSermons() {
  const facebookSermons = await getFacebookSermons();
  if (facebookSermons) {
    return facebookSermons;
  }

  if (!client) {
    return defaultSermons;
  }

  try {
    const sermons = await client.fetch<Array<Partial<SermonItem>>>(sermonsQuery);
    if (!sermons.length) {
      return defaultSermons;
    }

    return sermons.map((sermon, index) => ({
      ...defaultSermons[Math.min(index, defaultSermons.length - 1)],
      ...sermon,
      id: sermon.id || `${index + 1}`,
      date: sermon.date ? formatSermonDate(sermon.date) : defaultSermons[0].date,
      thumbnail: sermon.thumbnail || defaultSermons[0].thumbnail,
      featured: Boolean(sermon.featured),
    }));
  } catch {
    return defaultSermons;
  }
}

export async function getEvents() {
  if (!client) {
    return defaultEvents;
  }

  try {
    const events = await client.fetch<Array<Partial<EventItem>>>(eventsQuery);
    if (!events.length) {
      return defaultEvents;
    }

    return events.map((event, index) => ({
      ...defaultEvents[Math.min(index, defaultEvents.length - 1)],
      ...event,
      id: event.id || `${index + 1}`,
      date: event.date ? formatEventDate(event.date) : defaultEvents[0].date,
      rawDate: event.rawDate || event.date || defaultEvents[0].rawDate,
      image: event.image || defaultEvents[0].image,
      featured: Boolean(event.featured),
    }));
  } catch {
    return defaultEvents;
  }
}

export async function getAnnouncements() {
  if (!client) {
    return defaultAnnouncements;
  }

  try {
    const announcements = await client.fetch<Array<Partial<AnnouncementItem>>>(announcementsQuery);
    if (!announcements.length) {
      return defaultAnnouncements;
    }

    return announcements.map((announcement, index) => ({
      ...defaultAnnouncements[Math.min(index, defaultAnnouncements.length - 1)],
      ...announcement,
      id: announcement.id || `${index + 1}`,
      title: announcement.title || defaultAnnouncements[0].title,
      body: announcement.body || defaultAnnouncements[0].body,
      publishedAt: announcement.publishedAt || defaultAnnouncements[0].publishedAt,
      pinned: Boolean(announcement.pinned),
    }));
  } catch {
    return defaultAnnouncements;
  }
}

export async function getEventById(id: string) {
  const events = await getEvents();
  return events.find((event) => event.id === id) || null;
}

export async function getLatestSermon() {
  const sermons = await getSermons();
  return sermons.find((sermon) => sermon.featured) || sermons[0];
}

export async function getHomepageEvents(limit = 3) {
  const events = await getEvents();
  return events.slice(0, limit);
}
