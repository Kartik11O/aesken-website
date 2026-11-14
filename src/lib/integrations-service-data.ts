export const INTEGRATIONS_ACCENT = "#9DB8F5";
export const INTEGRATIONS_TEAL = "#00A38D";

export const integrationsHero = {
  eyebrow: "Technische Integrationen",
  title: "Alle Ihre Tools, nahtlos verbunden mit Ihrer Website.",
  desc: "Wir verbinden Ihre Wix-Website mit Buchungssystemen, CRM-Tools und Zahlungsanbietern – automatisiert, zuverlässig und ohne manuelle Doppelarbeit.",
  highlights: ["Buchung & Zahlung", "CRM-Anbindung", "Automatisierte Workflows"],
} as const;

export const integrationsCategories = [
  {
    title: "Buchungssysteme",
    desc: "Terminbuchungen, Kalender und Verfügbarkeiten direkt auf Ihrer Website – synchron mit Ihrem Tool.",
    accent: "#F4A4B8",
    icon: "calendar",
  },
  {
    title: "CRM & Kundenverwaltung",
    desc: "Neue Kontakte und Anfragen landen automatisch in Ihrem CRM – ohne manuelles Übertragen.",
    accent: "#A8E6CF",
    icon: "users",
  },
  {
    title: "Zahlungsanbieter",
    desc: "Stripe, PayPal & Co. sicher eingebunden, damit Kunden direkt online bezahlen können.",
    accent: "#9DB8F5",
    icon: "payment",
  },
  {
    title: "E-Mail & Automatisierung",
    desc: "Formulare, Newsletter und Follow-ups laufen automatisch über Ihre Marketing-Tools.",
    accent: "#F5C98A",
    icon: "mail",
  },
] as const;

export const integrationsShowcase = {
  eyebrow: "Alles verbunden",
  title: "Ihre Systeme sprechen endlich miteinander.",
  desc: "Statt Daten händisch zwischen Tools zu kopieren, laufen Buchungen, Zahlungen und Kontakte automatisch dort an, wo Sie sie brauchen.",
  points: [
    "Echtzeit-Synchronisierung zwischen allen Tools",
    "Keine doppelte Dateneingabe mehr",
    "Fehler durch manuelle Übertragung entfallen",
    "Funktioniert zuverlässig im Hintergrund",
  ],
  panelLabel: "Sync-Status",
  panelHighlight: "Live",
  nodes: ["Buchung", "Zahlung", "CRM"],
} as const;

export const integrationsProcess = [
  {
    step: "01",
    title: "Analyse & Anforderungen",
    desc: "Wir prüfen Ihre bestehenden Tools und definieren, was verbunden werden soll.",
  },
  {
    step: "02",
    title: "Auswahl & Konzept",
    desc: "Die passenden Schnittstellen und Automatisierungen werden festgelegt.",
  },
  {
    step: "03",
    title: "Anbindung & Konfiguration",
    desc: "Buchung, Zahlung und CRM werden sicher mit Ihrer Website verbunden.",
  },
  {
    step: "04",
    title: "Test & Synchronisation",
    desc: "Alle Datenflüsse werden geprüft, bevor etwas live geht.",
  },
  {
    step: "05",
    title: "Go-Live & Monitoring",
    desc: "Ihre Integrationen laufen live – wir behalten sie im Blick.",
  },
] as const;

export const integrationsWhyUs = [
  {
    title: "Zeitersparnis durch Automatisierung",
    desc: "Wiederkehrende Aufgaben laufen automatisch ab, statt Zeit im Alltag zu kosten.",
    accent: "#9DB8F5",
  },
  {
    title: "Fehlerfreie Datenübertragung",
    desc: "Keine doppelte Eingabe, keine Übertragungsfehler zwischen Ihren Tools.",
    accent: "#F4A4B8",
  },
  {
    title: "Skalierbar mit Ihrem Wachstum",
    desc: "Neue Tools und Prozesse lassen sich jederzeit nahtlos ergänzen.",
    accent: "#A8E6CF",
  },
  {
    title: "Laufender Support",
    desc: "Bei Updates oder Änderungen an Ihren Tools sind wir für Sie da.",
    accent: "#F5C98A",
  },
] as const;

export const integrationsResults = {
  eyebrow: "Ergebnisse",
  title: "Weniger manuelle Arbeit, mehr verlässliche Prozesse.",
  stats: [
    { value: "-70%", label: "Manuelle Arbeit" },
    { value: "100%", label: "Datenabgleich in Echtzeit" },
    { value: "+15", label: "Unterstützte Tools" },
  ],
  tools: ["Wix Bookings", "Stripe", "PayPal", "Calendly", "Mailchimp", "HubSpot"],
} as const;

export const integrationsFaqs = [
  {
    q: "Welche Tools können Sie integrieren?",
    a: "Wir binden gängige Buchungssysteme, Zahlungsanbieter (z. B. Stripe, PayPal), CRM-Tools und E-Mail-Marketing-Plattformen an. Fragen Sie gerne nach Ihrem konkreten Tool.",
  },
  {
    q: "Wie lange dauert eine Integration?",
    a: "Je nach Umfang und Anzahl der Tools dauert eine typische Integration 1–3 Wochen, inklusive Test und Feinschliff.",
  },
  {
    q: "Wird meine Website dadurch langsamer?",
    a: "Nein. Wir achten darauf, dass alle Integrationen performant eingebunden werden, damit Ladezeit und Nutzererlebnis nicht leiden.",
  },
  {
    q: "Kann ich mehrere Systeme gleichzeitig verbinden?",
    a: "Ja. Buchung, Zahlung und CRM lassen sich parallel anbinden und miteinander synchronisieren.",
  },
  {
    q: "Was passiert, wenn sich eines meiner Tools ändert?",
    a: "Wir passen die Integration an, falls sich Schnittstellen oder Anbieter ändern – im Rahmen unseres laufenden Supports.",
  },
] as const;
