export interface Service {
  id: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  /**
   * When real videos are produced for a service, populate this field and
   * the services carousel will switch back to the YouTube iframe render path.
   */
  youtubeId?: string | null;
  /** Legacy field retained for future use (poster image, OG previews, etc). */
  thumbnailSrc?: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Physiotherapy",
    imageSrc: "/images/img1.jpg",
    imageAlt:
      "MDW physiotherapist fitting an ankle brace on a client at home.",
    youtubeId: null,
  },
  {
    id: 2,
    title: "Dry Cupping Therapy",
    imageSrc: "/images/img5.jpg",
    imageAlt:
      "Dry cupping therapy session with three cups placed on a client's back.",
    youtubeId: null,
  },
  {
    id: 3,
    title: "Acupuncture",
    imageSrc: "/images/img8.jpg",
    imageAlt:
      "Acupuncture session with multiple thin needles placed along the back.",
    youtubeId: null,
  },
  {
    id: 4,
    title: "Dry Needling",
    imageSrc: "/images/img4.jpg",
    imageAlt:
      "Closeup of dry needling, a single fine needle held by a gloved practitioner.",
    youtubeId: null,
  },
  {
    id: 5,
    title: "Massage Therapy",
    imageSrc: "/images/img7.jpg",
    imageAlt:
      "MDW massage therapist working on a client's shoulders during a relaxation massage.",
    youtubeId: null,
  },
  {
    id: 6,
    title: "Sports Rehabilitation",
    imageSrc: "/images/img2.jpg",
    imageAlt:
      "MDW therapist examining a footballer's knee on a sports field.",
    youtubeId: null,
  },
];
