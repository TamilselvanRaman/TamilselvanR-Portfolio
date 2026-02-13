import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SplashLoader from "@/components/SplashLoader";

export const metadata: Metadata = {
  title: "TAMILSELVAN.DEV ",
  description: "I build digital products that refuse to be ignored.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SplashLoader />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
