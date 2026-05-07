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
        lead="SKIIP was built after standing in too many queues, missing too many moments, and asking why this still happens."
      />
      <section className="section">
        <div className="container story-panel">
          <span className="eyebrow">Where it started</span>
          <h2 className="title-lg">So did we.</h2>
          <p>
            We have been to hundreds of events. We spent too many of them in queues, hearing the thing we paid for from
            somewhere we did not want to be.
          </p>
          <p>
            SKIIP was built by event-goers, not from a report, but from experience. Long waits, missed songs, missed
            goals, and moments you do not get back.
          </p>
          <p>
            The queue exists because there was no better alternative. Smartphones, digital payments, and real-time
            updates already existed. What was missing was a thin, frictionless layer built for real event conditions.
          </p>
        </div>
      </section>
      <section className="section dark">
        <div className="container grid-2">
          <div className="card" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
            <span className="eyebrow">Our mission</span>
            <h2 className="title-md" style={{ color: "white" }}>
              Give people back the moments they paid for.
            </h2>
            <p style={{ color: "#8ba3c7", lineHeight: 1.7 }}>
              Every missed goal, song, and shared moment is a failure the event industry has accepted for too long.
            </p>
          </div>
          <div className="card" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
            <span className="eyebrow">Our vision</span>
            <h2 className="title-md" style={{ color: "white" }}>
              A world where no one misses the moment.
            </h2>
            <p style={{ color: "#8ba3c7", lineHeight: 1.7 }}>
              No more 45-minute queues. No more choosing between food, drink, and the reason you came.
            </p>
          </div>
        </div>
      </section>
      <CTA primaryLabel="Join SKIIP" secondaryHref="/how-it-works" secondaryLabel="See How It Works" />
    </>
  );
}
