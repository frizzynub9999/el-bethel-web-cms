import { defineField, defineType } from "sanity";

export const subscriberType = defineType({
  name: "subscriber",
  title: "Subscriber",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "announcements",
      title: "Announcements",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "events",
      title: "Events",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isActive",
      title: "Active Subscription",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "email",
      announcements: "announcements",
      events: "events",
      isActive: "isActive",
    },
    prepare({ title, announcements, events, isActive }) {
      const tags = [
        announcements ? "Announcements" : null,
        events ? "Events" : null,
        isActive ? "Active" : "Inactive",
      ].filter(Boolean);

      return {
        title,
        subtitle: tags.join(" • "),
      };
    },
  },
});
