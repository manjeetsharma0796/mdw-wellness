export interface HealthTip {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  therapistName: string;
  publishedDate: string;
  thumbnailSrc: string;
}

export const healthTips: HealthTip[] = [
  {
    id: 1,
    title: "5 Stretches to Relieve Lower Back Pain",
    excerpt:
      "Simple daily stretches that can significantly reduce lower back discomfort and improve flexibility.",
    category: "Back Care",
    therapistName: "Dr. Anil Mehta",
    publishedDate: "2026-05-15",
    thumbnailSrc: "/images/tip-back.jpg",
  },
  {
    id: 2,
    title: "Desk Posture: Are You Sitting Right?",
    excerpt:
      "Hours at a desk can wreck your posture. Here's how to set up your workspace for spinal health.",
    category: "Posture",
    therapistName: "Dr. Sneha Rao",
    publishedDate: "2026-05-08",
    thumbnailSrc: "/images/tip-posture.jpg",
  },
  {
    id: 3,
    title: "Recovery After Knee Surgery: Week by Week",
    excerpt:
      "A practical guide to what you should expect and do in the first 8 weeks after knee surgery.",
    category: "Recovery",
    therapistName: "Dr. Anil Mehta",
    publishedDate: "2026-05-01",
    thumbnailSrc: "/images/tip-knee.jpg",
  },
];
