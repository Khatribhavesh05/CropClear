import "./globals.css";
import "leaflet/dist/leaflet.css";

import { Inter, Barlow_Condensed, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "CropClear — Crop Burning Prevention System",
  description:
    "Satellite-powered crop stubble burn prediction and WhatsApp intervention platform for Punjab and Haryana.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable} bg-base text-ink-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
