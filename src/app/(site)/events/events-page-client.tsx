"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Bell, Calendar, Clock, MapPin } from "lucide-react";
import { AnnouncementItem, EventItem, WeeklyScheduleItem } from "@/sanity/lib/content";

type EventsPageClientProps = {
  announcements: AnnouncementItem[];
  events: EventItem[];
  weeklySchedule: WeeklyScheduleItem[];
};

export default function EventsPageClient({
  announcements,
  events,
  weeklySchedule,
}: EventsPageClientProps) {
  const [filter, setFilter] = useState("All");

  const categories = useMemo(() => {
    const dynamicCategories = Array.from(
      new Set(events.map((event) => event.category).filter(Boolean))
    );

    return ["All", ...dynamicCategories];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (filter === "All") {
      return events;
    }

    return events.filter((event) => event.category === filter);
  }, [events, filter]);

  const featuredEvent = filteredEvents.find((event) => event.featured) || filteredEvents[0];
  const remainingEvents = filteredEvents.filter((event) => event.id !== featuredEvent?.id);
  const featuredBadgeText =
    filter === "All" ? "Featured Event" : featuredEvent?.category || "Featured Event";

  return (
    <main className="min-h-screen bg-white pb-20">
      <section className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">
              Upcoming <br /> <span className="text-[#8B19E6]">Events</span>
            </h1>
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-black uppercase text-xs tracking-widest transition-all ${
                  filter === cat ? "bg-[#8B19E6] text-white" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {announcements.length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 pt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-gray-900">
              Announcements
            </h2>
            <p className="mt-2 font-medium text-gray-500">
              Important updates and reminders from the church
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`rounded-[28px] border p-7 shadow-sm ${
                  announcement.pinned
                    ? "border-[#8B19E6] bg-purple-50"
                    : "border-gray-100 bg-white"
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <Bell size={20} className="text-[#8B19E6]" />
                  <span className="text-xs font-black uppercase tracking-widest text-[#8B19E6]">
                    {announcement.pinned ? "Pinned" : "Announcement"}
                  </span>
                </div>
                <h3 className="mb-3 text-2xl font-black text-[#0A1F44]">
                  {announcement.title}
                </h3>
                <p className="leading-7 text-gray-600">{announcement.body}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {featuredEvent ? (
        <section className="max-w-7xl mx-auto px-6 pt-12">
          <div className="bg-[#8B19E6] rounded-[40px] overflow-hidden shadow-2xl grid lg:grid-cols-2">
            <div className="relative h-80 overflow-hidden lg:h-auto">
              <img src={featuredEvent.image} className="w-full h-full object-cover" alt={featuredEvent.title} />
              <div className="absolute left-6 top-6 z-10 bg-white p-4 rounded-3xl text-center shadow-xl md:left-8 md:top-8">
                <span className="block text-2xl font-black text-black leading-none">
                  {featuredEvent.date.split(" ")[1]}
                </span>
                <span className="block text-sm font-black text-[#8B19E6] uppercase">
                  {featuredEvent.date.split(" ")[0]}
                </span>
              </div>
            </div>
            <div className="min-h-[360px] p-10 lg:p-16 text-white flex flex-col justify-center">
              <span className="bg-white/20 px-4 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase w-fit mb-6 italic">
                {featuredBadgeText}
              </span>
              <h2 className="break-words text-4xl md:text-5xl font-black uppercase italic mb-6 leading-tight text-white">
                {featuredEvent.title}
              </h2>
              <div className="space-y-4 mb-10 text-purple-100 font-bold">
                <div className="flex items-center gap-3">
                  <Calendar size={20} /> {featuredEvent.day}, {featuredEvent.date}
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} /> {featuredEvent.time}
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} /> {featuredEvent.location}
                </div>
              </div>
              <Link
                href={`/events/${featuredEvent.id}`}
                className="bg-white text-[#8B19E6] px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all w-fit shadow-xl"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <h2 className="text-3xl font-black text-gray-900 uppercase italic mb-10 tracking-tight">
          Recent &amp; Special Events
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {remainingEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-gray-50 rounded-[40px] p-8 flex flex-col sm:flex-row gap-8 border border-transparent hover:border-[#8B19E6] hover:bg-white hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-full sm:w-48 h-48 rounded-[32px] overflow-hidden">
                <img
                  src={event.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={event.title}
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[#8B19E6] font-black text-sm uppercase tracking-widest">
                    {event.category}
                  </div>
                  <button className="text-gray-400 hover:text-[#8B19E6] transition-colors">
                    <Bell size={20} />
                  </button>
                </div>
                <h3 className="text-2xl font-black uppercase italic text-gray-900 mb-4">
                  {event.title}
                </h3>
                <div className="text-gray-500 font-bold text-sm space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} /> {event.date} {" • "} {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} /> {event.location}
                  </div>
                </div>
                <Link
                  href={`/events/${event.id}`}
                  className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-black group-hover:text-[#8B19E6] transition-all"
                >
                  View Details <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 max-w-7xl mx-auto px-6 pt-24">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-gray-900 uppercase italic tracking-tighter mb-2">
            Weekly Schedule
          </h2>
          <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">
            Regular events happening every week
          </p>
        </div>
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-6">
          {weeklySchedule.map((item, index) => (
            <div
              key={index}
              className="w-full max-w-[360px] bg-[#8B19E6] rounded-[32px] p-8 text-white text-center flex flex-col items-center hover:scale-105 transition-transform duration-300 shadow-lg sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <div className="bg-white/20 p-4 rounded-full mb-6">
                <Calendar size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black mb-1">{item.title}</h3>
              <p className="text-purple-200 text-xs font-bold uppercase mb-4 tracking-tighter">
                {item.day}
              </p>
              <p className="text-2xl font-black mb-4">{item.time}</p>
              <p className="text-sm font-medium text-purple-100 leading-snug">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
