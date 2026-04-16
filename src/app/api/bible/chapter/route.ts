import { NextRequest, NextResponse } from "next/server";
import { buildBibleApiUrl, fetchFromBibleApi, getBibleApiKey } from "../_api";

export async function GET(request: NextRequest) {
  const bibleId = request.nextUrl.searchParams.get("bibleId")?.trim();
  const chapterId = request.nextUrl.searchParams.get("chapterId")?.trim();

  if (!getBibleApiKey()) {
    return NextResponse.json(
      { message: "Bible API key is not configured on the backend." },
      { status: 500 },
    );
  }

  if (!bibleId || !chapterId) {
    return NextResponse.json(
      { message: "Missing bibleId or chapterId." },
      { status: 400 },
    );
  }

  return fetchFromBibleApi(
    buildBibleApiUrl(
      `/bibles/${encodeURIComponent(bibleId)}/chapters/${encodeURIComponent(chapterId)}`,
      {
        "content-type": "html",
        "include-notes": "false",
        "include-titles": "true",
        "include-chapter-numbers": "false",
        "include-verse-numbers": "true",
      },
    ),
  );
}
