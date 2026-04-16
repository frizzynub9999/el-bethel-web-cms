import { NextRequest, NextResponse } from "next/server";
import { buildBibleApiUrl, fetchFromBibleApi, getBibleApiKey } from "../_api";

export async function GET(request: NextRequest) {
  const bibleId = request.nextUrl.searchParams.get("bibleId")?.trim();
  const bookId = request.nextUrl.searchParams.get("bookId")?.trim();

  if (!getBibleApiKey()) {
    return NextResponse.json(
      { message: "Bible API key is not configured on the backend." },
      { status: 500 },
    );
  }

  if (!bibleId || !bookId) {
    return NextResponse.json(
      { message: "Missing bibleId or bookId." },
      { status: 400 },
    );
  }

  return fetchFromBibleApi(
    buildBibleApiUrl(
      `/bibles/${encodeURIComponent(bibleId)}/books/${encodeURIComponent(bookId)}/chapters`,
    ),
  );
}
