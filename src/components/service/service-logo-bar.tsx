import { partnerLogos } from "@/lib/service-data";

export function ServiceLogoBar() {
  return (
    <section className="border-y border-black/6 bg-[#f7f7f7]" data-cursor-bg="light" aria-label="Partner">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-2 gap-y-4 px-6 py-6 md:gap-x-0 md:px-10">
        {partnerLogos.map((name) => (
          <div
            key={name}
            className="flex h-16 w-[150px] items-center justify-center text-sm font-semibold tracking-wide text-black/25"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
