"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type MissionGalleryCarouselProps = {
  images: GallerySlide[];
};

type GallerySlide = {
  image: string;
  alt: string;
  label: string;
  title: string;
  description: string;
};

export function MissionGalleryCarousel({ images }: MissionGalleryCarouselProps) {
  const slides = images.map((item) => ({
    image: item.image,
    alt: item.alt,
    eyebrow: item.label,
    title: item.title,
    description: item.description,
  }));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (slides.length < 2 || isPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isPaused, slides.length]);

  useEffect(() => {
    if (expandedIndex === null) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedIndex(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [expandedIndex]);

  if (slides.length === 0) {
    return null;
  }

  const activeSlide = slides[activeIndex];
  const expandedSlide = expandedIndex !== null ? slides[expandedIndex] : null;

  return (
    <section
      className="relative overflow-hidden rounded-[40px] bg-[#0A1F44] shadow-[0_32px_90px_rgba(10,31,68,0.24)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,25,230,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,214,170,0.18),transparent_28%)]"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative h-[360px] md:h-[520px]">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.image}
            className={`absolute inset-0 ${index === activeIndex ? "pointer-events-auto" : "pointer-events-none"}`}
            initial={false}
            animate={{
              opacity: index === activeIndex ? 1 : 0,
              scale: index === activeIndex ? 1 : 1.04,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={() => setExpandedIndex(index)}
              className="h-full w-full cursor-zoom-in"
              aria-label={`Open full image for ${slide.title}`}
            >
              <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover" />
            </button>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,31,68,0.86)_0%,rgba(10,31,68,0.52)_38%,rgba(10,31,68,0.24)_62%,rgba(10,31,68,0.55)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,31,68,0.18)_0%,rgba(10,31,68,0.08)_38%,rgba(10,31,68,0.7)_100%)]" />
          </motion.div>
        ))}

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 md:p-8">
          <div className="rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-md">
            <span className="text-[0.65rem] font-black uppercase tracking-[0.35em] text-white/75">
              Life At El Bethel
            </span>
          </div>

          <div className="hidden rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-md md:block">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white/60">
              {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-white/65 md:text-sm">
              {activeSlide.eyebrow}
            </p>
            <h3 className="mt-3 max-w-md text-xl font-black leading-[1.02] text-white md:text-[2.5rem]">
              {activeSlide.title}
            </h3>
          </div>

          <div className="mt-8 flex items-end justify-between gap-4">
            <div className="flex items-center gap-3 rounded-full border border-white/12 bg-black/15 px-4 py-3 backdrop-blur-md">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.image}-dot-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-full transition-all ${
                    index === activeIndex ? "h-2.5 w-12 bg-white" : "h-2.5 w-2.5 bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((currentIndex) => (currentIndex - 1 + slides.length) % slides.length)
                }
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/16"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={() => setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/16"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {expandedSlide ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-4 backdrop-blur-sm"
          onClick={() => setExpandedIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={expandedSlide.title}
        >
          <button
            type="button"
            onClick={() => setExpandedIndex(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close image preview"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setExpandedIndex((current) =>
                current === null ? null : (current - 1 + slides.length) % slides.length
              );
            }}
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:scale-105 hover:bg-white/20"
            aria-label="Previous expanded image"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setExpandedIndex((current) =>
                current === null ? null : (current + 1) % slides.length
              );
            }}
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:scale-105 hover:bg-white/20"
            aria-label="Next expanded image"
          >
            <ChevronRight size={22} />
          </button>

          <div
            className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/15 bg-[#0A1F44] shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={expandedSlide.image}
              alt={expandedSlide.alt}
              className="max-h-[90vh] w-full object-contain bg-[#0A1F44]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(10,31,68,0)_0%,rgba(10,31,68,0.82)_100%)] p-5 md:p-6">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-white/65">
                {expandedSlide.eyebrow}
              </p>
              <p className="mt-3 text-xl font-black text-white md:text-2xl">
                {expandedSlide.title}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
                {expandedSlide.description}
              </p>
              <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-white/45">
                {String((expandedIndex ?? 0) + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
