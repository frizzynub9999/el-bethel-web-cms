"use client";

import { useMemo, useState } from "react";
import { Calendar, Clock, Play, Search } from "lucide-react";
import { SermonItem } from "@/sanity/lib/content";

type SermonsPageClientProps = {
  sermons: SermonItem[];
};

const getFacebookEmbedUrl = (url: string) => {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url
  )}&show_text=false&width=1280`;
};

function shouldUseDirectVideo(sermon: SermonItem) {
  const status = sermon.liveStatus?.toLowerCase() || "";
  const directUrl = sermon.directVideoUrl || "";
  const isLive = status.includes("live") && !status.includes("vod");

  return Boolean(directUrl && !isLive && !directUrl.includes(".m3u8"));
}

function SermonCard({ sermon }: { sermon: SermonItem }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
      <div className="relative h-56 bg-black flex items-center justify-center">
        {!isPlaying ? (
          <>
            <img
              src={sermon.thumbnail}
              className="w-full h-full object-cover object-center"
              alt={sermon.title}
            />
            <div className="absolute inset-0 bg-[#8B19E6]/20 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="bg-white p-4 rounded-full shadow-xl transform scale-90 group-hover:scale-100 transition-transform"
                aria-label={`Play ${sermon.title}`}
              >
                <Play className="text-[#8B19E6] fill-[#8B19E6]" size={24} />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <div className="w-full aspect-video">
              {shouldUseDirectVideo(sermon) ? (
                  <video
                    src={sermon.directVideoUrl}
                    className="h-full w-full bg-black object-contain"
                    controls
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <iframe
                    src={getFacebookEmbedUrl(sermon.videoUrl)}
                    className="h-full w-full"
                    style={{ border: "none" }}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    title={sermon.title}
                  />
                )}

            </div>
          </div>
        )}
      </div>

      <div className="p-8">
        <span className="text-[#8B19E6] text-xs font-black tracking-widest uppercase mb-3 block">
          {sermon.series}
        </span>
        <h3 className="text-2xl font-black mb-3 text-gray-900 group-hover:text-[#8B19E6] transition-colors">
          {sermon.title}
        </h3>
        <div className="flex items-center justify-between text-gray-400 text-sm font-bold gap-3">
          <span>{sermon.speaker}</span>
          <span>{sermon.date}</span>
        </div>
      </div>
    </div>
  );
}

export default function SermonsPageClient({ sermons }: SermonsPageClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("all");
  const [mainPlayerActive, setMainPlayerActive] = useState(false);

  const featuredSermon = sermons.find((sermon) => sermon.featured) || sermons[0];

  const series = useMemo(
    () => ["All Series", ...Array.from(new Set(sermons.map((sermon) => sermon.series).filter(Boolean)))],
    [sermons]
  );

  const filteredSermons = useMemo(() => {
    return sermons.filter((sermon) => {
      const matchesSearch =
        sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSeries =
        selectedSeries === "all" || sermon.series === selectedSeries;

      return matchesSearch && matchesSeries;
    });
  }, [searchTerm, selectedSeries, sermons]);

  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[400px] flex items-center justify-center bg-[#8B19E6]">
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-black mb-6 tracking-tighter uppercase italic">
            Sermons
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 font-medium">
            Watch and listen to life-changing messages from God&apos;s Word
          </p>
        </div>
      </section>

      {featuredSermon ? (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight uppercase italic">
                Latest Message
              </h2>
              <div className="w-20 h-1.5 bg-[#8B19E6] mx-auto rounded-full"></div>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-[#8B19E6] rounded-[40px] overflow-hidden shadow-2xl group">
                <div className="grid lg:grid-cols-2">
                  <div className="relative min-h-[320px] lg:min-h-full bg-black flex items-center justify-center overflow-hidden">
                    {!mainPlayerActive ? (
                      <>
                        <img
                          src={featuredSermon.thumbnail}
                          alt={featuredSermon.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <button
                            onClick={() => setMainPlayerActive(true)}
                            className="bg-white rounded-full p-6 shadow-2xl hover:scale-110 transition-transform"
                            aria-label={`Play ${featuredSermon.title}`}
                          >
                            <Play className="w-10 h-10 text-[#8B19E6] fill-[#8B19E6]" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-black p-4">
                        <div className="w-full aspect-video max-h-full">
                          {shouldUseDirectVideo(featuredSermon) ? (
                            <video
                              src={featuredSermon.directVideoUrl}
                              className="h-full w-full bg-black object-contain"
                              controls
                              playsInline
                              preload="metadata"
                            />
                          ) : (
                            <iframe
                              src={getFacebookEmbedUrl(featuredSermon.videoUrl)}
                              className="w-full h-full"
                              style={{ border: "none" }}
                              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                              allowFullScreen
                              title={featuredSermon.title}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-10 lg:p-14 text-white flex flex-col justify-center">
                    <span className="bg-white/20 w-fit px-4 py-1 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
                      {featuredSermon.series}
                    </span>

                    <h3 className="text-4xl font-black mb-6 leading-tight uppercase italic">
                      {featuredSermon.title}
                    </h3>

                    <p className="text-purple-100 mb-8 text-lg leading-relaxed">
                      {featuredSermon.description}
                    </p>

                    <div className="flex items-center gap-6 text-sm font-bold text-purple-200 mb-8 flex-wrap">
                      <span className="flex items-center gap-2">
                        <Calendar size={18} /> {featuredSermon.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={18} /> {featuredSermon.duration}
                      </span>
                    </div>

                    <button
                      onClick={() => setMainPlayerActive(true)}
                      className="bg-white text-[#8B19E6] px-10 py-4 rounded-xl font-black hover:bg-gray-100 transition-all w-fit shadow-xl uppercase"
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase italic">
                Message Archive
              </h2>
              <p className="text-gray-500 font-medium mt-2 uppercase text-xs tracking-widest">
                Browse our collection of past sermons
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search title..."
                  className="pl-12 pr-4 py-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-[#8B19E6] outline-none w-full sm:w-64"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
              </div>

              <select
                className="px-4 py-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-[#8B19E6] outline-none bg-white font-bold text-gray-700"
                onChange={(e) => setSelectedSeries(e.target.value)}
                value={selectedSeries}
              >
                {series.map((s) => (
                  <option key={s} value={s === "All Series" ? "all" : s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredSermons.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#8B19E6] px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black mb-6 tracking-tighter uppercase italic">
            Stay Connected
          </h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-medium">
            Follow us for daily encouragement, live stream updates, and a look behind the scenes at El Bethel.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-[#8B19E6] px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl">
              FACEBOOK
            </button>
            <button className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-white/20 transition-all">
              INSTAGRAM
            </button>
            <button className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-white/20 transition-all">
              YOUTUBE
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
