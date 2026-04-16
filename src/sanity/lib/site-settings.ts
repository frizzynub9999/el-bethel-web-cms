import { client } from "./client";

export type ServiceTime = {
  label: string;
  time: string;
  description?: string;
};

export type SiteSettings = {
  churchName: string;
  churchShortName: string;
  tagline: string;
  footerDescription: string;
  serviceTimes: ServiceTime[];
  phone: string;
  email: string;
  address: string;
  giveButtonLabel: string;
  givePageHref: string;
};

export const defaultSiteSettings: SiteSettings = {
  churchName: "EL Bethel Global Harvest Church",
  churchShortName: "EL Bethel",
  tagline: "Global Harvest Church",
  footerDescription:
    "A community of faith, hope, and love, dedicated to transforming lives through the Gospel of Jesus Christ.",
  serviceTimes: [
    {
      label: "Sunday Worship",
      time: "9:00 AM & 11:00 AM",
      description: "Join us for uplifting worship and biblical teaching",
    },
    {
      label: "Wednesday Bible Study",
      time: "7:00 PM",
      description: "Dive deep into God's Word with our community",
    },
    {
      label: "Friday Prayer Night",
      time: "8:00 PM",
      description: "Corporate prayer and intercession",
    },
  ],
  phone: "(555) 123-4567",
  email: "info@elbethel.org",
  address: "123 Faith Avenue, City, State",
  giveButtonLabel: "Give",
  givePageHref: "/giving",
};

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  churchName,
  churchShortName,
  tagline,
  footerDescription,
  serviceTimes[]{
    label,
    time,
    description
  },
  phone,
  email,
  address,
  giveButtonLabel,
  givePageHref
}`;

export async function getSiteSettings() {
  if (!client) {
    return defaultSiteSettings;
  }

  try {
    const data = await client.fetch<Partial<SiteSettings> | null>(siteSettingsQuery);
    if (!data) {
      return defaultSiteSettings;
    }

    return {
      ...defaultSiteSettings,
      ...data,
      serviceTimes:
        data.serviceTimes && data.serviceTimes.length > 0
          ? data.serviceTimes
          : defaultSiteSettings.serviceTimes,
    };
  } catch {
    return defaultSiteSettings;
  }
}
