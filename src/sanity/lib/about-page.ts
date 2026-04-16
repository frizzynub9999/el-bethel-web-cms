import {
  Anchor,
  Award,
  BookOpen,
  Globe,
  Heart,
  Mail,
  MapPin,
  Phone,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { client } from "./client";
import { getSiteSettings } from "./site-settings";

export const iconMap = {
  Heart,
  Target,
  Users,
  Globe,
  Award,
  Shield,
  BookOpen,
  Anchor,
  Zap,
  Phone,
  Mail,
  MapPin,
} as const;

type IconName = keyof typeof iconMap;

export type AboutItem = {
  icon: IconName;
  title: string;
  description: string;
};

export type AboutLeader = {
  name: string;
  role: string;
  bio: string;
  img: string;
};

export type AboutBelief = {
  icon: IconName;
  title: string;
  text: string;
};

export type AboutPageData = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  storyTitle: string;
  storyParagraphs: string[];
  storyImage: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  values: AboutItem[];
  leadership: AboutLeader[];
  beliefs: AboutBelief[];
  contactTitle: string;
  contactSubtitle: string;
  phone: string;
  email: string;
  address: string;
  contactButtonText: string;
};

function toIconName(value: string | undefined, fallback: IconName): IconName {
  if (value && value in iconMap) {
    return value as IconName;
  }

  return fallback;
}

export const defaultAboutPageData: AboutPageData = {
  heroTitle: "About Us",
  heroSubtitle: "Our Story & Mission",
  heroImage: "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=2072",
  storyTitle: "A Beacon of Light for Over Two Decades",
  storyParagraphs: [
    "Founded on the principles of faith, hope, and love, EL Bethel Global Harvest Church has been a vibrant, diverse community united by our love for Jesus Christ.",
    'The name "EL Bethel" means "The God of the House of God," reflecting our commitment to being a place where people can encounter God\'s presence and experience genuine transformation.',
  ],
  storyImage: "https://images.unsplash.com/photo-1761477104708-b1c0281e698c?q=80&w=1080",
  missionTitle: "Our Mission",
  missionText:
    "To make disciples of all nations by sharing the transformative message of Jesus Christ, equipping believers for effective ministry, and serving our community with excellence and compassion. We exist to help people know God, find freedom, discover purpose, and make a difference.",
  visionTitle: "Our Vision",
  visionText:
    "To be a Christ-centered, Spirit-empowered, mission-focused church that transforms lives, strengthens families, and impacts our world. We envision a community where every person experiences authentic worship, genuine relationships, and purposeful service, resulting in a global harvest of souls for the Kingdom of God.",
  values: [
    {
      icon: "Heart",
      title: "Love",
      description:
        "Demonstrating unconditional love and compassion to all people, reflecting Christ's love for humanity.",
    },
    {
      icon: "Target",
      title: "Purpose",
      description:
        "Helping everyone discover and fulfill their God-given purpose through intentional discipleship.",
    },
    {
      icon: "Users",
      title: "Community",
      description:
        "Creating authentic relationships and meaningful connections where everyone belongs.",
    },
    {
      icon: "Globe",
      title: "Global Vision",
      description:
        "Making an impact locally and globally by spreading the Gospel to all nations.",
    },
    {
      icon: "Award",
      title: "Excellence",
      description:
        "Pursuing excellence in everything we do, honoring God with our best efforts.",
    },
    {
      icon: "Shield",
      title: "Integrity",
      description:
        "Operating with honesty, transparency, and accountability in all our actions.",
    },
  ],
  leadership: [
    {
      name: "Pastor James Williams",
      role: "Senior Pastor",
      bio: "Leading our church with vision and passion for over 15 years.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
    },
    {
      name: "Pastor Sarah Johnson",
      role: "Associate Pastor",
      bio: "Overseeing ministries and community outreach programs.",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974",
    },
    {
      name: "Pastor Michael Chen",
      role: "Youth Pastor",
      bio: "Empowering the next generation to live boldly for Christ.",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
    },
    {
      name: "Pastor Emily Davis",
      role: "Children's Pastor",
      bio: "Nurturing children's faith through creative and engaging programs.",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070",
    },
  ],
  beliefs: [
    {
      icon: "BookOpen",
      title: "The Bible",
      text: "We believe the Bible is the inspired, infallible Word of God and our final authority for faith and practice.",
    },
    {
      icon: "Users",
      title: "The Trinity",
      text: "We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit.",
    },
    {
      icon: "Anchor",
      title: "Salvation",
      text: "We believe salvation is a gift of God's grace through faith in Jesus Christ.",
    },
    {
      icon: "Zap",
      title: "The Church",
      text: "We believe the Church is the body of Christ, called to worship, grow, and serve.",
    },
  ],
  contactTitle: "Get In Touch",
  contactSubtitle:
    "Have questions or want to learn more? We'd love to hear from you!",
  phone: "(555) 123-4567",
  email: "info@elbethel.org",
  address: "123 Faith Avenue",
  contactButtonText: "Contact Us",
};

const aboutPageQuery = `*[_type == "aboutPage"][0]{
  heroTitle,
  heroSubtitle,
  "heroImage": heroImage.asset->url,
  storyTitle,
  storyParagraphs,
  "storyImage": storyImage.asset->url,
  missionTitle,
  missionText,
  visionTitle,
  visionText,
  values[]{
    icon,
    title,
    description
  },
  leadership[]{
    name,
    role,
    bio,
    "img": image.asset->url
  },
  beliefs[]{
    icon,
    title,
    text
  },
  contactTitle,
  contactSubtitle,
  phone,
  email,
  address,
  contactButtonText
}`;

export async function getAboutPageData() {
  if (!client) {
    const settings = await getSiteSettings();

    return {
      ...defaultAboutPageData,
      phone: settings.phone || defaultAboutPageData.phone,
      email: settings.email || defaultAboutPageData.email,
      address: settings.address || defaultAboutPageData.address,
    };
  }

  try {
    const [data, settings] = await Promise.all([
      client.fetch<Partial<AboutPageData> | null>(aboutPageQuery),
      getSiteSettings(),
    ]);
    if (!data) {
      return {
        ...defaultAboutPageData,
        phone: settings.phone || defaultAboutPageData.phone,
        email: settings.email || defaultAboutPageData.email,
        address: settings.address || defaultAboutPageData.address,
      };
    }

    return {
      ...defaultAboutPageData,
      ...data,
      phone: settings.phone || defaultAboutPageData.phone,
      email: settings.email || defaultAboutPageData.email,
      address: settings.address || defaultAboutPageData.address,
      contactButtonText:
        data.contactButtonText || defaultAboutPageData.contactButtonText,
      heroImage: data.heroImage || defaultAboutPageData.heroImage,
      storyImage: data.storyImage || defaultAboutPageData.storyImage,
      storyParagraphs:
        data.storyParagraphs && data.storyParagraphs.length > 0
          ? data.storyParagraphs
          : defaultAboutPageData.storyParagraphs,
      values:
        data.values && data.values.length > 0
          ? data.values.map((item, index) => ({
              ...defaultAboutPageData.values[Math.min(index, defaultAboutPageData.values.length - 1)],
              ...item,
              icon: toIconName(item.icon, defaultAboutPageData.values[Math.min(index, defaultAboutPageData.values.length - 1)].icon),
            }))
          : defaultAboutPageData.values,
      leadership:
        data.leadership && data.leadership.length > 0
          ? data.leadership.map((item, index) => ({
              ...defaultAboutPageData.leadership[Math.min(index, defaultAboutPageData.leadership.length - 1)],
              ...item,
              img: item.img || defaultAboutPageData.leadership[Math.min(index, defaultAboutPageData.leadership.length - 1)].img,
            }))
          : defaultAboutPageData.leadership,
      beliefs:
        data.beliefs && data.beliefs.length > 0
          ? data.beliefs.map((item, index) => ({
              ...defaultAboutPageData.beliefs[Math.min(index, defaultAboutPageData.beliefs.length - 1)],
              ...item,
              icon: toIconName(item.icon, defaultAboutPageData.beliefs[Math.min(index, defaultAboutPageData.beliefs.length - 1)].icon),
            }))
          : defaultAboutPageData.beliefs,
    };
  } catch {
    return defaultAboutPageData;
  }
}
