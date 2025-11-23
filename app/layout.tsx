import type { Metadata } from "next";
import { Chewy, Sour_Gummy, } from "next/font/google";
import "./globals.css";
import Navbar from "@/features/app/components/Navbar";
import Footer from "@/features/app/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const chewy = Chewy({
  variable: "--font-chewy",
  subsets: ["latin"],
  weight: "400"
});

const sourGummy = Sour_Gummy({
  variable: "--font-sour-gummy",
  subsets: ["latin"],
  weight: "400"
})

export const metadata: Metadata = {
  title: "Blackash - Tech Literacy",
  description: "On Tech Literacy Day, Blackash - Tech is a mission to empower students with the knowledge they need to succeed in the digital world.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${chewy.variable} ${sourGummy.variable} font-sour-gummy antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-[calc(100vh-120px)]">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
