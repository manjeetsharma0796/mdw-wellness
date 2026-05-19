import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="flex-1 pt-16">
        <p className="p-8 text-center text-muted-foreground">
          MDW Wellness — sections coming soon
        </p>
      </main>
    </>
  );
}
