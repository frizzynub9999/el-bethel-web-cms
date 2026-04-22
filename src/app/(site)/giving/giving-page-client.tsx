"use client";

import { CheckCircle2, Clock3, HeartHandshake } from "lucide-react";
import { GivePageData } from "@/sanity/lib/give-page";

interface GivingPageClientProps {
  data: GivePageData;
}

export default function GivingPageClient({ data }: GivingPageClientProps) {
  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <section className="relative flex min-h-[440px] items-center justify-center overflow-hidden bg-black font-sans">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/75 via-black/45 to-black/35" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.heroImage}
            className="h-full w-full object-cover opacity-65"
            alt="Giving"
          />
        </div>
        <div className="relative z-20 flex max-w-3xl flex-col items-center px-6 text-center text-white">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.32em] text-purple-100">
            {data.heroSubtitle}
          </p>
          <h1 className="text-5xl font-black uppercase italic tracking-tight md:text-7xl">
            Giving Online
          </h1>
        </div>
      </section>

      <section className="relative z-30 mx-auto -mt-14 mb-20 max-w-5xl px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl md:p-14">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-50 text-[#8A2BE2]">
            <HeartHandshake size={42} strokeWidth={2.5} />
          </div>

          <p className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-purple-50 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#8A2BE2]">
            <Clock3 size={16} />
            Payment setup in progress
          </p>

          <h2 className="mx-auto max-w-3xl text-4xl font-black uppercase italic tracking-tight text-gray-950 md:text-6xl">
            Giving Online Will Be Available Soon
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-8 text-gray-600 md:text-lg">
            We are currently processing the activation of our online payment methods.
            Once PayMongo payment channels are ready, this page will be updated for secure
            online giving.
          </p>

          <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
            {[
              "PayMongo account signed up",
              "Payment methods under activation",
              "Online giving coming soon",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <CheckCircle2 className="mb-3 text-[#8A2BE2]" size={24} strokeWidth={3} />
                <p className="text-sm font-black text-gray-900">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl bg-[#8A2BE2] p-6 text-white">
            <p className="text-sm font-semibold leading-7 text-purple-50">
              Thank you for your patience and generosity. Please check back soon for
              updates from EL Bethel Global Harvest Church.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
