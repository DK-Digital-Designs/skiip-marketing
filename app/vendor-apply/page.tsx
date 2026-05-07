import Link from "next/link";
import { VendorForm } from "@/components/LeadForms";
import { PageHero } from "@/components/PageParts";

export const metadata = {
  title: "Vendor Application",
  description: "Apply to become a SKIIP vendor partner."
};

export default function VendorApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Vendor Application"
        title="Let us get you on the bill."
        lead="A short application for event vendors who want a faster way to serve customers."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <Link href="/get-started" className="button outline">
            Back to Get Started
          </Link>
          <div className="card" style={{ marginTop: 18 }}>
            <VendorForm />
          </div>
        </div>
      </section>
    </>
  );
}
