import type { Metadata } from "next";

const formUrl = "https://aesken.wixforms.com/f/7527062712753325113";

export const metadata: Metadata = {
  title: "Discovery Call | Aesken Test",
  robots: { index: false, follow: false },
};

export default function DiscoveryTestPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
      <h1 className="text-3xl font-semibold">Discovery Call anfragen</h1>
      <p className="mt-3">Testformular für die Aesken Testsite.</p>
      <iframe
        className="mt-6 min-h-[42rem] w-full rounded border border-black/15"
        src={formUrl}
        title="Aesken Kontaktanfrage mit Discovery-Termin"
      />
      <a className="mt-4 inline-block underline" href={formUrl}>
        Formular direkt öffnen
      </a>
    </main>
  );
}
