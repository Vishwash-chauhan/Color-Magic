"use client";

import { useState, useEffect } from "react";

interface ImageCarouselProps {
  images: string[];
  alt?: string;
}

export default function ImageCarousel({ images, alt = "product" }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // reset index when images change
    setIndex(0);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
        <img src="/placeholder.png" alt="placeholder" className="w-full h-96 object-cover" />
      </div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
      <img src={images[index]} alt={`${alt} ${index + 1}`} className="w-full h-96 object-cover" />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
          >
            ‹
          </button>

          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
          >
            ›
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
                className={`h-2 w-8 rounded-full transition-opacity ${i === index ? "bg-white" : "bg-white/50 opacity-40"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
