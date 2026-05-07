import Link from "next/link";
import { PageHero } from "@/components/PageParts";

const roles = [
  {
    label: "Attendee",
    title: "Order at your next event",
    body: "No account needed. Open SKIIP at your event, browse vendors, and order.",
    href: "/help",
    cta: "Find Events"
  },
  {
    label: "Vendor",
    title: "Become a vendor partner",
    body: "Sell more and serve faster. Apply in a few minutes and we will follow up.",
    href: "/vendor-apply",
    cta: "Apply Now"
  },
  {
    label: "Organiser",
    title: "Add SKIIP to your event",
    body: "Improve flow, support vendors, and give attendees more time in the moment.",
    href: "/organisers",
    cta: "Talk to Us"
  }
];

export const metadata = {
  title: "Get Started",
  description: "Choose how you want to use SKIIP."
};

export default function GetStartedPage() {
  return (
    <>
      <PageHero eyebrow="Get Started" title="Pick your lane." lead="Choose your role and we will show you what comes next." />
      <section className="section">
        <div className="container grid-3">
          {roles.map((role) => (
            <article className="card" key={role.label}>
              <span className="chip">{role.label}</span>
              <h2 className="title-md" style={{ marginTop: 14 }}>
                {role.title}
              </h2>
              <p className="muted">{role.body}</p>
              <div className="button-row">
                <Link className="button primary" href={role.href}>
                  {role.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
