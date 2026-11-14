import Link from "next/link";
import { Logo } from "@/components/logo";
import { StatusDot } from "@/components/status-dot";
import { footerColumns } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/15 bg-white pt-20 pb-10" data-cursor-bg="light">
      <div className="mx-auto max-w-[1440px] px-10">
        <div className="grid gap-12 border-b border-black/15 pb-16 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Link href="#" aria-label="Aesken home">
              <Logo />
            </Link>
            <p className="mt-6 text-base leading-[26px] text-black/60">
              The connected ecosystem for modern business. Identity, visibility, operations,
              and infrastructure — orchestrated as one.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="text-xs uppercase tracking-[0.3em] text-black/45">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-black/75 transition-colors hover:text-black"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 text-xs text-black/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Aesken Ecosystem · Berlin · Paris · Online</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-black">
              Imprint
            </Link>
            <Link href="#" className="hover:text-black">
              Privacy
            </Link>
            <Link href="#" className="hover:text-black">
              Terms
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <StatusDot variant="light" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
