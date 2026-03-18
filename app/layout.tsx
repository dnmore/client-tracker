import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/ui/footer";

const inter = Inter({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: {
    template: "%s | Freelance Client Tracker | Nexus",
    default: "Freelance Client Tracker | Nexus",
  },
  description:
    "Streamline your freelance workflow with Nexus. Built using Next.js, Prisma, and Neon database, it tracks leads and deal stages with secure RBAC permissions. Start free (up to 5 deals) and upgrade to Pro for €15/month with Stripe subscriptions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
