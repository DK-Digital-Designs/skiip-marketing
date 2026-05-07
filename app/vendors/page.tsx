import Link from "next/link";
import { CTA, PageHero } from "@/components/PageParts";

const benefits = [
  ["Increase Revenue", "Pre-orders help more customers complete purchases instead of giving up in a queue."],
  ["Faster Service", "Your team can focus on fulfilment rather than constant front-of-queue ordering."],
  ["Handle Peak Demand", "Digital ordering helps smooth the rush around breaks and headline moments."],
  ["No Heavy Hardware", "SKIIP is designed around devices vendors can already use."]
];

export const metadata = {
  title: "Vendors",
  description: "Serve more customers with less queue pressure using SKIIP."
};

export default function VendorsPage() {
  return (
    <>
      <PageHero
        eyebrow="For Vendors"
        title={
          <>
            Serve more customers.
            <br />
            <span className="green">Without the chaos.</span>
          </>
        }
        lead="SKIIP gives your stall a digital ordering lane so customers order ahead, you fulfil on time, and everyone moves faster."
      />
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center" }}>
            <div>
              <span className="eyebrow">Benefits</span>
              <h2 className="title-lg">Why vendors choose SKIIP</h2>
              <p className="lead">Food runs should not feel like side quests for your customers or your team.</p>
              <div className="button-row">
                <Link className="button primary" href="/vendor-apply">
                  Become a Vendor Partner
                </Link>
              </div>
            </div>
            <div className="grid-2">
              {benefits.map(([title, body]) => (
                <article className="card" key={title}>
                  <h3 className="title-md">{title}</h3>
                  <p className="muted">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow">Onboarding</span>
          <h2 className="title-lg">Up and running quickly</h2>
          <div className="grid-4">
            {["Apply online", "Share your menu", "Attend a short briefing", "Go live at your event"].map((step, index) => (
              <div className="step" key={step}>
                <div className="step-icon">0{index + 1}</div>
                <h3 className="title-md">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA title="Ready to serve smarter?" primaryHref="/vendor-apply" primaryLabel="Apply Now" />
    </>
  );
}
