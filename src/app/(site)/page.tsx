import Link from "next/link";
import { getHomePageData } from "@/sanity/lib/home-page";

export default async function Home() {
  const data = await getHomePageData();

  return (
    <main className="w-full">
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={data.heroImage}
            className="w-full h-full object-cover"
            alt="Worship"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-white text-5xl md:text-8xl font-black mb-6 tracking-tighter">
            {data.heroTitle}
          </h1>
          <p className="text-gray-100 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the transforming love of Christ at{" "}
            <br className="hidden md:block" />
            {data.churchName}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link
              href="/about"
              className="w-48 bg-[#8B19E6] text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:bg-[#7a16cc] transition-all"
            >
              Learn More
            </Link>
            <Link
              href="/events"
              className="w-48 bg-white text-gray-900 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:bg-gray-100 transition-all"
            >
              View Events
            </Link>
          </div>
        </div>
      </section>

      {data.announcements.length > 0 ? (
        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-5xl rounded-[32px] bg-[#8B19E6] p-8 text-white shadow-xl md:p-10">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-purple-100">
              Announcement
            </p>
            <h2 className="mb-4 text-3xl font-black tracking-tight md:text-4xl">
              {data.announcements[0].title}
            </h2>
            <p className="max-w-3xl text-base font-medium leading-7 text-purple-50 md:text-lg">
              {data.announcements[0].body}
            </p>
            <Link
              href="/events"
              className="mt-8 inline-flex rounded-2xl bg-white px-6 py-3 font-black uppercase tracking-widest text-[#8B19E6] transition-colors hover:bg-black hover:text-white"
            >
              View All Announcements
            </Link>
          </div>
        </section>
      ) : null}

      <section className="py-24 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-[#0A1F44] text-4xl font-extrabold mb-3">
          Join Us This Week
        </h2>
        <p className="text-gray-500 font-medium mb-16">
          We can&apos;t wait to worship with you!
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {data.weeklySchedule.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="w-full max-w-[420px] bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-gray-50 flex flex-col items-center md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
            >
              <div className="w-16 h-16 bg-[#F6E8FF] rounded-full flex items-center justify-center mb-6 text-[#8B19E6]">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A1F44] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm font-bold uppercase mb-4">
                {item.day}
              </p>
              <p className="text-[#8B19E6] text-xl font-black uppercase mb-4">
                {item.time}
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-[#F6E8FF] rounded-full flex items-center justify-center text-[#8B19E6]">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Location
              </span>
              <span className="text-[#0A1F44] font-bold text-base">
                {data.address}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#0A1F44] text-4xl font-extrabold mb-3 tracking-tight">
              Latest Sermon
            </h2>
            <p className="text-gray-500 font-medium">
              Catch up on what you missed
            </p>
          </div>

          <div className="flex flex-col md:flex-row overflow-hidden rounded-[40px] shadow-2xl min-h-[550px]">
            <Link
              href="/sermons"
              className="relative w-full md:w-1/2 group cursor-pointer overflow-hidden"
              aria-label="View sermons"
            >
              <img
                src={data.latestSermon.thumbnail}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Sermon Thumbnail"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-[#8B19E6] fill-current ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </Link>

            <div className="w-full md:w-1/2 bg-[#8B19E6] p-12 md:p-20 flex flex-col justify-center text-white">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/70 mb-6">
                Latest Message
              </span>
              <h3 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tighter">
                {data.latestSermon.title}
              </h3>
              <p className="text-white/80 text-lg mb-10 leading-relaxed max-w-md">
                {data.latestSermon.description}
              </p>
              <div className="mb-12">
                <p className="font-bold text-xl text-white">
                  {data.latestSermon.speaker}
                </p>
                <p className="text-white/50 text-sm mt-1">
                  {data.latestSermon.date} {" • "} {data.latestSermon.duration}
                </p>
              </div>
              <a
                href="/sermons"
                className="group/link flex items-center gap-3 font-bold text-lg w-fit"
              >
                <span>View All Sermons</span>
                <svg
                  className="w-6 h-6 transform group-hover/link:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col items-center text-center gap-4">
          <div>
            <h2 className="text-[#0A1F44] text-4xl font-extrabold mb-3 tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-gray-500 font-medium">
              Mark your calendar and join us
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {data.events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
            >
              <div className="bg-[#8B19E6] p-10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 scale-150 group-hover:scale-110 transition-transform duration-500 rounded-full translate-y-8" />
                <div className="relative z-10 w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30 backdrop-blur-sm">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-[#0A1F44] mb-6 min-h-[56px] flex items-center">
                  {event.title}
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-500 font-medium text-sm">
                    <svg
                      className="w-4 h-4 text-[#8B19E6]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 font-medium text-sm">
                    <svg
                      className="w-4 h-4 text-[#8B19E6]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 font-medium text-sm">
                    <svg
                      className="w-4 h-4 text-[#8B19E6]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {event.loc}
                  </div>
                </div>
                <Link
                  href={`/events/${event.id}`}
                  className="block w-full py-4 bg-[#8B19E6] text-white text-center font-bold rounded-2xl hover:brightness-110 active:scale-95 transition-all shadow-md"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#0A1F44] text-4xl font-extrabold mb-3 tracking-tight">
            Our Ministries
          </h2>
          <p className="text-gray-500 font-medium text-lg">
            Find your place to serve and grow
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {data.ministries.map((item, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-[32px] shadow-sm flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-[#8B19E6] rounded-full flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-[#8B19E6]/20">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={item.icon}
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A1F44] mb-4">
                {item.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#8B19E6] py-20 text-center text-white w-full">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
            Ready to Get Connected?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            We&apos;d love to meet you! Join us this Sunday and experience a welcoming community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#8B19E6] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Plan Your Visit
            </Link>
            <Link
              href="/giving"
              className="border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors"
            >
              Give Online
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
