import "server-only";

function required(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getMetaConfig() {
  return {
    pageId: required("META_PAGE_ID"),
    pageAccessToken: required("META_PAGE_ACCESS_TOKEN"),
    graphApiVersion: process.env.META_GRAPH_API_VERSION?.trim() || "v22.0",
    importSecret: required("META_IMPORT_SECRET"),
  };
}
