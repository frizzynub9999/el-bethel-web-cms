function readEnvValue(value: string | undefined) {
  return value?.trim() || "";
}

export const apiVersion =
  readEnvValue(process.env.NEXT_PUBLIC_SANITY_API_VERSION) ||
  readEnvValue(process.env.SANITY_API_VERSION) ||
  "2026-03-18";

export const dataset =
  readEnvValue(process.env.NEXT_PUBLIC_SANITY_DATASET) ||
  readEnvValue(process.env.SANITY_DATASET);
export const projectId =
  readEnvValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) ||
  readEnvValue(process.env.SANITY_PROJECT_ID);
export const hasRequiredSanityEnv = Boolean(projectId && dataset);
