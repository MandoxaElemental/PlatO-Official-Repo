import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarComponent } from "./Components/NavbarComponentLeft";
import { NavbarComponentRight } from "./Components/NavbarComponentRight";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlatO",
  description: "Share Your Meal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" type="image/x-icon" href="./assets/house.svg"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-between px-5 max-h-[100vh]">
          <div className="max-h-screen overflow-y-auto scrollbar-hide">
        <NavbarComponent/>
          </div>
          <div className="w-min-screenmax-h-screen overflow-y-auto scrollbar-hide">
        {children}
          </div>
          <div className="max-h-screen overflow-y-auto scrollbar-hide">
        <NavbarComponentRight/>
        </div>
    </div>
      </body>
    </html>
  );
}
