import { defineField, defineType } from "sanity";

export const pushSubscriberType = defineType({
  name: "pushSubscriber",
  title: "Push Subscriber",
  type: "document",
  fields: [
    defineField({
      name: "token",
      title: "Expo Push Token",
      type: "string",
      validation: (rule) => rule.required(),
      readOnly: true,
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
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Android", value: "android" },
          { title: "iOS", value: "ios" },
          { title: "Unknown", value: "unknown" },
        ],
      },
    }),
    defineField({
      name: "deviceName",
      title: "Device Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "deviceName",
      subtitle: "platform",
      isActive: "isActive",
      announcements: "announcements",
      events: "events",
    },
    prepare({ title, subtitle, isActive, announcements, events }) {
      const tags = [
        announcements ? "Announcements" : null,
        events ? "Events" : null,
        isActive ? "Active" : "Inactive",
      ].filter(Boolean);

      return {
        title: title || "Push Subscriber",
        subtitle: [subtitle, tags.join(" • ")].filter(Boolean).join(" • "),
      };
    },
  },
});
