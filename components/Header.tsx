"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" href="/" onClick={close} aria-label="SKIIP home">
          <Image src="/uploads/skiip-logo.png" width={146} height={42} alt="SKIIP" priority />
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {SITE.nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link className="button primary" href="/get-started">
            Get Started
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            Menu
          </button>
        </div>
      </div>
      {open ? (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {SITE.nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={close}>
              {item.label}
            </Link>
          ))}
          <Link href="/get-started" onClick={close}>
            Get Started
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
