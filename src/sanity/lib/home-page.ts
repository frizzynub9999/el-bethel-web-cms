import { client } from "./client";
import {
  AnnouncementItem,
  defaultWeeklySchedule,
  EventItem,
  getAnnouncements,
  getHomepageEvents,
  getLatestSermon,
  SermonItem,
  WeeklyScheduleItem,
} from "./content";
import { getSiteSettings } from "./site-settings";

const defaultMinistryImages = [
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200",
  "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1200",
  "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200",
];

export type HomePageData = {
  churchName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  address: string;
  announcements: AnnouncementItem[];
  weeklySchedule: WeeklyScheduleItem[];
  latestSermon: SermonItem;
  events: Array<{
    id: string;
    title: string;
    date: string;
    rawDate: string;
    day: string;
    time: string;
    loc: string;
    image: string;
  }>;
  ministries: Array<{
    title: string;
    desc: string;
    icon: string;
    image: string;
  }>;
};

export const defaultHomePageData: HomePageData = {
  churchName: "EL Bethel Global Harvest Church",
  heroTitle: "Welcome Home",
  heroSubtitle: "Experience the transforming love of Christ at EL Bethel Global Harvest Church",
  heroImage:
    "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
  address: "123 Faith Avenue, City, State 12345",
  announcements: [],
  weeklySchedule: defaultWeeklySchedule,
  latestSermon: {
    id: "1",
    title: "Walking in Faith",
    speaker: "Pastor James Williams",
    date: "March 10, 2026",
    duration: "45 min",
    series: "Faith Series",
    description:
      "Discover what it means to trust God completely and walk in faith.",
    thumbnail:
      "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=2071",
    videoUrl: "#",
    featured: true,
  },
  events: [
    {
      id: "1",
      title: "Easter Sunday Celebration",
      date: "March 31, 2026",
      rawDate: "2026-03-31",
      day: "Tuesday",
      time: "9:00 AM",
      loc: "Main Sanctuary",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200",
    },
    {
      id: "2",
      title: "Youth Conference 2026",
      date: "April 12-14, 2026",
      rawDate: "2026-04-12",
      day: "Sunday",
      time: "All Day",
      loc: "Conference Center",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200",
    },
    {
      id: "3",
      title: "Community Outreach",
      date: "April 20, 2026",
      rawDate: "2026-04-20",
      day: "Monday",
      time: "10:00 AM",
      loc: "City Park",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200",
    },
  ],
  ministries: [
    {
      title: "Children's Ministry",
      desc: "Nurturing faith in the next generation through engaging programs.",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      image: defaultMinistryImages[0],
    },
    {
      title: "Youth Ministry",
      desc: "Empowering teenagers to live out their faith in today's world.",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      image: defaultMinistryImages[1],
    },
    {
      title: "Bible Study Groups",
      desc: "Growing together through the study of God's Word.",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332-.477-4.5 1.253",
      image: defaultMinistryImages[2],
    },
    {
      title: "Community Outreach",
      desc: "Serving our community with the love of Christ.",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      image: defaultMinistryImages[3],
    },
  ],
};

const homePageQuery = `*[_type == "homePage"][0]{
  "churchName": coalesce(churchName, "EL Bethel Global Harvest Church"),
  "heroTitle": coalesce(heroTitle, "Welcome Home"),
  "heroSubtitle": coalesce(heroSubtitle, "Experience the transforming love of Christ at EL Bethel Global Harvest Church"),
  "heroImage": coalesce(heroImage.asset->url, ""),
  "address": coalesce(address, "123 Faith Avenue, City, State 12345"),
  "ministries": coalesce(ministries[]{
    title,
    "desc": description,
    "image": image.asset->url,
    icon
  }, [])
}`;

export async function getHomePageData() {
  if (!client) {
    return defaultHomePageData;
  }

  try {
    const [data, latestSermon, events, announcements, settings] = await Promise.all([
      client.fetch<Partial<HomePageData> | null>(homePageQuery),
      getLatestSermon(),
      getHomepageEvents(),
      getAnnouncements(),
      getSiteSettings(),
    ]);

    const weeklySchedule =
      settings.serviceTimes.length > 0
        ? settings.serviceTimes.map((service) => ({
            title: service.label,
            day: service.label.split(" ")[0],
            time: service.time,
            description:
              service.description ||
              "Join us as we gather together in faith and community",
          }))
        : defaultWeeklySchedule;

    return {
      ...defaultHomePageData,
      ...data,
      churchName: data?.churchName || settings.churchName || defaultHomePageData.churchName,
      heroSubtitle: data?.heroSubtitle || defaultHomePageData.heroSubtitle,
      address: settings.address || data?.address || defaultHomePageData.address,
      announcements,
      weeklySchedule,
      latestSermon,
      heroImage: data?.heroImage || defaultHomePageData.heroImage,
      events:
        events.length > 0
          ? events.map((event: EventItem) => ({
              id: event.id,
              title: event.title,
              date: event.date,
              rawDate: event.rawDate,
              day: event.day,
              time: event.time,
              loc: event.location,
              image: event.image,
            }))
          : defaultHomePageData.events,
      ministries:
        data?.ministries && data.ministries.length > 0
          ? data.ministries.map((ministry, index) => ({
              ...defaultHomePageData.ministries[Math.min(index, defaultHomePageData.ministries.length - 1)],
              ...ministry,
              image:
                ministry.image ||
                defaultMinistryImages[index % defaultMinistryImages.length],
            }))
          : defaultHomePageData.ministries,
    };
  } catch {
    return defaultHomePageData;
  }
}
