export const DOMAIN_EMAIL_ACCENT = "#F5C98A";
export const DOMAIN_EMAIL_SUCCESS = "#4ADE80";

export const domainEmailHero = {
  eyebrow: "Domain & E-Mail-Einrichtung",
  title: "Ihre professionelle Domain & E-Mail-Einrichtung.",
  desc: "Wir richten Ihre Domain und E-Mail-Infrastruktur ein — sicher, schnell und zuverlässig. Vom ersten Schritt bis zur fertigen Lösung mit Ihrem eigenen Namen.",
  highlights: ["Schnelle Einrichtung", "Professionell & sicher", "Laufender Support"],
  trustTools: ["IONOS", "Microsoft 365", "Outlook", "Wix Studio"],
} as const;

export const domainEmailFoundations = [
  {
    title: "Günstige Domain",
    desc: "Ihre Wunschdomain zum besten Preis — .de, .com, .at und viele mehr.",
    icon: "domain",
  },
  {
    title: "Professionelle E-Mails",
    desc: "E-Mail-Adressen mit Ihrem Domain-Namen für einen seriösen Auftritt.",
    icon: "mail",
  },
  {
    title: "Sicherheit & Zuverlässigkeit",
    desc: "SSL-Zertifikate, Spam-Schutz und 99,9 % Verfügbarkeit garantiert.",
    icon: "shield",
  },
  {
    title: "Technischer Support",
    desc: "Wir richten alles ein und stehen bei Fragen jederzeit zur Verfügung.",
    icon: "support",
  },
] as const;

export const DOMAIN_PROCESS_TEAL = "#00A38D";
export const DOMAIN_PROCESS_SLATE = "#64748b";

export const domainEmailProcessSteps = [
  {
    step: "01",
    phase: "Ziele",
    title: "Ziele definieren",
    desc: "Wunschdomain, Konten und Ziele klären — die Basis für Ihre Einrichtung.",
    accent: DOMAIN_PROCESS_SLATE,
    dotColor: "#cbd5e1",
  },
  {
    step: "02",
    phase: "Planung",
    title: "Planung & Struktur",
    desc: "Verfügbarkeit prüfen, Anbieter wählen und DNS-Struktur planen.",
    accent: DOMAIN_PROCESS_SLATE,
    dotColor: "#cbd5e1",
  },
  {
    step: "03",
    phase: "Umsetzung",
    title: "Umsetzung",
    desc: "Domain registrieren, DNS setzen und E-Mail-Konten einrichten.",
    accent: DOMAIN_PROCESS_TEAL,
    dotColor: DOMAIN_PROCESS_TEAL,
  },
  {
    step: "04",
    phase: "Qualität",
    title: "Test & Qualitätsprüfung",
    desc: "Versand, Empfang und Geräte prüfen — bevor alles live geht.",
    accent: DOMAIN_PROCESS_TEAL,
    dotColor: DOMAIN_PROCESS_TEAL,
  },
  {
    step: "05",
    phase: "Go-Live",
    title: "Go-live & Betreuung",
    desc: "Fertige Lösung übergeben — mit Zugängen und laufendem Support.",
    accent: DOMAIN_PROCESS_TEAL,
    dotColor: DOMAIN_PROCESS_TEAL,
  },
] as const;

export const domainEmailServices = [
  {
    title: "Domain Registrierung & Verwaltung",
    desc: "Wir helfen Ihnen, die passende Domain zu sichern und professionell einzurichten.",
    preview: "browser",
    items: [
      "Verfügbare Domains prüfen",
      "Domain registrieren",
      "DNS-Einstellungen konfigurieren",
      "Weiterleitungen einrichten",
      "Bestehende Domains verwalten",
      "Domain-Umzüge unterstützen",
    ],
  },
  {
    title: "E-Mail Lösungen & Migration",
    desc: "Wir richten Ihre E-Mail-Konten ein oder migrieren diese sicher zu neuen Systemen.",
    preview: "mail",
    items: [
      "E-Mail-Konten einrichten",
      "Verbindung mit Ihrer Domain",
      "Einrichtung auf allen Geräten",
      "Spam- und Virenschutz",
      "E-Mail Migration & Umzug",
      "Backup & Archivierung",
    ],
  },
] as const;

export const domainEmailPartners = [
  {
    name: "IONOS",
    subtitle: "Hosting & Domain-Anbieter",
    desc: "IONOS bietet zuverlässiges Hosting und günstige Domain-Registrierung mit Servern in Deutschland — ideal für DSGVO-konformes Hosting.",
    features: [
      "Ideal für kleine Unternehmen",
      "Einfache Einrichtung",
      "Professionelle E-Mail-Konten",
      "Sicher & zuverlässig",
    ],
    linkLabel: "Zu den IONOS Domain-Paketen",
    accent: "#F5C98A",
  },
  {
    name: "Microsoft 365",
    subtitle: "E-Mail & Office-Suite",
    desc: "Microsoft 365 liefert professionelle E-Mail-Postfächer inklusive Office-Anwendungen und Cloud-Speicher — ideal für Unternehmen, die mehr als nur E-Mail brauchen.",
    features: [
      "Professionelles Postfach",
      "Office-Apps inklusive",
      "1 TB Cloud-Speicher",
      "Erweiterter Spam-Schutz",
    ],
    linkLabel: "Zu den Microsoft 365 Paketen",
    accent: "#9DB8F5",
  },
] as const;

export const domainEmailWhyUs = {
  eyebrow: "Warum mit uns?",
  title: "Warum mit Aesken arbeiten?",
  desc: "Wir kümmern uns um die technische Einrichtung Ihrer Domain und E-Mail-Infrastruktur — transparent, zuverlässig und mit persönlichem Support.",
  reasons: [
    { key: "trust", label: "Transparente Kommunikation", angle: -145, color: "#F4A4B8" },
    { key: "care", label: "Persönliche Betreuung", angle: -35, color: "#F5C98A" },
    { key: "reliable", label: "Zuverlässige Umsetzung", angle: 90, color: "#A8E6CF" },
    { key: "fair", label: "Faire, klare Preise", angle: 200, color: "#9DB8F5" },
  ],
} as const;

export const domainEmailFaqs = [
  {
    q: "Wie lange dauert die Einrichtung meiner Domain?",
    a: "In der Regel ist Ihre Domain innerhalb von 24–48 Stunden registriert und einsatzbereit. Die vollständige E-Mail-Einrichtung dauert je nach Umfang wenige Tage.",
  },
  {
    q: "Kann ich meine bestehende Domain zu Ihnen umziehen?",
    a: "Ja. Wir übernehmen den kompletten Domain-Umzug inklusive DNS-Einstellungen, ohne dass Ihre Website oder E-Mails offline gehen.",
  },
  {
    q: "Welche E-Mail-Anbieter empfehlen Sie?",
    a: "Meist IONOS oder Microsoft 365 — je nach Bedarf und Budget. Wir beraten Sie gerne, welche Lösung zu Ihrem Unternehmen passt.",
  },
  {
    q: "Ist meine Domain bei Ihnen sicher?",
    a: "Ja. Wir richten SSL-Zertifikate, Spam-Schutz und regelmäßige Backups ein, damit Ihre Domain und E-Mails jederzeit geschützt sind.",
  },
  {
    q: "Bieten Sie laufenden Support nach der Einrichtung an?",
    a: "Ja. Bei Fragen zu Domain, E-Mail oder DNS-Einstellungen stehen wir Ihnen auch nach dem Go-Live zur Verfügung.",
  },
] as const;

export const domainEmailCta = {
  eyebrow: "Jetzt starten",
  title: "Bereit für Ihre professionelle Domain & E-Mail-Lösung?",
  desc: "Lassen Sie uns gemeinsam die richtige Lösung für Ihr Unternehmen finden — kostenlos und unverbindlich.",
  checklist: ["SSL-Zertifikat", "Spam-Schutz", "Backup aktiv"],
} as const;
