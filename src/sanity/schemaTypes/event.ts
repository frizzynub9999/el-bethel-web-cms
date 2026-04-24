import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventDate",
      title: "Event Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "day",
      title: "Day Label",
      type: "string",
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Featured event",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sendNotification",
      title: "Send notification to subscribers",
      type: "boolean",
      initialValue: false,
      description:
        "Turn this on only when the event details are final. A webhook will send one email blast and then reset this field.",
    }),
    defineField({
      name: "notificationSent",
      title: "Notification Sent",
      type: "boolean",
      initialValue: false,
      readOnly: true,
    }),
    defineField({
      name: "notificationSentAt",
      title: "Notification Sent At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Soonest first",
      name: "eventDateAsc",
      by: [{ field: "eventDate", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "image",
    },
  },
});
