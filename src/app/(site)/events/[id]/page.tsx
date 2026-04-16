import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, Share2 } from "lucide-react";
import { getEventById } from "@/sanity/lib/content";

type EventDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatLongDate(value: string) {
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

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const { id } = await params;
  const event = await getEventById(decodeURIComponent(id));

  if (!event) {
    notFound();
  }

  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    event.location
  )}`;

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <section className="bg-black px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/events"
            className="mb-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft size={18} /> Back to Events
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="mb-5 inline-flex rounded-full bg-[#8B19E6] px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
                {event.category || "Church Event"}
              </span>
              <h1 className="text-5xl font-black uppercase italic leading-none tracking-tighter md:text-7xl">
                {event.title}
              </h1>
            </div>

            <div className="overflow-hidden rounded-[36px] bg-white/10 shadow-2xl">
              <img
                src={event.image}
                className="h-80 w-full object-cover"
                alt={event.title}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pt-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[32px] bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-black text-[#0A1F44]">Event Details</h2>

          <div className="space-y-5">
            <div className="flex gap-4">
              <Calendar className="mt-1 text-[#8B19E6]" size={22} />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Date
                </p>
                <p className="font-bold text-gray-900">{formatLongDate(event.rawDate)}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="mt-1 text-[#8B19E6]" size={22} />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Time
                </p>
                <p className="font-bold text-gray-900">{event.time}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin className="mt-1 text-[#8B19E6]" size={22} />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Location
                </p>
                <p className="font-bold text-gray-900">{event.location}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            <a
              href={directionsHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-[#8B19E6] px-6 py-4 text-center font-black uppercase tracking-widest text-white transition-all hover:brightness-110"
            >
              Get Directions
            </a>
            <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-4 font-black uppercase tracking-widest text-gray-900">
              <Share2 size={18} /> Share Event
            </button>
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-[#0A1F44]">What to Expect</h2>
          <p className="text-lg leading-8 text-gray-600">
            Join us for a meaningful time of worship, fellowship, and community. More
            details can be shared by church leaders as the event gets closer.
          </p>

          <div className="mt-8 rounded-3xl bg-purple-50 p-6">
            <p className="text-xs font-black uppercase tracking-widest text-[#8B19E6]">
              Stay Connected
            </p>
            <p className="mt-3 text-gray-700">
              Check this page again for updated details, reminders, and any changes from
              the church office.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
