import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GlowMart – Premium Ladies Beauty Store",
  description:
    "Discover GlowMart – your one-stop destination for premium ladies' beauty products. Shop lipsticks, foundations, eyeshadows, nail polishes and more, organized beautifully by category.",
  keywords: [
    "beauty mart",
    "lipstick",
    "lipgloss",
    "eyeliner",
    "mascara",
    "foundation",
    "highlighter",
    "nail polish",
    "eyeshadow palette",
    "ladies beauty products",
  ],
  authors: [{ name: "GlowMart" }],
  openGraph: {
    title: "GlowMart – Premium Ladies Beauty Store",
    description: "Your luxurious, category-organized beauty mini-mart.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}
