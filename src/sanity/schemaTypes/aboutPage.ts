import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "storyTitle",
      title: "Story Section Title",
      type: "string",
    }),
    defineField({
      name: "storyParagraphs",
      title: "Story Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text" })],
    }),
    defineField({
      name: "storyImage",
      title: "Story Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "missionTitle",
      title: "Mission Title",
      type: "string",
    }),
    defineField({
      name: "missionText",
      title: "Mission Text",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "visionTitle",
      title: "Vision Title",
      type: "string",
    }),
    defineField({
      name: "visionText",
      title: "Vision Text",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "values",
      title: "Core Values",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon Name", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "leadership",
      title: "Leadership Team",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({
              name: "bio",
              title: "Bio",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "role",
              media: "image",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "beliefs",
      title: "Beliefs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon Name", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "text",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "contactTitle",
      title: "Contact Section Title",
      type: "string",
    }),
    defineField({
      name: "contactSubtitle",
      title: "Contact Section Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "contactButtonText",
      title: "Contact Button Text",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page",
        subtitle: "Website content",
      };
    },
  },
});
