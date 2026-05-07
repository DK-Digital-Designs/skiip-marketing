import { OrganiserForm } from "@/components/LeadForms";
import { PageHero } from "@/components/PageParts";

const benefits = [
  ["Improve Crowd Flow", "Spread ordering across the event timeline instead of concentrating it at breaks."],
  ["Enhance Attendee Experience", "Help guests spend more time in the moment and less time queueing."],
  ["Reduce Congestion", "Dedicated collection points separate browsing, payment, and pickup."],
  ["Access Event Insights", "Use demand data to understand peak windows and vendor performance."]
];

export const metadata = {
  title: "Organisers",
  description: "Improve event flow and attendee experience with SKIIP."
};

export default function OrganisersPage() {
  return (
    <>
      <PageHero
        eyebrow="For Organisers"
        title={
          <>
            Better events start with
            <br />
            <span className="cyan">better flow.</span>
          </>
        }
        lead="SKIIP gives events a modern ordering layer that keeps crowds moving, keeps attendees happy, and helps vendors operate with more confidence."
      />
      <section className="section">
        <div className="container grid-2">
          {benefits.map(([title, body]) => (
            <article className="card" key={title}>
              <h2 className="title-md">{title}</h2>
              <p className="muted">{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section alt">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Partner with us</span>
            <h2 className="title-lg">Let us talk about your next event.</h2>
            <p className="lead">Tell us what you are planning and the SKIIP team will follow up.</p>
          </div>
          <div className="card">
            <OrganiserForm />
          </div>
        </div>
      </section>
    </>
  );
}
