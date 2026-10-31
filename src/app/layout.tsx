import type { Metadata, Viewport } from "next";
import { interFont } from "./fonts/fontsConfig";
import "./globals.css";
import StateProvider from "./state_management/provider";
import PageContainer from "./Containers/PageContainer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  title: "Kleanix | Reliable Home & Commercial Cleaning in Perth",
  description: "Simple, reliable home, office, and vacate cleaning in Perth with Kleanix. Vetted, police-checked cleaners with a 100% Bond Back Guarantee.",
  keywords: ["cleaning perth", "home cleaning perth", "vacate cleaning perth", "bond cleaning", "commercial cleaning perth", "kleanix"],
  authors: [{ name: "Kleanix Platform" }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interFont.className} antialiased bg-white text-slate-900`}>
        <StateProvider>
          <PageContainer>
            {children}
          </PageContainer>
        </StateProvider>
      </body>
    </html>
  );
}
