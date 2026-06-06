"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";

import { VideoModal } from "@/components/modal/VideoModal";
import { latestContentConfig } from "@/data/latest-content";
import type { LatestContentSlide } from "@/types/latest-content";

export function LatestFromBitscaleCard() {
  const { label, slides, autoRotateMs } = latestContentConfig;
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoSlide, setVideoSlide] = useState<LatestContentSlide | null>(
    null,
  );

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex((index + slides.length) % slides.length);
    },
    [slides.length],
  );

  const goNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    const timer = window.setInterval(goNext, autoRotateMs);
    return () => window.clearInterval(timer);
  }, [goNext, autoRotateMs]);

  const slide = slides[activeIndex];
  const { theme } = slide;

  return (
    <>
      <div
        className="dashboard-card dashboard-card--latest"
        style={{
          backgroundColor: theme.backgroundColor,
          borderColor: theme.borderColor,
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            className="dashboard-card__label"
            style={{ color: theme.labelColor }}
          >
            {label}
          </span>
          <div className="flex shrink-0 items-center gap-1.5">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={[
                  "carousel-dot",
                  index === activeIndex
                    ? "carousel-dot--active"
                    : "carousel-dot--inactive",
                ].join(" ")}
                style={{
                  backgroundColor:
                    index === activeIndex
                      ? theme.labelColor
                      : theme.dotInactiveColor,
                }}
              />
            ))}
          </div>
        </div>

        <div className="dashboard-card__body">
          <button
            type="button"
            onClick={() => setVideoSlide(slide)}
            className="latest-card-thumbnail"
            aria-label={`Play video: ${slide.title}`}
          >
            {slide.thumbnailSrc ? (
              <Image
                src={slide.thumbnailSrc}
                alt=""
                fill
                className="object-cover"
                sizes="152px"
                loading={activeIndex === 0 ? "eager" : "lazy"}
              />
            ) : (
              <div
                className="latest-card-thumbnail__fallback"
                style={{ backgroundColor: theme.dotInactiveColor }}
              />
            )}
            <span className="latest-card-thumbnail__play">
              <span className="latest-card-thumbnail__play-button">
                <Play className="h-4 w-4 fill-text-primary text-text-primary" />
              </span>
            </span>
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex min-w-0 flex-1 flex-col"
            >
              <h3 className="line-clamp-2 text-[14px] font-semibold leading-[20px] text-text-primary">
                {slide.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-[12px] leading-[18px] text-text-secondary">
                {slide.description}
              </p>
              <span className="mt-auto pt-2 text-[11px] leading-[16px] text-text-secondary">
                {slide.postedLabel}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <VideoModal
        open={videoSlide !== null}
        onClose={() => setVideoSlide(null)}
        title={videoSlide?.title ?? ""}
        videoUrl={videoSlide?.videoUrl}
      />
    </>
  );
}
