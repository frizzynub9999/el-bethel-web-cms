import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";
import { metadata as studioMetadata, viewport } from "next-sanity/studio";
import config from "../../../../../sanity.config";
import { hasRequiredSanityEnv } from "@/sanity/env";

export const dynamic = "force-static";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Sanity Studio | EL Bethel",
};

function MissingEnvNotice() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Sanity setup needed
        </p>
        <h1 className="mb-4 text-3xl font-bold">Add your Sanity environment variables</h1>
        <p className="mb-6 text-white/75">
          Create a <code>.env.local</code> file from <code>.env.example</code>, then fill in your
          Sanity project ID and dataset. Once those values are present, this Studio route will load
          normally.
        </p>
        <pre className="overflow-x-auto rounded-2xl bg-black/40 p-4 text-sm text-white/85">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-18`}
        </pre>
      </div>
    </main>
  );
}

export { viewport };

export default function StudioPage() {
  if (!hasRequiredSanityEnv) {
    return <MissingEnvNotice />;
  }

  return <NextStudio config={config} />;
}
