import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import CommandPalette from "@/components/CommandPalette";
import ConsoleSignature from "@/components/ConsoleSignature";
import SignalConsole from "@/components/SignalConsole";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aryandhillon.dev"),
  title: "Aryan Dhillon — Software Engineer",
  description:
    "Software engineer working across embedded systems, AI, infrastructure, and full-stack products. Purdue Computer Engineering, class of 2027.",
  openGraph: {
    title: "Aryan Dhillon — Software Engineer",
    description:
      "I build software that moves information through complex systems.",
    url: "https://aryandhillon.dev",
    siteName: "Aryan Dhillon",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Dhillon — Software Engineer",
    description:
      "I build software that moves information through complex systems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')||'dark'}catch(e){}",
          }}
        />
        {children}
        <CommandPalette />
        <SignalConsole />
        <ConsoleSignature />
      </body>
    </html>
  );
}
