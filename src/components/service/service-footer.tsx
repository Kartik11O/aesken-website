import Link from "next/link";
import { Logo } from "@/components/logo";
import { serviceFooterColumns } from "@/lib/service-data";

export function ServiceFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#111111] pt-16 pb-10 text-white" data-cursor-bg="dark">
      <div
        className="pointer-events-none absolute -right-20 bottom-0 select-none font-[family-name:var(--font-instrument)] text-[280px] font-bold leading-none text-white/[0.03]"
        aria-hidden
      >
        A
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Aesken home" data-cursor="link">
              <Logo variant="light" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
              Komplette Webdienste für moderne Unternehmen – von Design und SEO bis Domain und
              rechtlicher Einrichtung.
            </p>

            <form className="mt-8 space-y-3" aria-label="Newsletter">
              <input
                type="text"
                placeholder="Name"
                className="w-full max-w-xs rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/30"
              />
              <input
                type="email"
                placeholder="E-Mail"
                className="w-full max-w-xs rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/30"
              />
              <button
                type="button"
                data-cursor="button"
                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
              >
                Senden
              </button>
            </form>
          </div>

          {serviceFooterColumns.map((column) => (
            <div key={column.title}>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      data-cursor="link"
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Aesken Webdienste · Berlin · Online</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/70">
              Impressum
            </Link>
            <Link href="#" className="hover:text-white/70">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
