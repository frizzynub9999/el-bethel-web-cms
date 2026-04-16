import { createClient } from "next-sanity";
import { apiVersion, dataset, hasRequiredSanityEnv, projectId } from "../env";

export const client = hasRequiredSanityEnv
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      stega: {
        studioUrl: "/studio",
      },
    })
  : null;
