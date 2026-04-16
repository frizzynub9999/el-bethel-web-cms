"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, hasRequiredSanityEnv, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "EL Bethel CMS",
  basePath: "/studio",
  projectId: hasRequiredSanityEnv ? projectId : "missing-project-id",
  dataset: hasRequiredSanityEnv ? dataset : "missing-dataset",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
