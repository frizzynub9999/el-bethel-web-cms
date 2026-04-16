import { NextRequest, NextResponse } from "next/server";
import { importFacebookSermons } from "@/lib/meta/import-sermons";
import { getMetaConfig } from "@/lib/meta/env";

export async function POST(request: NextRequest) {
  try {
    const { importSecret } = getMetaConfig();
    const headerSecret = request.headers.get("x-import-secret")?.trim();

    if (!headerSecret || headerSecret !== importSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await importFacebookSermons();

    return NextResponse.json({
      ok: true,
      imported: result.imported,
      ids: result.ids,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown import error",
      },
      { status: 500 }
    );
  }
}
