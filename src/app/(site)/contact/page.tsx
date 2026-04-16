import ContactPageClient from "./contact-page-client";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return <ContactPageClient settings={settings} />;
}
