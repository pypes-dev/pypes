import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pypes",
  description: "Pypes: The next-gen AI built for making you more money.",
  metadataBase: new URL('https://pypes.dev'),
  icons: {
    icon: [
      { url: '/dalle5.webp' },
    ],
    apple: [
      { url: '/dalle5.webp' },
    ],
  },
  openGraph: {
    title: 'Pypes',
    description: 'Pypes: The next-gen AI built for making you more money.',
    images: [
      {
        url: '/dalle5.webp',
        width: 1200,
        height: 630,
        alt: 'Pypes - AI for Making Money',
      },
    ],
    url: 'https://pypes.dev/',
    type: 'website',
    siteName: 'Pypes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pypes',
    description: 'Pypes: The next-gen AI built for making you more money.',
    images: ['/dalle5.webp'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
