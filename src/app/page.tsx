import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="flex-1 pt-16">
        <HeroCarousel />
      </main>
    </>
  );
}
