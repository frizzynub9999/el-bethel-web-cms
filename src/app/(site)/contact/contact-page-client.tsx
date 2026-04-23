"use client";

import { Mail, Phone, MapPin, Navigation, HeartHandshake } from "lucide-react";
import { SiteSettings } from "@/sanity/lib/site-settings";

export default function ContactPageClient({ settings }: { settings: SiteSettings }) {
  const phoneHref = `tel:${settings.phone.replace(/[^\d+]/g, "")}`;
  const emailHref = `mailto:${settings.email}`;
  const googleMapsHref = "https://maps.app.goo.gl/cMdPk4VbCEEf15KPA";
  const prayerEmailHref = `mailto:${settings.email}?subject=${encodeURIComponent(
    "Prayer Request"
  )}`;
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    settings.address
  )}&output=embed`;

  return (
    <main className="min-h-screen bg-white pb-20">
      <section className="h-[300px] flex items-center justify-center bg-[#8B19E6] text-white">
        <div className="text-center px-4">
          <h1 className="text-6xl font-black uppercase italic tracking-tighter">Contact Us</h1>
          <p className="text-xl font-medium mt-4 text-purple-100 uppercase tracking-widest">
            We&apos;re here for you
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-black text-white p-10 rounded-[40px] shadow-2xl">
              <h3 className="text-2xl font-black uppercase italic mb-8 tracking-tight">Visit Us</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-[#8B19E6] p-3 rounded-2xl"><MapPin size={24} /></div>
                  <div>
                    <p className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">Location</p>
                    <p className="font-bold leading-relaxed whitespace-pre-line">{settings.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#8B19E6] p-3 rounded-2xl"><Phone size={24} /></div>
                  <div>
                    <p className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">Phone</p>
                    <p className="font-bold">{settings.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#8B19E6] p-3 rounded-2xl"><Mail size={24} /></div>
                  <div>
                    <p className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">Email</p>
                    <p className="font-bold">{settings.email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid gap-3 border-t border-white/10 pt-8">
                <a
                  href={phoneHref}
                  className="rounded-2xl bg-white/10 px-5 py-4 text-center text-sm font-black uppercase tracking-widest transition-all hover:bg-[#8B19E6]"
                >
                  Call Us
                </a>
                <a
                  href={googleMapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-white/10 px-5 py-4 text-center text-sm font-black uppercase tracking-widest transition-all hover:bg-[#8B19E6]"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-[40px] p-8 md:p-16 border border-gray-100 shadow-sm">
              <div className="mb-12">
                <h2 className="text-4xl font-black text-gray-900 uppercase italic tracking-tighter mb-4">Reach Out Directly</h2>
                <p className="text-gray-500 font-medium">
                  Have a prayer request or a question about {settings.churchShortName}? Use one of the options below and your message will go through your phone or email app.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <a
                  href={phoneHref}
                  className="group rounded-[28px] border border-gray-100 bg-gray-50 p-8 transition-all hover:border-[#8B19E6] hover:bg-purple-50"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B19E6] text-white">
                    <Phone size={26} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic text-gray-950">Call Us</h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-gray-500">{settings.phone}</p>
                </a>

                <a
                  href={emailHref}
                  className="group rounded-[28px] border border-gray-100 bg-gray-50 p-8 transition-all hover:border-[#8B19E6] hover:bg-purple-50"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B19E6] text-white">
                    <Mail size={26} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic text-gray-950">Email Us</h3>
                  <p className="mt-3 break-all text-sm font-bold leading-6 text-gray-500">{settings.email}</p>
                </a>

                <a
                  href={googleMapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[28px] border border-gray-100 bg-gray-50 p-8 transition-all hover:border-[#8B19E6] hover:bg-purple-50"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B19E6] text-white">
                    <Navigation size={26} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic text-gray-950">Get Directions</h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-gray-500">{settings.address}</p>
                </a>

                <a
                  href={prayerEmailHref}
                  className="group rounded-[28px] border border-gray-100 bg-gray-50 p-8 transition-all hover:border-[#8B19E6] hover:bg-purple-50"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B19E6] text-white">
                    <HeartHandshake size={26} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic text-gray-950">Prayer Request</h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-gray-500">
                    Send a prayer request directly to the church email.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-gray-900 uppercase italic tracking-tighter mb-2">Visit Us</h2>
          <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">
            We&apos;re located in the heart of the community
          </p>
        </div>
        <div className="overflow-hidden rounded-[40px] border border-gray-100 bg-gray-100 shadow-sm">
          <iframe
            src={mapEmbedSrc}
            title={`${settings.churchShortName} location map`}
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex flex-col items-start justify-between gap-4 bg-white p-6 md:flex-row md:items-center">
            <div>
              <h4 className="text-xl font-black uppercase italic text-gray-950">
                {settings.churchShortName}
              </h4>
              <p className="mt-1 text-sm font-semibold leading-6 text-gray-500">
                {settings.address}
              </p>
            </div>
            <a
              href={googleMapsHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-[#8B19E6] px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-[#7a16cc]"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
