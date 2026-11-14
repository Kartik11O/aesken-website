export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Aesken OS", href: "#aesken-os" },
  { label: "Webdienste", href: "/service#projekte" },
  { label: "News", href: "#news" },
] as const;

export const capabilities = [
  {
    num: "01",
    title: "Markenbildung",
    desc: "Identitätssysteme und redaktionelle Ausrichtung.",
    href: "#contact",
  },
  {
    num: "02",
    title: "Visuelles Design",
    desc: "Typografische und grafische Systeme.",
    href: "#contact",
  },
  {
    num: "03",
    title: "Webentwicklung",
    desc: "Moderne Frameworks und modulare Builds.",
    href: "/service#projekte",
  },
  {
    num: "04",
    title: "E-Commerce",
    desc: "Shop-Systeme und Zahlungsinfrastruktur.",
    href: "/service#projekte",
  },
  {
    num: "05",
    title: "Organisches SEO",
    desc: "Inhalte, Semantik und Autorität.",
    href: "/service#projekte",
  },
  {
    num: "06",
    title: "Lokales SEO",
    desc: "Karten, Unternehmensprofile und Nähe.",
    href: "/service#projekte",
  },
  {
    num: "07",
    title: "Buchung & Betrieb",
    desc: "Terminplanung, Automatisierung und CRM.",
    href: "/service#projekte",
  },
  {
    num: "08",
    title: "Hosting",
    desc: "Leistungsfähige, überwachte Infrastruktur.",
    href: "/service#projekte",
  },
  {
    num: "09",
    title: "Integrationen",
    desc: "API-Schichten und verbundene Systeme.",
    href: "/service#projekte",
  },
] as const;

export const stats = [
  { value: "04", label: "Verbundene Abteilungen" },
  { value: "20+", label: "Ökosystem-Aufbauten" },
  { value: "8", label: "Bediente Branchen" },
  { value: "2019", label: "Gegründet" },
] as const;

export const divisions = [
  {
    phase: "01 · Identität",
    title: "Aesken Design",
    desc: "Markenidentität, Art Direction und redaktionelle Designsysteme mit der Präzision einer Luxuspublikation.",
    glow: "#e8d9c2",
  },
  {
    phase: "02 · Sichtbarkeit",
    title: "Aesken SEO",
    desc: "Organisches, lokales und leistungsorientiertes SEO, entwickelt, um die Sichtbarkeit im Laufe der Zeit zu steigern.",
    glow: "#7fb3d9",
  },
  {
    phase: "03 · Betrieb",
    title: "Aesken Booking",
    desc: "Terminplanung, Zahlungen und Kundenverwaltung in einer mühelosen Oberfläche vereint.",
    glow: "#c4d8c2",
  },
  {
    phase: "04 · Infrastruktur",
    title: "Aesken Webdienste",
    desc: "Modulare Webarchitekturen, Handel, Integrationen und Hosting-Infrastruktur.",
    glow: "#d6cfc1",
    href: "/service#projekte",
  },
] as const;

export const osFeatures = [
  {
    title: "Zentrale Koordination",
    desc: "Ein Ansprechpartner für alle wichtigen digitalen Bereiche – weniger Abstimmung, mehr Fortschritt.",
    icon: "spark",
  },
  {
    title: "Klarer Ablauf",
    desc: "Strukturierte Prozesse, damit Projekte schneller umgesetzt und einfacher verwaltet werden können.",
    icon: "flow",
  },
  {
    title: "Digitale Sichtbarkeit",
    desc: "Von SEO bis Inhalt – wir helfen dabei, online besser gefunden zu werden.",
    icon: "gauge",
  },
  {
    title: "Flexible Zusammenarbeit",
    desc: "Unsere Leistungen lassen sich je nach Bedarf kombinieren – ohne komplizierte Systeme.",
    icon: "layers",
  },
  {
    title: "Design mit Strategie",
    desc: "Websites und digitale Lösungen, die nicht nur gut aussehen, sondern Ergebnisse unterstützen.",
    icon: "leaf",
  },
  {
    title: "Kontinuierliche Betreuung",
    desc: "Nach dem Launch begleiten wir Optimierung, Anpassungen und Weiterentwicklung.",
    icon: "shield",
  },
] as const;

export const footerColumns = [
  {
    title: "Ecosystem",
    links: ["Overview", "Capabilities", "Aesken OS", "Studio & News"],
  },
  {
    title: "Divisions",
    links: ["Aesken Design", "Aesken SEO", "Aesken Booking", "Aesken Webservices"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    title: "Connect",
    links: ["Instagram", "LinkedIn", "Behance", "Are.na"],
  },
] as const;
