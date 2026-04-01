import type { Metadata } from "next";
import "./globals.css";

import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-inter", // mapped to match previous config seamlessly
  weight: ["200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "LensCraft | Cinematic Photography",
  description: "A premium visual storytelling experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
