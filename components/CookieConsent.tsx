"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const KEY = "skiip_cookie_consent";
type Choice = "loading" | "essential" | "analytics" | null;

export function CookieConsent() {
  const [choice, setChoice] = useState<Choice>("loading");
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(KEY) || document.cookie.match(/(?:^|; )skiip_cookie_consent=([^;]+)/)?.[1];
      setChoice(stored === "analytics" || stored === "essential" ? stored : null);
    } catch {
      setChoice(null);
    }
  }, []);

  function save(value: "essential" | "analytics") {
    try {
      window.localStorage.setItem(KEY, value);
      document.cookie = `${KEY}=${value}; Max-Age=15552000; Path=/; SameSite=Lax`;
    } catch {
      // Some local/privacy contexts block storage. The UI should still dismiss immediately.
    }
    setChoice(value);
  }

  const analyticsAllowed = choice === "analytics" && gaId;

  return (
    <>
      {analyticsAllowed ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}
      {choice === null ? (
        <div className="cookie" role="dialog" aria-label="Cookie preferences">
          <strong>Cookie preferences</strong>
          <p>We use essential storage for the site and optional analytics to understand what works.</p>
          <div className="button-row" style={{ marginTop: 0 }}>
            <button className="button primary" type="button" onClick={() => save("analytics")}>
              Accept analytics
            </button>
            <button className="button outline" type="button" onClick={() => save("essential")}>
              Essential only
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
