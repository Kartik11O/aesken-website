import Link from "next/link";

export function ReadMoreLink({ href = "#" }: { href?: string }) {
  return (
    <Link
      href={href}
      data-cursor="link"
      className="group inline-flex items-center gap-2 text-sm text-black/80 transition-colors hover:text-black"
    >
      Mehr lesen
      <span className="flex size-6 items-center justify-center rounded-full bg-black/5 text-xs transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
