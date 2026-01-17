import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/providers";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "CRM System",
    template: "%s | CRM System",
  },
  description: "CRM система для управління клієнтами та угодами",
  keywords: ["CRM", "клієнти", "угоди", "менеджмент", "система управління"],
  authors: [{ name: "CRM Team" }],
  creator: "CRM Team",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
  ),
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "/",
    title: "CRM System",
    description: "CRM система для управління клієнтами та угодами",
    siteName: "CRM System",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRM System",
    description: "CRM система для управління клієнтами та угодами",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <MainLayout>{children}</MainLayout>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
