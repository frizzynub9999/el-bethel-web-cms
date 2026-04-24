import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { getAboutPageData, iconMap } from "@/sanity/lib/about-page";
import { MissionGalleryCarousel } from "./mission-gallery-carousel";

export default async function AboutPage() {
  const data = await getAboutPageData();
  const missionGalleryImages =
    data.missionGallery.length > 0
      ? data.missionGallery
      : [
          {
            image: data.storyImage,
            alt: "Church story image",
            label: "Story",
            title: "A glimpse of our church family",
            description: "A featured moment from the life of the church.",
          },
          ...data.leadership.slice(0, 2).map((leader) => ({
            image: leader.img,
            alt: leader.name,
            label: "Leadership",
            title: leader.role,
            description: leader.bio,
          })),
        ];

  return (
    <main className="w-full bg-white">
      <section className="relative w-full h-[50vh] flex items-center justify-center bg-[#8B19E6] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={data.heroImage}
            className="w-full h-full object-cover"
            alt="Hero Background"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-5xl md:text-7xl font-black mb-4 tracking-tighter">
            {data.heroTitle}
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto uppercase tracking-widest">
            {data.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-[#0A1F44] text-4xl font-black leading-tight">
              {data.storyTitle}
            </h2>
            <div className="space-y-4 text-gray-500 text-lg leading-relaxed">
              {data.storyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="rounded-[40px] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <img
              src={data.storyImage}
              className="w-full h-[500px] object-cover"
              alt="Church Building"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#8B19E6] rounded-[40px] p-12 text-white shadow-xl flex flex-col justify-center min-h-[400px]">
              <h2 className="text-4xl font-black mb-8">{data.missionTitle}</h2>
              <p className="text-white/90 text-xl leading-relaxed font-medium">
                {data.missionText}
              </p>
            </div>

            <div className="bg-white rounded-[40px] p-12 text-[#0A1F44] shadow-2xl border border-gray-100 flex flex-col justify-center min-h-[400px]">
              <h2 className="text-4xl font-black mb-8">{data.visionTitle}</h2>
              <p className="text-gray-500 text-xl leading-relaxed font-medium">
                {data.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.35em] text-[#8B19E6]">
              Mission In Motion
            </p>
            <h2 className="mb-4 text-4xl font-black text-[#0A1F44] md:text-5xl">
              A glimpse of our church family
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-500">
              Worship, care, and community are at the heart of who we are.
            </p>
          </div>

          <MissionGalleryCarousel images={missionGalleryImages} />
        </div>
      </section>

      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-[#0A1F44] text-4xl font-black mb-4">Our Core Values</h2>
          <p className="text-gray-500 text-lg">The principles that guide everything we do</p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {data.values.map((value, index) => {
            const Icon = iconMap[value.icon];

            return (
              <div
                key={index}
                className="bg-gray-50 p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-[#F6E8FF] rounded-2xl flex items-center justify-center mb-6 text-[#8B19E6] group-hover:bg-[#8B19E6] group-hover:text-white transition-colors">
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gray-50 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#0A1F44] text-4xl font-black mb-4">Our Leadership Team</h2>
          <p className="text-gray-500 text-lg">Shepherds dedicated to serving God&apos;s people</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {data.leadership.map((leader, index) => (
            <div key={index} className="group w-full max-w-[300px] text-center">
              <div className="w-full aspect-[4/5] rounded-[40px] overflow-hidden mb-6 shadow-lg">
                <img
                  src={leader.img}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={leader.name}
                />
              </div>
              <h3 className="text-xl font-bold text-[#0A1F44]">{leader.name}</h3>
              <p className="text-[#8B19E6] font-bold text-sm uppercase mb-2 tracking-widest">
                {leader.role}
              </p>
              <p className="text-gray-500 text-sm px-4">{leader.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0A1F44] py-24 px-6 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">What We Believe</h2>
            <p className="text-white/60 text-lg">The foundational truths that anchor our faith</p>
          </div>
          <div className="grid gap-6">
            {data.beliefs.map((item, index) => {
              const Icon = iconMap[item.icon];

              return (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 p-8 rounded-[30px] flex gap-6 items-start hover:bg-white/10 transition-colors"
                >
                  <div className="text-[#8B19E6] bg-white rounded-xl p-3">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/70 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#8B19E6] px-6 text-center text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black mb-6 tracking-tighter">{data.contactTitle}</h2>
          <p className="text-white/80 text-xl mb-16 max-w-2xl mx-auto">
            {data.contactSubtitle}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-[30px] p-10 border border-white/20 hover:bg-white/20 transition-all">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Phone className="text-white" size={24} />
              </div>
              <p className="text-white/60 text-sm uppercase tracking-widest font-bold mb-2">Phone</p>
              <p className="break-words text-lg font-bold sm:text-xl">{data.phone}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-[30px] p-10 border border-white/20 hover:bg-white/20 transition-all">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Mail className="text-white" size={24} />
              </div>
              <p className="text-white/60 text-sm uppercase tracking-widest font-bold mb-2">Email</p>
              <p className="break-all text-lg font-bold sm:text-xl">{data.email}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-[30px] p-10 border border-white/20 hover:bg-white/20 transition-all">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-white" size={24} />
              </div>
              <p className="text-white/60 text-sm uppercase tracking-widest font-bold mb-2">Address</p>
              <p className="break-words text-lg font-bold sm:text-xl">{data.address}</p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex bg-white text-[#8B19E6] px-12 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all shadow-2xl active:scale-95"
          >
            {data.contactButtonText}
          </Link>
        </div>
      </section>
    </main>
  );
}
