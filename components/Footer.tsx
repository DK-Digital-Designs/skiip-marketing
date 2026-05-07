import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Image src="/uploads/skiip-logo.png" width={132} height={38} alt="SKIIP" />
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
          <span>Built for live events.</span>
        </div>
      </div>
    </footer>
  );
}
