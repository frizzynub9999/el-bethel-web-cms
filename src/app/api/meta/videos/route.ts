import { NextResponse } from "next/server";
import { getSermons } from "@/sanity/lib/content";

export async function GET() {
  const sermons = await getSermons();

  return NextResponse.json({
    count: sermons.length,
    first: sermons[0]
      ? {
          id: sermons[0].id,
          title: sermons[0].title,
          series: sermons[0].series,
          videoUrl: sermons[0].videoUrl,
          hasDirectVideoUrl: Boolean(sermons[0].directVideoUrl),
          liveStatus: sermons[0].liveStatus || "",
        }
      : null,
  });
}
