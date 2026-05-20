export interface Service {
  id: number;
  title: string;
  youtubeId: string | null;
  thumbnailSrc: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Online Consultation",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailSrc: "/images/service-online.jpg",
  },
  {
    id: 2,
    title: "Home Therapy",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailSrc: "/images/service-home.jpg",
  },
  {
    id: 3,
    title: "Pain Management",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailSrc: "/images/service-pain.jpg",
  },
  {
    id: 4,
    title: "Sports Rehabilitation",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailSrc: "/images/service-sports.jpg",
  },
  {
    id: 5,
    title: "Post-Surgery Recovery",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailSrc: "/images/service-surgery.jpg",
  },
];
