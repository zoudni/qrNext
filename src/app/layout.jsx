import localFont from "next/font/local";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { arSA } from "@clerk/localizations";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "QR Generator",
  description: "Manage big businesses using QR codes",
};

export default function RootLayout({ children }) {
  return (
    
    <ClerkProvider >
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
