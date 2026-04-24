"use client";

import { FormEvent, useState } from "react";

export default function UpdatesSubscribeCard() {
  const [email, setEmail] = useState("");
  const [announcements, setAnnouncements] = useState(true);
  const [events, setEvents] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          announcements,
          events,
        }),
      });

      const raw = await response.text();
      const result = raw ? JSON.parse(raw) : {};

      if (!response.ok) {
        throw new Error(
          (result as { error?: string }).error || "Could not save your subscription."
        );
      }

      setMessage(
        (result as { message?: string }).message || "You are now subscribed."
      );
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your subscription.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-3xl rounded-[32px] border border-gray-100 bg-white px-8 py-10 text-left shadow-sm">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-black text-[#0A1F44]">Stay Updated</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 text-gray-500">
          Subscribe to announcements and upcoming event updates from EL Bethel Global
          Harvest Church.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-black text-gray-700">Email Address</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-200 px-4 py-4 font-semibold text-gray-950 outline-none transition focus:border-[#8B19E6]"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={announcements}
              onChange={(event) => setAnnouncements(event.target.checked)}
              className="h-4 w-4 accent-[#8B19E6]"
            />
            Announcements
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={events}
              onChange={(event) => setEvents(event.target.checked)}
              className="h-4 w-4 accent-[#8B19E6]"
            />
            Events
          </label>
        </div>

        {message ? (
          <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            {message}
          </p>
        ) : null}

        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-[#8B19E6] px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#7a16cc] disabled:bg-gray-400"
          >
            {isLoading ? "Saving..." : "Subscribe for Updates"}
          </button>
        </div>
      </form>
    </div>
  );
}
