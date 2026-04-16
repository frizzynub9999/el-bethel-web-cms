import { getGivePageData } from "@/sanity/lib/give-page";
import GivingPageClient from "./giving-page-client";

export default async function GivingPage() {
  const data = await getGivePageData();

  return <GivingPageClient data={data} />;
}
