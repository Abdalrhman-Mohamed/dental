"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ServicesProvider } from "../context/ServicesContext";
import NavBar from "./_components/NavBar";
import Footer from "./_components/footer";
import { usePathname } from 'next/navigation';
import { metadata } from './metadata';
import AuthProvider from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/auth";

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ServicesProvider>
          <AuthProvider>
            {!isLoginPage && <NavBar />}
            {children}
            {!isLoginPage && <Footer />}
          </AuthProvider>
        </ServicesProvider>
      </body>
    </html>
  );
}
