export type TileSize = "large" | "wide" | "tall" | "small";

export interface VideoTestimonial {
  id: number;
  name: string;
  condition: string;
  youtubeId: string | null;
  size: TileSize;
}

export const videoTestimonials: VideoTestimonial[] = [
  { id: 1, name: "Priya S.",  condition: "Back Pain Recovery",  youtubeId: "tPEE9ZwTmy0", size: "large" },
  { id: 2, name: "Rajesh K.", condition: "Sports Injury",        youtubeId: "tPEE9ZwTmy0", size: "wide"  },
  { id: 3, name: "Anita D.",  condition: "Post-Surgery Rehab",   youtubeId: "tPEE9ZwTmy0", size: "small" },
  { id: 4, name: "Vikram S.", condition: "Neck & Shoulder Pain", youtubeId: "tPEE9ZwTmy0", size: "small" },
  { id: 5, name: "Meera P.",  condition: "Posture Correction",   youtubeId: "tPEE9ZwTmy0", size: "wide"  },
  { id: 6, name: "Arjun M.",  condition: "Knee Rehabilitation",  youtubeId: "tPEE9ZwTmy0", size: "wide"  },
];
