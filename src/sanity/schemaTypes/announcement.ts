import { defineField, defineType } from "sanity";

export const announcementType = defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Message",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publish Date",
      type: "datetime",
    }),
    defineField({
      name: "pinned",
      title: "Pinned announcement",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sendNotification",
      title: "Send notification to subscribers",
      type: "boolean",
      initialValue: false,
      description:
        "Turn this on only when the announcement is ready. A webhook will send one email blast and then reset this field.",
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
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "body",
    },
  },
});
