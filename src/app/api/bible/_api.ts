import { NextResponse } from "next/server";

type ApiBibleErrorResponse = {
  message?: string;
  error?: string;
};

const bibleApiBaseUrl = process.env.BIBLE_API_BASE_URL || "https://rest.api.bible/v1";

export function getBibleApiKey() {
  return process.env.BIBLE_API_KEY;
}

export function buildBibleApiUrl(path: string, params?: Record<string, string>) {
  const baseUrl = bibleApiBaseUrl.replace(/\/$/, "");
  const url = new URL(`${baseUrl}${path}`);

  Object.entries(params || {}).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url;
}

export async function fetchFromBibleApi(url: URL) {
  const bibleApiKey = getBibleApiKey();

  if (!bibleApiKey) {
    return NextResponse.json(
      { message: "Bible API key is not configured on the backend." },
      { status: 500 },
    );
  }

  const response = await fetch(url, {
    headers: {
      "api-key": bibleApiKey,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  const data = (await response.json()) as unknown;

  if (!response.ok) {
    const errorData = data as ApiBibleErrorResponse;

    return NextResponse.json(
      {
        message:
          errorData.message ||
          errorData.error ||
          "Bible content is unavailable from API.Bible.",
      },
      { status: response.status },
    );
  }

  return NextResponse.json(data);
}
