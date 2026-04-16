"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Globe, Instagram, Facebook } from "lucide-react";
import { SiteSettings } from "@/sanity/lib/site-settings";

export default function ContactPageClient({ settings }: { settings: SiteSettings }) {
  const [pending, setPending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setTimeout(() => {
      setPending(false);
      alert("Message sent! We will get back to you shortly.");
    }, 1500);
  };

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

              <div className="mt-12 pt-8 border-t border-white/10 flex gap-4">
                <button className="bg-white/10 p-4 rounded-2xl hover:bg-[#8B19E6] transition-all"><Instagram size={20} /></button>
                <button className="bg-white/10 p-4 rounded-2xl hover:bg-[#8B19E6] transition-all"><Facebook size={20} /></button>
                <button className="bg-white/10 p-4 rounded-2xl hover:bg-[#8B19E6] transition-all"><Globe size={20} /></button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-[40px] p-8 md:p-16 border border-gray-100 shadow-sm">
              <div className="mb-12">
                <h2 className="text-4xl font-black text-gray-900 uppercase italic tracking-tighter mb-4">Send a Message</h2>
                <p className="text-gray-500 font-medium">
                  Have a prayer request or a question about {settings.churchShortName}? Fill out the form below.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-[#8B19E6] transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-[#8B19E6] transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Subject</label>
                  <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-[#8B19E6] transition-all appearance-none">
                    <option>General Inquiry</option>
                    <option>Prayer Request</option>
                    <option>Volunteer Opportunity</option>
                    <option>Media/Press</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Your Message</label>
                  <textarea
                    rows={5}
                    required
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-[#8B19E6] transition-all"
                    placeholder="How can we help you today?"
                  />
                </div>

                <button
                  disabled={pending}
                  className="w-full md:w-auto bg-[#8B19E6] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  {pending ? "Sending..." : <>Send Message <Send size={20} /></>}
                </button>
              </form>
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
        <div className="bg-gray-100 h-[400px] rounded-[40px] flex items-center justify-center text-gray-400 font-bold overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200')] bg-cover bg-center grayscale opacity-20" />
          <div className="relative z-10 text-center">
            <div className="bg-white p-6 rounded-3xl shadow-2xl inline-block mb-4 text-[#8B19E6]">
              <MapPin size={40} />
            </div>
            <h4 className="text-black text-xl font-black uppercase italic">{settings.churchShortName}</h4>
            <p className="text-gray-600">{settings.address}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
