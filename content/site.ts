export const SITE = {
  name: "SKIIP",
  description:
    "Order food and drinks from your spot at events, pay securely, and collect when ready. No app download required.",
  nav: [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/experience", label: "Experience" },
    { href: "/vendors", label: "Vendors" },
    { href: "/organisers", label: "Organisers" },
    { href: "/help", label: "Help" }
  ],
  footer: [
    {
      title: "Product",
      links: [
        { href: "/", label: "Home" },
        { href: "/how-it-works", label: "How It Works" },
        { href: "/experience", label: "Experience" }
      ]
    },
    {
      title: "Partners",
      links: [
        { href: "/vendors", label: "Vendors" },
        { href: "/organisers", label: "Organisers" },
        { href: "/get-started", label: "Get Started" }
      ]
    },
    {
      title: "Support",
      links: [
        { href: "/help", label: "Help & FAQ" },
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
        { href: "/cookies", label: "Cookies" }
      ]
    }
  ],
  faqs: [
    {
      q: "Do I need to download an app?",
      a: "No. SKIIP runs entirely in your mobile browser. Open the event link and start ordering."
    },
    {
      q: "How do I collect my order?",
      a: "When your order is ready, head to the vendor collection point and show your order code."
    },
    {
      q: "What payment methods are accepted?",
      a: "SKIIP is designed for secure card, Apple Pay, and Google Pay checkout when live ordering is enabled."
    },
    {
      q: "How do I become a vendor on SKIIP?",
      a: "Use the vendor application form. The team will review your details and follow up."
    }
  ]
};

export const routes = [
  "/",
  "/how-it-works",
  "/experience",
  "/vendors",
  "/organisers",
  "/help",
  "/get-started",
  "/vendor-apply",
  "/privacy",
  "/terms",
  "/cookies"
];
