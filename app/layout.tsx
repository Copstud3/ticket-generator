import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Ticket Generator app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`p-0`}>
        <Navbar />
        <div className="fixed inset-0 bg-background max-sm:hidden">
          <div className="absolute bottom-[-300px] left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-mint-green rounded-full blur-[100px] opacity-40"></div>
        </div>
        <div className="relative">{children}</div>
        {/* <div className="absolute bottom-[-500px] left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-mint-green rounded-full blur-3xl opacity-40"></div> */}
      </body>
    </html>
  );
}
