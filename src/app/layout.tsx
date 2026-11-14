import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Instrument_Sans } from "next/font/google";
import { PageTransitionProvider } from "@/components/page-transition-provider";
import { ScrollRestoration } from "@/components/scroll-restoration";
import { CursorProvider } from "@/components/cursor-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aesken — Das vernetzte Ökosystem für moderne Unternehmen",
  description:
    "Aesken vereint Design, SEO, Buchung und Webservices zu einer orchestrierten Infrastruktur für moderne Unternehmen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${instrumentSans.variable} h-full`}>
      <head>
        <Script id="scroll-top" strategy="beforeInteractive">
          {`
            history.scrollRestoration = 'manual';
            if (!location.hash) {
              window.scrollTo(0, 0);
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }
          `}
        </Script>
      </head>
      <body className="min-h-full bg-white text-black antialiased">
        <ScrollRestoration />
        <CursorProvider>
          <PageTransitionProvider>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </PageTransitionProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
