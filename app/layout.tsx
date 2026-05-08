import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme-Provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import InviteRedirectHandler from "@/components/InviteRedirectHandler";
import JsonLd from "@/components/JsonLd";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteConfig = {
  name: "Brapurple",
  description: "Brapurple is a dynamic musical artist from Takoradi, Ghana, blending soulful melodies and eclectic raps. Stay in touch with his latest releases, tours, and more.",
  url: "https://brapurple.com", // Replace with actual domain if different
  ogImage: "https://brapurple.com/images/og-image.jpg",
  keywords: [
    "Brapurple",
    "Ghanaian Artist",
    "Takoradi Music",
    "Afrobeats Ghana",
    "Brapurple Music",
    "Ghanaian Rapper",
    "Takoradi Artist",
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Brapurple" }],
  creator: "Brapurple",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@brapurple", // Update if there's a specific handle
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd />
          <InviteRedirectHandler />
          {children}
          <div className="fixed bottom-4 right-4 z-50">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
