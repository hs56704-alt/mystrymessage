import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css"; 
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react"; 
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mystry Message",                            
  description: "Start your Mystry Message adventure", 
  metadataBase: new URL("https://yourdomain.com"),     
  openGraph: {
    title: "Mystery Message",
    description: "Send anonymous messages to anyone",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}
      >
        <Providers> 
          
          {children}
        </Providers>
      </body>
    </html>
  );
}