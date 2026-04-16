import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "churchName",
      title: "Church Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "churchShortName",
      title: "Short Name",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "serviceTimes",
      title: "Service Times",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "time", title: "Time", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "time",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "giveButtonLabel",
      title: "Give Button Label",
      type: "string",
    }),
    defineField({
      name: "givePageHref",
      title: "Give Page Link",
      type: "string",
      initialValue: "/giving",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Shared church info",
      };
    },
  },
});
