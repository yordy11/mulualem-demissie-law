import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MULUALEM DEMISSIE ZERIHUN | Lawyer and Attorney",
  description:
    "Professional legal representation by Attorney Mulualem Demissie Zerihun. Specializing in Civil Litigation, Contract Law, Corporate Law, Real Estate, and Dispute Resolution in Addis Ababa, Ethiopia.",
  keywords: [
    "Mulualem Demissie Zerihun",
    "Lawyer in Addis Ababa",
    "Ethiopian Attorney",
    "Civil Litigation Ethiopia",
    "Contract Law Addis Ababa",
    "Corporate Lawyer Ethiopia",
    "Property Law Lideta",
  ],
  icons: {
    icon: "/attorney-logo.png",
  },
  verification: {
    google: "google4536277da44ae43b",
  },
  openGraph: {
    title: "MULUALEM DEMISSIE ZERIHUN | Lawyer and Attorney",
    description:
      "Providing sophisticated, strategic legal solutions with uncompromising integrity and client-focused precision.",
    type: "website",
    locale: "en_US",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Mulualem Demissie Zerihun Law Office",
  description:
    "Professional, strategic, and client-focused legal representation in Civil Litigation, Contract Law, Corporate & Commercial Law, Real Estate, and Dispute Resolution.",
  telephone: ["+251917117939", "+251909838013"],
  email: "mulualemdm66@gmail.com",
  hasMap:
    "https://www.google.com/maps/place/Mulualem+Damissie+attorney+and+consultant+at+law+law/@9.0063465,38.7315822,17z/data=!3m1!4b1!4m6!3m5!1s0x164b87e84f1a8003:0x3fa25d85b5c1bdf0!8m2!3d9.0063465!4d38.7315822!16s%2Fg%2F11xd2mp3n0?entry=ttu",
  geo: {
    "@type": "GeoCoordinates",
    latitude: 9.0063465,
    longitude: 38.7315822,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lideta Merkato Mall, 1st Floor, Office No. 134",
    addressLocality: "Lideta Sub-City",
    addressRegion: "Addis Ababa",
    addressCountry: "ET",
  },
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
