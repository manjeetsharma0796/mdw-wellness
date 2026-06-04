import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";
import { OnlineConsultation } from "@/components/online-consultation";
import { ServicesCarousel } from "@/components/services-carousel";
import { WhyChooseUs } from "@/components/why-choose-us";
// Re-enable when real client videos are uploaded.
// import { VideoTestimonials } from "@/components/video-testimonials";
import { Testimonials } from "@/components/testimonials";
import { HealthTips } from "@/components/health-tips";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <HeroCarousel />
        <OnlineConsultation />
        <ServicesCarousel />
        <WhyChooseUs />
        {/* Re-enable when real client videos are uploaded. */}
        {/* <VideoTestimonials /> */}
        <Testimonials />
        <HealthTips />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
