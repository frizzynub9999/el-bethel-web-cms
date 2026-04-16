import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You for Giving | EL Bethel Global Harvest Church",
  description: "Thank you for supporting the ministry of EL Bethel Global Harvest Church.",
};

export default function GivingSuccessPage() {
  return (
    <section className="min-h-[70vh] bg-white px-6 py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#8B19E6]/10 text-[#8B19E6]">
          <CheckCircle2 size={52} strokeWidth={2.5} />
        </div>

        <p className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-[#8B19E6]">
          <HeartHandshake size={18} />
          Gift received
        </p>

        <h1 className="mb-6 text-5xl font-black uppercase italic tracking-tighter text-gray-950 md:text-7xl">
          Thank You
        </h1>

        <p className="mb-10 max-w-2xl text-lg font-medium leading-8 text-gray-600">
          Your generosity helps us serve our church family, reach our community, and keep
          sharing the hope of Jesus.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-[#8B19E6] px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
          >
            Back Home
          </Link>
          <Link
            href="/giving"
            className="rounded-xl border-2 border-gray-200 px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-gray-900 transition-colors hover:border-[#8B19E6] hover:text-[#8B19E6]"
          >
            Give Again
          </Link>
        </div>
      </div>
    </section>
  );
}
