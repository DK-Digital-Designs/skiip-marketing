import { CTA, PageHero } from "@/components/PageParts";

export const metadata = {
  title: "Experience",
  description: "The SKIIP story: giving people back the moments they paid for."
};

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={
          <>
            You were there.
            <br />
            <span className="accent">But you missed it.</span>
          </>
        }
        lead="SKIIP was built after too many events spent standing in queues instead of being part of the moment."
      />
      <section className="section">
        <div className="container story-panel">
          <h2 className="title-lg">So did we.</h2>
          <p>
            SKIIP started after spending 40+ minutes staring at the back of someone’s head for a meat platter at an
            event.
          </p>
          <p>The worst part?</p>
          <p>By the time we got to the front, it was sold out.</p>
          <p>That experience sparked a simple question:</p>
          <h2 className="title-md">Why is ordering food at live events still this painful?</h2>
          <p>
            People should be enjoying the event – not trapped in queues wondering what’s left on the menu.
          </p>
          <p>
            So we built SKIIP: a faster, frictionless way to order, track, and collect without missing the moments that
            matter.
          </p>
        </div>
      </section>
      <CTA primaryLabel="Join SKIIP" secondaryHref="/how-it-works" secondaryLabel="See How It Works" />
    </>
  );
}
