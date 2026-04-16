"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { SiteSettings } from "@/sanity/lib/site-settings";

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Sermons", href: "/sermons" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="bg-[#8B19E6] text-white font-bold rounded-xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg text-sm md:text-base">
            EB
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg md:text-xl leading-none text-[#1A1A1A]">
              {settings.churchShortName}
            </span>
            <span className="text-[8px] md:text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">
              {settings.tagline}
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#F6E8FF] hover:text-[#8B19E6] transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href={settings.givePageHref} className="hidden md:block">
            <button className="bg-[#8B19E6] text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all">
              {settings.giveButtonLabel}
            </button>
          </Link>

          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top duration-300 z-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-black uppercase italic text-gray-900 py-2 border-b border-gray-50 last:border-0"
            >
              {link.name}
            </Link>
          ))}
          <Link href={settings.givePageHref} onClick={() => setIsOpen(false)}>
            <button className="w-full bg-[#8B19E6] text-white py-4 rounded-2xl font-black uppercase italic flex items-center justify-center gap-2 shadow-lg">
              <Heart size={18} fill="white" /> {settings.giveButtonLabel} Now
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
