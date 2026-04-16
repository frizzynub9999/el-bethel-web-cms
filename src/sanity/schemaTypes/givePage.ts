import { defineArrayMember, defineField, defineType } from "sanity";

export const givePageType = defineType({
  name: "givePage",
  title: "Give Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "scriptureQuote",
      title: "Scripture Quote",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "scriptureReference",
      title: "Scripture Reference",
      type: "string",
    }),
    defineField({
      name: "formTitle",
      title: "Form Title",
      type: "string",
    }),
    defineField({
      name: "quickAmounts",
      title: "Legacy Quick Amounts",
      description: "Kept for older app versions. Use the local and international amount fields below for the current giving page.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "localQuickAmounts",
      title: "Philippines Quick Amounts",
      description: "PHP amounts for PayMongo local giving.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "internationalQuickAmounts",
      title: "International Quick Amounts",
      description: "USD amounts for Wise international giving.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "funds",
      title: "Giving Funds",
      description: "Fund/category choices shown on the giving form.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "localGivingTitle",
      title: "Local Giving Title",
      type: "string",
    }),
    defineField({
      name: "localGivingSubtitle",
      title: "Local Giving Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "internationalGivingTitle",
      title: "International Giving Title",
      type: "string",
    }),
    defineField({
      name: "internationalGivingSubtitle",
      title: "International Giving Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "wiseInstructions",
      title: "Wise Instructions",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "paymongoGivingEndpoint",
      title: "PayMongo Giving Endpoint",
      description: "Optional backend endpoint that creates a PayMongo checkout and returns checkoutUrl, redirectUrl, or nextActionUrl.",
      type: "url",
    }),
    defineField({
      name: "paymongoGivingLink",
      title: "PayMongo Giving Link",
      description: "Optional PayMongo payment link fallback if no backend endpoint is configured.",
      type: "url",
    }),
    defineField({
      name: "wiseGivingLink",
      title: "Wise Giving Link",
      description: "Wise link used for international giving.",
      type: "url",
    }),
    defineField({
      name: "givingReasons",
      title: "Why Give",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
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
      name: "monthlyTitle",
      title: "Monthly Box Title",
      type: "string",
    }),
    defineField({
      name: "monthlyPoints",
      title: "Monthly Box Points",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "secureGivingText",
      title: "Secure Giving Text",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Give Page",
        subtitle: "Online giving content",
      };
    },
  },
});
