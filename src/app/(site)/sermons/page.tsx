import SermonsPageClient from "./sermons-page-client";
import { getSermons } from "@/sanity/lib/content";

export default async function SermonsPage() {
  const sermons = await getSermons();

  return <SermonsPageClient sermons={sermons} />;
}
