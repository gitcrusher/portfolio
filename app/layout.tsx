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
  title: "Aayush Soni",
  description: "Dossier of a AI and ML developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Yahan se style hata kar background ko Sand theme ke 
          hisaab se set kiya hai taaki pura page ek jaisa dikhe 
      */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAF7F2]`}>
        {children}
      </body>
    </html>
  );
}