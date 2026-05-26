export interface Testimonial {
  id: number;
  name: string;
  condition: string;
  quote: string;
  rating: number;
  avatarSrc: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    condition: "Back Pain Recovery",
    quote:
      "After a few sessions, my mobility and comfort improved noticeably. The therapist was incredibly knowledgeable and caring.",
    rating: 5,
    avatarSrc: "/images/avatar-1.jpg",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    condition: "Sports Injury",
    quote:
      "Got back on the field feeling stronger thanks to the support. The home therapy sessions made it so convenient.",
    rating: 5,
    avatarSrc: "/images/avatar-2.jpg",
  },
  {
    id: 3,
    name: "Anita Desai",
    condition: "Post-Surgery Rehab",
    quote:
      "The online consultation was so helpful when I couldn't travel. Professional, punctual, and supportive sessions.",
    rating: 4,
    avatarSrc: "/images/avatar-3.jpg",
  },
  {
    id: 4,
    name: "Vikram Singh",
    condition: "Neck & Shoulder Pain",
    quote:
      "I was skeptical about online physio, but the support has been wonderful. Highly recommend MDW Wellness.",
    rating: 5,
    avatarSrc: "/images/avatar-4.jpg",
  },
  {
    id: 5,
    name: "Meera Patel",
    condition: "Posture Correction",
    quote:
      "The vitals check gave me a clear picture of my health. The follow-up therapy plan was exactly what I needed.",
    rating: 5,
    avatarSrc: "/images/avatar-5.jpg",
  },
];
