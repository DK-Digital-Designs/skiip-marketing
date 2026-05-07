import { ContactForm } from "@/components/LeadForms";
import { PageHero } from "@/components/PageParts";
import { SITE } from "@/content/site";

export const metadata = {
  title: "Help",
  description: "Get help with SKIIP or contact the team."
};

export default function HelpPage() {
  return (
    <>
      <PageHero
        eyebrow="Help & Support"
        title="How can we help?"
        lead="Fill in the form below or browse the FAQ. We aim to respond quickly during event days."
      />
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="card">
            <h2 className="title-md">Send us a message</h2>
            <ContactForm />
          </div>
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="title-lg">Frequently asked questions</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {SITE.faqs.map((faq) => (
                <details className="card" key={faq.q}>
                  <summary style={{ cursor: "pointer", fontWeight: 900 }}>{faq.q}</summary>
                  <p className="muted" style={{ lineHeight: 1.7 }}>
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
