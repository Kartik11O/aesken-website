export const serviceNavLinks = [
  { label: "Projekte", href: "#projekte" },
  { label: "Über", href: "#about" },
  { label: "Leistung", href: "#services" },
] as const;

export const heroBadges = [
  {
    icon: "search",
    text: "Wir ranken Ihre Seite höher bei Google",
    position: "right-[2%] xl:right-[6%] top-[18%]",
    depth: 1.35,
    rotate: 2.5,
  },
  {
    icon: "growth",
    text: "Erfahrung im Wachstum von Unternehmen durch Websites",
    position: "left-[2%] xl:left-[8%] top-[46%]",
    depth: 0.95,
    rotate: -3.5,
  },
] as const;

export const heroGridBlocks = [
  { col: "right-[12%]", row: "top-[8%]", size: 72, depth: 0.5, delay: 0 },
  { col: "left-[18%]", row: "top-[14%]", size: 64, depth: 0.35, delay: 0.08 },
  { col: "right-[22%]", row: "bottom-[18%]", size: 56, depth: 0.45, delay: 0.12 },
  { col: "left-[28%]", row: "bottom-[22%]", size: 48, depth: 0.3, delay: 0.16 },
] as const;

export const partnerLogos = [
  "KANA",
  "EK Studio",
  "Gründer",
  "Element",
  "Nova",
  "Querformat",
  "Catering",
  "Partner",
] as const;

export const solutionCards = [
  {
    title: "Websites, die Ihnen Kunden bringen",
    desc: "Ihre Website ist nicht nur ansprechend, sondern hilft Ihnen auch, mehr Anrufe, Anfragen und Verkäufe zu erhalten.",
    mockup: "form",
  },
  {
    title: "Websites, die für ein hohes Google-Ranking optimiert sind",
    desc: "Ihre Website ist mit den besten SEO-Praktiken ausgestattet, um in den Google-Suchergebnissen höher zu erscheinen.",
    mockup: "seo",
  },
  {
    title: "Einfach für Sie, Inhalte zu aktualisieren",
    desc: "Interagieren Sie mit Ihrer Website und nehmen Sie Änderungen selbst vor – keine technischen Kenntnisse erforderlich.",
    mockup: "cms",
  },
] as const;

export const serviceOfferings = [
  {
    title: "WIX Webdesign & UI/UX",
    desc: "Wir erstellen schöne, benutzerfreundliche Websites in Wix Studio, die zu Ihrer Marke passen und Kunden anziehen.",
    accent: "#F4A4B8",
    icon: "browser",
    href: "/service/wix-webdesign",
  },
  {
    title: "Technische Integrationen",
    desc: "Wir verbinden Ihre Website mit Buchungssystemen, CRM-Tools und Zahlungsanbietern – alles nahtlos integriert.",
    accent: "#9DB8F5",
    icon: "integration",
    href: "/service/technische-integrationen",
  },
  {
    title: "Rechtliche Einrichtung & Datenschutz",
    desc: "Wir sorgen für rechtliche Sicherheit, Datenschutz und Cookie-Banner, damit Ihre Seite konform bleibt.",
    accent: "#C7B9FF",
    icon: "legal",
  },
  {
    title: "Domain & E-Mail-Einrichtung",
    desc: "Wir helfen Ihnen, Ihre Domain zu sichern, Geschäftsemails einzurichten und alles reibungslos zu konfigurieren.",
    accent: "#F5C98A",
    icon: "domain",
    href: "/service/domain-email",
  },
  {
    title: "SEO & Online-Sichtbarkeit",
    desc: "Wir sorgen dafür, dass Ihre Seite von Anfang an suchmaschinenfreundlich ist, damit Kunden Sie finden.",
    accent: "#A8E6CF",
    icon: "seo",
  },
  {
    title: "Fortlaufender Support",
    desc: "Von Updates bis zur Fehlerbehebung bieten wir persönlichen, direkten Support, auch nachdem Ihre Seite live ist.",
    accent: "#FFD4A8",
    icon: "support",
  },
] as const;

export const testimonials = [
  {
    quote:
      "„Handshake hat die Barrieren, die uns mit neuen Talenten im ganzen Land verbinden, völlig abgebaut und die Kommunikation so viel einfacher gemacht.“",
    name: "Craig",
    role: "Gründer & Geschäftsführer",
  },
  {
    quote:
      "„Aesken hat unsere Website in Rekordzeit live gebracht – professionell, durchdacht und genau auf unsere Zielgruppe abgestimmt.“",
    name: "Sarah M.",
    role: "Inhaberin, Boutique Studio",
  },
  {
    quote:
      "„Endlich eine Agentur, die alles aus einer Hand liefert: Design, SEO und rechtliche Absicherung. Absolut empfehlenswert.“",
    name: "Thomas K.",
    role: "Geschäftsführer, Tech Startup",
  },
  {
    quote:
      "„Die Zusammenarbeit war unkompliziert und transparent. Unsere Anfragen über die Website haben sich verdreifacht.“",
    name: "Lisa B.",
    role: "Marketing-Leiterin",
  },
] as const;

export const insightPosts = [
  {
    tags: ["WIX Website Entwicklung", "Web Design"],
    title:
      "Kleinere Arbeitgeber sind ideal positioniert, um das Interesse der Generation Z zu wecken.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop",
    readTime: "5 Min. Lesezeit",
    featured: true,
  },
  {
    tags: ["WIX Website Entwicklung", "SEO"],
    title:
      "Warum lokale Unternehmen 2026 mehr als je zuvor auf eine starke Online-Präsenz setzen müssen.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop",
    readTime: "4 Min. Lesezeit",
    featured: false,
  },
] as const;

export const promoCards = [
  {
    label: "Suchmaschinenoptimierung",
    title: "Brauchen Sie mehr Kunden? Wir helfen auch dabei.",
    desc: "Steigern Sie Ihre Sichtbarkeit und erreichen Sie online mehr Kunden.",
    cta: "Website besuchen",
    gradient: "from-[#FF5C8D] via-[#FF7A9E] to-[#FFB3C8]",
    variant: "seo" as const,
  },
  {
    label: "Design & Markenbildung",
    title: "Maßgeschneidertes Design, das Ihre Marke einzigartig positioniert.",
    desc: "Individuelle Visuals, die Ihre Marke zum Strahlen bringen.",
    cta: "Website besuchen",
    gradient: "from-[#7B5CF0] via-[#9D66FF] to-[#C4B5FD]",
    variant: "design" as const,
  },
] as const;

export const whyUsFeatures = [
  {
    title: "Alles aus einer Hand",
    desc: "Von Domain bis Launch – ein Ansprechpartner für Ihr gesamtes Webprojekt.",
    accent: "#9D66FF",
    icon: "all",
    stat: "1 Ansprechpartner",
  },
  {
    title: "Schnelle Umsetzung",
    desc: "Strukturierte Prozesse, damit Ihre Website in Wochen, nicht Monaten, live geht.",
    accent: "#FF5C8D",
    icon: "speed",
    stat: "3–6 Wochen",
  },
  {
    title: "SEO von Anfang an",
    desc: "Suchmaschinenfreundliche Struktur und Inhalte sind von Tag eins integriert.",
    accent: "#34D399",
    icon: "seo",
    stat: "SEO Ready",
  },
  {
    title: "Rechtssicherheit",
    desc: "DSGVO-konforme Einrichtung mit Datenschutz, Impressum und Cookie-Banner.",
    accent: "#60A5FA",
    icon: "legal",
    stat: "100% DSGVO",
  },
  {
    title: "Persönlicher Support",
    desc: "Direkter Kontakt zu unserem Team – auch nach dem Launch für Updates und Hilfe.",
    accent: "#FBBF24",
    icon: "support",
    stat: "Direkter Kontakt",
  },
  {
    title: "Transparente Preise",
    desc: "Keine versteckten Kosten. Sie wissen von Anfang an, was Sie erwartet.",
    accent: "#A78BFA",
    icon: "price",
    stat: "Keine Extras",
  },
  {
    title: "Wix Studio Expertise",
    desc: "Zertifizierte Wix-Partner mit Erfahrung in komplexen, maßgeschneiderten Builds.",
    accent: "#FB7185",
    icon: "wix",
    stat: "Zertifiziert",
  },
  {
    title: "Messbare Ergebnisse",
    desc: "Websites, die Besucher in Kunden verwandeln – mit klaren KPIs und Reporting.",
    accent: "#2DD4BF",
    icon: "results",
    stat: "Klare KPIs",
  },
] as const;

export const whyUsHighlights = [
  {
    value: "3–6",
    label: "Wochen",
    desc: "Bis Ihre Website live ist",
    accent: "#FF5C8D",
    anim: "timeline",
  },
  {
    value: "100%",
    label: "DSGVO",
    desc: "Rechtlich abgesichert",
    accent: "#60A5FA",
    anim: "shield",
  },
  {
    value: "SEO",
    label: "Ready",
    desc: "Von Tag eins integriert",
    accent: "#34D399",
    anim: "bars",
  },
  {
    value: "1",
    label: "Ansprechpartner",
    desc: "Alles aus einer Hand",
    accent: "#9D66FF",
    anim: "connect",
  },
] as const;

export const faqItems = [
  {
    question: "Wie lange dauert es, eine Website zu erstellen?",
    answer:
      "Je nach Umfang dauert ein typisches Projekt 3–6 Wochen. Nach dem Kick-off erhalten Sie einen detaillierten Zeitplan mit Meilensteinen.",
  },
  {
    question: "Was kostet eine Website?",
    answer:
      "Unsere Pakete starten ab 2.500 € für eine professionelle Wix-Website. Der genaue Preis hängt von Umfang, Funktionen und Integrationen ab.",
  },
  {
    question: "Was ist im Lieferumfang enthalten?",
    answer:
      "Design, Entwicklung, SEO-Grundsetup, rechtliche Seiten, Domain-Einrichtung und ein Launch-Workshop sind standardmäßig enthalten.",
  },
  {
    question: "Gibt es Rückerstattungen?",
    answer:
      "Bei vorzeitigem Abbruch des Projekts erstellen wir eine faire Abrechnung basierend auf bereits erbrachten Leistungen.",
  },
  {
    question: "Wie funktioniert der Überarbeitungsprozess?",
    answer:
      "Jedes Paket enthält zwei Feedback-Runden. Änderungen werden dokumentiert und innerhalb von 48 Stunden umgesetzt.",
  },
] as const;

export const serviceFooterColumns = [
  {
    title: "RECHTLICHES",
    links: ["Impressum", "Datenschutz", "AGB"],
  },
  {
    title: "FOLGE UNS",
    links: ["LinkedIn", "Instagram", "X / Twitter"],
  },
] as const;
