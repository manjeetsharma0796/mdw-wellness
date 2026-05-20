export type TileSize = "large" | "wide" | "tall" | "small";

export interface VideoTestimonial {
  id: number;
  name: string;
  condition: string;
  posterSrc: string;
  videoSrc: string | null;
  size: TileSize;
}

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: 1,
    name: "Priya S.",
    condition: "Back Pain Recovery",
    posterSrc: "/images/vt-1.jpg",
    videoSrc: null,
    size: "large",
  },
  {
    id: 2,
    name: "Rajesh K.",
    condition: "Sports Injury",
    posterSrc: "/images/vt-2.jpg",
    videoSrc: null,
    size: "wide",
  },
  {
    id: 3,
    name: "Anita D.",
    condition: "Post-Surgery Rehab",
    posterSrc: "/images/vt-3.jpg",
    videoSrc: null,
    size: "small",
  },
  {
    id: 4,
    name: "Vikram S.",
    condition: "Neck & Shoulder Pain",
    posterSrc: "/images/vt-4.jpg",
    videoSrc: null,
    size: "small",
  },
  {
    id: 5,
    name: "Meera P.",
    condition: "Posture Correction",
    posterSrc: "/images/vt-5.jpg",
    videoSrc: null,
    size: "wide",
  },
  {
    id: 6,
    name: "Arjun M.",
    condition: "Knee Rehabilitation",
    posterSrc: "/images/vt-6.jpg",
    videoSrc: null,
    size: "wide",
  },
];
