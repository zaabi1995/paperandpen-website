import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paper & Pen Company | Premium Stationery & Office Supplies in Oman",
  description: "Premium stationery and office supplies in Oman. Paper & Pen Company offers high-quality products at competitive prices with exceptional service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="preload" 
          href="https://upload.bhdoman.com/paperandpen/uploads/D-DIN.otf" 
          as="font" 
          type="font/otf" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="https://upload.bhdoman.com/paperandpen/uploads/GE.otf" 
          as="font" 
          type="font/otf" 
          crossOrigin="anonymous" 
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
