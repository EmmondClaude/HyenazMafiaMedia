import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { IntroLoader } from "@/components/IntroLoader";
import { brand } from "@/lib/brand";

// Display / impact — tall, condensed, all-caps (KICKOFF §4)
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

// Body / UI — clean, neutral, highly legible (KICKOFF §4)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — Las Vegas Production House & Recording Artist`,
    template: `%s · ${brand.name}`,
  },
  description: brand.positioning,
  openGraph: {
    title: brand.name,
    description: brand.positioning,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-pearl">
        <IntroLoader />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
