import { client } from "./client";

export type GiveReason = {
  title: string;
  description: string;
};

export type GivePageData = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  scriptureQuote: string;
  scriptureReference: string;
  formTitle: string;
  quickAmounts: string[];
  localQuickAmounts: string[];
  internationalQuickAmounts: string[];
  funds: string[];
  localGivingTitle: string;
  localGivingSubtitle: string;
  internationalGivingTitle: string;
  internationalGivingSubtitle: string;
  wiseInstructions: string;
  paymongoGivingEndpoint: string;
  paymongoGivingLink: string;
  wiseGivingLink: string;
  givingReasons: GiveReason[];
  monthlyTitle: string;
  monthlyPoints: string[];
  secureGivingText: string;
};

export const defaultGivePageData: GivePageData = {
  heroTitle: "Give",
  heroSubtitle: "Partner with us in making an eternal impact",
  heroImage: "https://images.unsplash.com/photo-1549416878-b9ca95e26903?q=80&w=1200",
  scriptureQuote:
    '"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."',
  scriptureReference: "2 Corinthians 9:7",
  formTitle: "Make Your Gift",
  quickAmounts: ["25", "50", "100", "250", "500", "1000"],
  localQuickAmounts: ["100", "250", "500", "1000"],
  internationalQuickAmounts: ["10", "25", "50", "100"],
  funds: ["Tithes", "Offering", "Missions", "Building Fund"],
  localGivingTitle: "PayMongo Local Giving",
  localGivingSubtitle: "Give through GCash, Maya, QRPh, cards, and other supported Philippine payment channels.",
  internationalGivingTitle: "Wise International Giving",
  internationalGivingSubtitle: "Give from outside the Philippines through Wise international transfer support.",
  wiseInstructions:
    "Use Wise for international giving. Your selected amount and fund will be passed to the giving link when configured.",
  paymongoGivingEndpoint: "",
  paymongoGivingLink: "",
  wiseGivingLink: "",
  givingReasons: [
    { title: "Support Ministry", description: "Enable life-changing programs and services" },
    { title: "Impact Lives", description: "Transform communities locally and globally" },
    { title: "Advance the Gospel", description: "Spread the message of hope worldwide" },
    { title: "Be Obedient", description: "Honor God through faithful stewardship" },
  ],
  monthlyTitle: "Monthly recurring gifts help us:",
  monthlyPoints: [
    "Plan long-term ministry initiatives",
    "Reduce administrative costs",
    "Make consistent community impact",
    "Support ongoing missions work",
  ],
  secureGivingText: "Your donation is secure and tax deductible",
};

const givePageQuery = `*[_type == "givePage"][0]{
  heroTitle,
  heroSubtitle,
  "heroImage": heroImage.asset->url,
  scriptureQuote,
  scriptureReference,
  formTitle,
  quickAmounts,
  localQuickAmounts,
  internationalQuickAmounts,
  funds,
  localGivingTitle,
  localGivingSubtitle,
  internationalGivingTitle,
  internationalGivingSubtitle,
  wiseInstructions,
  paymongoGivingEndpoint,
  paymongoGivingLink,
  wiseGivingLink,
  givingReasons[]{
    title,
    description
  },
  monthlyTitle,
  monthlyPoints,
  secureGivingText
}`;

export async function getGivePageData() {
  if (!client) {
    return defaultGivePageData;
  }

  try {
    const data = await client.fetch<Partial<GivePageData> | null>(givePageQuery);
    if (!data) {
      return defaultGivePageData;
    }

    return {
      ...defaultGivePageData,
      ...data,
      heroImage: data.heroImage || defaultGivePageData.heroImage,
      quickAmounts:
        data.quickAmounts && data.quickAmounts.length > 0
          ? data.quickAmounts
          : defaultGivePageData.quickAmounts,
      localQuickAmounts:
        data.localQuickAmounts && data.localQuickAmounts.length > 0
          ? data.localQuickAmounts
          : defaultGivePageData.localQuickAmounts,
      internationalQuickAmounts:
        data.internationalQuickAmounts && data.internationalQuickAmounts.length > 0
          ? data.internationalQuickAmounts
          : defaultGivePageData.internationalQuickAmounts,
      funds:
        data.funds && data.funds.length > 0
          ? data.funds
          : defaultGivePageData.funds,
      givingReasons:
        data.givingReasons && data.givingReasons.length > 0
          ? data.givingReasons
          : defaultGivePageData.givingReasons,
      monthlyPoints:
        data.monthlyPoints && data.monthlyPoints.length > 0
          ? data.monthlyPoints
          : defaultGivePageData.monthlyPoints,
    };
  } catch {
    return defaultGivePageData;
  }
}
