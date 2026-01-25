import { CtaSection, Hero } from "@/widgets/home";

export default function page() {
  return (
    <>
      <div className="mt-10">
        <Hero />

        <div className="mt-10">
          <CtaSection />
        </div>
      </div>
    </>
  );
}
