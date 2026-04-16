import EventsPageClient from "./events-page-client";
import { getAnnouncements, getEvents } from "@/sanity/lib/content";
import { getHomePageData } from "@/sanity/lib/home-page";

export default async function EventsPage() {
  const [events, announcements, homePage] = await Promise.all([
    getEvents(),
    getAnnouncements(),
    getHomePageData(),
  ]);

  return (
    <EventsPageClient
      announcements={announcements}
      events={events}
      weeklySchedule={homePage.weeklySchedule}
    />
  );
}
