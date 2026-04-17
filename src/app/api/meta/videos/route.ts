import { NextResponse } from "next/server";
import { getSermons } from "@/sanity/lib/content";

export async function GET() {
  const sermons = await getSermons();

  return NextResponse.json(
    sermons.map((sermon, index) => ({
      id: sermon.id,
      title: sermon.title,
      speaker: sermon.speaker,
      createdTime: sermon.date,
      duration: sermon.duration,
      series: sermon.series,
      description: sermon.description,
      imageUrl: sermon.thumbnail,
      thumbnail: sermon.thumbnail,
      videoUrl: sermon.videoUrl,
      facebookUrl: sermon.videoUrl,
      directVideoUrl: sermon.directVideoUrl || "",
      liveStatus: sermon.liveStatus || "",
      featured: index === 0 ? true : sermon.featured,
    })),
  );
}
