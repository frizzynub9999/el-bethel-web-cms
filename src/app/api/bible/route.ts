import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "Bible API proxy",
    endpoints: {
      books: "/api/bible/books?bibleId=BIBLE_ID",
      chapters: "/api/bible/chapters?bibleId=BIBLE_ID&bookId=BOOK_ID",
      chapter: "/api/bible/chapter?bibleId=BIBLE_ID&chapterId=CHAPTER_ID",
      search: "/api/bible/search?bibleId=BIBLE_ID&query=John%203:16",
    },
  });
}
