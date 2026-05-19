import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";
import { ServicesReels } from "@/components/services-reels";
import { Testimonials } from "@/components/testimonials";
import { HealthTips } from "@/components/health-tips";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="flex-1 pt-16">
        <HeroCarousel />
        <ServicesReels />
        <Testimonials />
        <HealthTips />
      </main>
      <Footer />
    </>
  );
}
