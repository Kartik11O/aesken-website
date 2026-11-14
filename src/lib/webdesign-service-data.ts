export const WEBDESIGN_ACCENT = "#F4A4B8";

export const webdesignHero = {
  eyebrow: "WIX Webdesign & UI/UX",
  title: "Websites in Wix Studio, die zu Ihrer Marke passen und Kunden anziehen.",
  desc: "Von der ersten Idee bis zum Launch entwickeln wir benutzerfreundliche Wix-Websites mit klarem UI, durchdachter UX und einem Design, das Vertrauen schafft und Anfragen generiert.",
  highlights: ["Wix Studio Expertise", "Individuelles UI/UX", "Mobile-first Design"],
} as const;

export const PROCESS_TEAL = "#00A38D";
export const PROCESS_SLATE = "#64748b";

export const webdesignProcessSteps = [
  {
    step: "01",
    phase: "Strategie",
    title: "Analyse & Strategie",
    desc: "Zielgruppe, Wettbewerb und Ziele analysieren — daraus leiten wir eine klare Website-Strategie ab.",
    accent: PROCESS_SLATE,
    dotColor: "#cbd5e1",
  },
  {
    step: "02",
    phase: "Struktur",
    title: "UX Struktur & Wireframes",
    desc: "Informationsarchitektur und Nutzerführung visuell strukturieren, bevor das Design startet.",
    accent: PROCESS_SLATE,
    dotColor: "#cbd5e1",
  },
  {
    step: "03",
    phase: "Design",
    title: "UI Design",
    desc: "Visuelles System, Typografie und Farben — ein Interface, das Ihre Marke authentisch trägt.",
    accent: PROCESS_TEAL,
    dotColor: PROCESS_TEAL,
  },
  {
    step: "04",
    phase: "Entwicklung",
    title: "Wix Studio Entwicklung",
    desc: "Pixelgenaue Umsetzung in Wix Studio mit Animationen, CMS und Performance-Optimierung.",
    accent: PROCESS_TEAL,
    dotColor: PROCESS_TEAL,
  },
  {
    step: "05",
    phase: "Launch",
    title: "Launch & Optimierung",
    desc: "Go-live, Cross-Device-Tests und Feinschliff für Conversion, Speed und SEO.",
    accent: PROCESS_TEAL,
    dotColor: PROCESS_TEAL,
  },
] as const;

export const webdesignIncludes = [
  {
    title: "UX Research & Struktur",
    desc: "Research, Wireframes, Nutzerführung, Content-Struktur und SEO-Grundlagen – alles aus einer Hand.",
    accent: "#F4A4B8",
    icon: "research",
  },
  {
    title: "UI Design",
    desc: "Design Systeme, Responsive Layouts, Micro-Interactions, Animationen und barrierefreie Interfaces.",
    accent: "#F5C98A",
    icon: "design",
  },
  {
    title: "Web Entwicklung",
    desc: "Umsetzung in Wix Studio, CMS-Aufbau, Animationen und Performance-Optimierung bis zum Launch.",
    accent: "#A8E6CF",
    icon: "dev",
  },
  {
    title: "Support & Betreuung",
    desc: "Wartung, Optimierungen, Anpassungen und langfristige Betreuung nach dem Go-live.",
    accent: "#9DB8F5",
    icon: "support",
  },
] as const;

export const webdesignResults = {
  eyebrow: "Projektbeispiel",
  title: "Von Konzept zu einer Website, die Ergebnisse liefert.",
  stats: [
    { value: "+72%", label: "Mehr Anfragen" },
    { value: "-40%", label: "Schnellere Ladezeit" },
    { value: "+65%", label: "Mehr Interaktionen" },
  ],
  features: [
    "Individuelles Design",
    "Responsive Umsetzung",
    "UX optimierte Struktur",
    "Einfache CMS Pflege",
  ],
} as const;

export const webdesignWixBenefits = [
  {
    title: "Designfreiheit ohne Code",
    desc: "Wix Studio bietet professionelle Layout-Kontrolle – ideal für individuelle Markenauftritte.",
  },
  {
    title: "Einfache Pflege",
    desc: "Sie können Texte, Bilder und Inhalte selbst aktualisieren – ohne technisches Vorwissen.",
  },
  {
    title: "Schneller Launch",
    desc: "Strukturierte Entwicklung in Wix Studio verkürzt Time-to-Market deutlich.",
  },
  {
    title: "Skalierbar & erweiterbar",
    desc: "Buchungen, Formulare, SEO und Integrationen lassen sich nahtlos ergänzen.",
  },
] as const;

export const webdesignTransformation = {
  eyebrow: "Vorher · Nachher",
  title: "So verändert ein Redesign Ihre Website-Performance.",
  desc: "Der direkte Vergleich zeigt, was ein durchdachtes Redesign bewirkt – von einer veralteten Website zu einem klaren, conversion-starken Auftritt.",
  before: {
    label: "Alte Website",
    tag: "Veraltet",
    caption: "Unklare Struktur, kein sichtbarer Call-to-Action",
    metrics: [
      { value: "2.4s", label: "Ladezeit", tone: "warn" as const, icon: "clock" as const },
      { value: "1.2%", label: "Conversion", tone: "warn" as const, icon: "target" as const },
      { value: "34%", label: "Absprungrate", tone: "warn" as const, icon: "trend" as const },
    ],
  },
  after: {
    label: "Mit Aesken",
    tag: "Optimiert",
    caption: "Klare Struktur mit deutlichem Call-to-Action",
    highlight: "+285%",
    highlightLabel: "Mehr Anfragen",
    metrics: [
      { value: "0.8s", label: "Ladezeit", tone: "good" as const, icon: "clock" as const },
      { value: "4.7%", label: "Conversion", tone: "good" as const, icon: "target" as const },
      { value: "12%", label: "Absprungrate", tone: "good" as const, icon: "trend" as const },
    ],
  },
  comparison: [
    { label: "Call-to-Action", before: "Nicht sichtbar", after: "Klar & auffällig" },
    { label: "Seitenstruktur", before: "Überladen & unübersichtlich", after: "Übersichtlich & fokussiert" },
    { label: "Ladezeit", before: "2.4 Sekunden", after: "0.8 Sekunden" },
    { label: "Mobile Ansicht", before: "Nicht optimiert", after: "Vollständig responsive" },
  ],
} as const;

export const webdesignFaqs = [
  {
    q: "Warum Wix Studio statt einer klassischen Agentur-Website?",
    a: "Wix Studio verbindet Designfreiheit mit einfacher Pflege. Sie erhalten eine professionelle Website, die Sie später selbst anpassen können – ohne laufende Entwicklerkosten für kleine Änderungen.",
  },
  {
    q: "Was ist der Unterschied zwischen UI und UX?",
    a: "UX (User Experience) beschreibt, wie Nutzer Ihre Website erleben – Struktur, Abläufe und Klarheit. UI (User Interface) ist das visuelle Design: Farben, Typografie, Abstände und Interaktionen.",
  },
  {
    q: "Wie lange dauert ein Wix Webdesign-Projekt?",
    a: "Je nach Umfang dauert ein typisches Projekt 3–6 Wochen. Nach dem Kick-off erhalten Sie einen Zeitplan mit klaren Meilensteinen.",
  },
  {
    q: "Kann ich Inhalte später selbst bearbeiten?",
    a: "Ja. Wir richten Ihre Website so ein, dass Sie Texte, Bilder und Seiteninhalte eigenständig pflegen können – inklusive kurzer Einführung.",
  },
  {
    q: "Ist das Design wirklich individuell?",
    a: "Absolut. Wir arbeiten nicht mit generischen Templates – jedes Design wird auf Ihre Marke, Zielgruppe und Ziele zugeschnitten.",
  },
] as const;
