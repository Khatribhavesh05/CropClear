import "./globals.css";
import "leaflet/dist/leaflet.css";

import { DM_Sans, Space_Mono } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "CropClear",
  description:
    "AI-powered crop stubble burn prediction and intervention system for Punjab and Haryana.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${spaceMono.variable} bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
