import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

export const writeClient =
  projectId && dataset && token
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        token,
        useCdn: false,
      })
    : null;
