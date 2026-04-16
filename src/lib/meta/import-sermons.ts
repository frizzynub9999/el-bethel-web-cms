import "server-only";

import { writeClient } from "@/sanity/lib/write-client";
import { defaultSermons } from "@/sanity/lib/content";
import { getMetaConfig } from "./env";

type MetaVideo = {
  id: string;
  title?: string;
  description?: string;
  created_time?: string;
  permalink_url?: string;
  length?: number;
  thumbnails?: {
    data?: Array<{
      uri?: string;
    }>;
  };
};

type MetaPost = {
  id: string;
  message?: string;
  created_time?: string;
  permalink_url?: string;
  attachments?: {
    data?: Array<{
      media_type?: string;
      type?: string;
      url?: string;
      media?: {
        image?: {
          src?: string;
        };
      };
      target?: {
        id?: string;
      };
      title?: string;
      description?: string;
    }>;
  };
};

type MetaVideoResponse = {
  data?: MetaVideo[];
  paging?: {
    next?: string;
  };
  error?: {
    message?: string;
  };
};

type MetaPostResponse = {
  data?: MetaPost[];
  error?: {
    message?: string;
  };
};

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, "").trim();
}

function pickTitle(video: MetaVideo, index: number) {
  const title = video.title?.trim();
  if (title) {
    return title;
  }

  const description = video.description?.trim();
  if (description) {
    return description.split("\n")[0].slice(0, 80);
  }

  return `Facebook Sermon ${index + 1}`;
}

function pickDescription(video: MetaVideo) {
  return stripHtml(video.description?.trim() || defaultSermons[0].description);
}

function pickDate(value: string | undefined) {
  if (!value) {
    return new Date().toISOString().slice(0, 10);
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }

  return date.toISOString().slice(0, 10);
}

function pickDuration(seconds: number | undefined) {
  if (!seconds || seconds <= 0) {
    return defaultSermons[0].duration;
  }

  const minutes = Math.max(1, Math.round(seconds / 60));
  return `${minutes} min`;
}

async function fetchPageVideos() {
  const { graphApiVersion, pageAccessToken, pageId } = getMetaConfig();
  const url = new URL(`https://graph.facebook.com/${graphApiVersion}/${pageId}/videos`);

  url.searchParams.set(
    "fields",
    "id,title,description,created_time,permalink_url,length,thumbnails"
  );
  url.searchParams.set("access_token", pageAccessToken);

  const response = await fetch(url.toString(), {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const json = (await response.json()) as MetaVideoResponse;

  if (!response.ok || json.error) {
    throw new Error(json.error?.message || "Failed to fetch Facebook videos.");
  }

  return json.data || [];
}

async function fetchVideoPosts() {
  const { graphApiVersion, pageAccessToken, pageId } = getMetaConfig();
  const url = new URL(`https://graph.facebook.com/${graphApiVersion}/${pageId}/posts`);

  url.searchParams.set(
    "fields",
    "id,message,created_time,permalink_url,attachments{media_type,type,url,title,description,target,media}"
  );
  url.searchParams.set("access_token", pageAccessToken);

  const response = await fetch(url.toString(), {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const json = (await response.json()) as MetaPostResponse;

  if (!response.ok || json.error) {
    throw new Error(json.error?.message || "Failed to fetch Facebook posts.");
  }

  return json.data || [];
}

function mapPostsToVideos(posts: MetaPost[]): MetaVideo[] {
  return posts
    .flatMap((post) => {
      const attachments = post.attachments?.data || [];

      return attachments
        .filter((attachment) => {
          const type = attachment.type?.toLowerCase() || "";
          const mediaType = attachment.media_type?.toLowerCase() || "";

          return type.includes("video") || mediaType.includes("video");
        })
        .map((attachment) => ({
          id: attachment.target?.id || post.id,
          title: attachment.title || post.message?.split("\n")[0],
          description: attachment.description || post.message,
          created_time: post.created_time,
          permalink_url: attachment.url || post.permalink_url,
          thumbnails: {
            data: [
              {
                uri: attachment.media?.image?.src,
              },
            ],
          },
        }));
    })
    .filter((video) => Boolean(video.id && video.permalink_url));
}

export async function importFacebookSermons() {
  if (!writeClient) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN for sermon import.");
  }

  const directVideos = await fetchPageVideos();
  const videos =
    directVideos.length > 0
      ? directVideos
      : mapPostsToVideos(await fetchVideoPosts());

  const transaction = writeClient.transaction();

  videos.forEach((video, index) => {
    const publishedAt = pickDate(video.created_time);
    const title = pickTitle(video, index);

    transaction.createOrReplace({
      _id: `sermon-facebook-${video.id}`,
      _type: "sermon",
      title,
      speaker: "EL Bethel Global Harvest Church",
      publishedAt,
      duration: pickDuration(video.length),
      series: "Facebook Sermons",
      description: pickDescription(video),
      facebookVideoId: video.id,
      thumbnailUrl:
        video.thumbnails?.data?.find((item) => item.uri)?.uri ||
        defaultSermons[0].thumbnail,
      videoUrl: video.permalink_url || defaultSermons[0].videoUrl,
      source: "facebook",
      featured: index === 0,
    });
  });

  await transaction.commit();

  return {
    imported: videos.length,
    ids: videos.map((video) => video.id),
  };
}
