export interface Service {
  id: number;
  title: string;
  videoSrc: string | null;
  thumbnailSrc: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Online Consultation",
    videoSrc: null,
    thumbnailSrc: "/images/service-online.jpg",
  },
  {
    id: 2,
    title: "Home Therapy",
    videoSrc: null,
    thumbnailSrc: "/images/service-home.jpg",
  },
  {
    id: 3,
    title: "Pain Management",
    videoSrc: null,
    thumbnailSrc: "/images/service-pain.jpg",
  },
  {
    id: 4,
    title: "Sports Rehabilitation",
    videoSrc: null,
    thumbnailSrc: "/images/service-sports.jpg",
  },
  {
    id: 5,
    title: "Post-Surgery Recovery",
    videoSrc: null,
    thumbnailSrc: "/images/service-surgery.jpg",
  },
];
