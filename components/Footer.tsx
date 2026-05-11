import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <Image src="/uploads/skiip-logo.png" width={38} height={38} alt="" />
              <span>SKIIP</span>
            </div>
            <p style={{ maxWidth: 300, lineHeight: 1.7 }}>
              Skip the queues. Order food and drinks instantly at events. No app download required.
            </p>
          </div>
          {SITE.footer.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>(c) 2026 SKIIP. All rights reserved.</span>
          <span>Built by <a href="https://dkdigitaldesigns.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline', color: 'inherit', textDecoration: 'underline' }}>DK DIGITAL</a> for live events.</span>
        </div>
      </div>
    </footer>
  );
}
