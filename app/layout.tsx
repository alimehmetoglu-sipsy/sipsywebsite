import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "sipsy.ai - AI & RPA Consulting | Hyperautomation Experts",
  description: "Transform your business with intelligent automation. Expert AI/ML integration, RPA implementation, and enterprise system orchestration. 40-60% cost reduction, 90-day implementation.",
  keywords: ["AI consulting", "RPA automation", "hyperautomation", "process automation", "enterprise integration", "AI/ML integration"],
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: "sipsy.ai - Intelligent Automation & AI Integration",
    description: "Enterprise AI and RPA consulting delivering 40-60% cost reduction",
    type: "website",
    images: [
      {
        url: '/images/og-image.png',
        width: 800,
        height: 800,
        alt: 'Sipsy Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
