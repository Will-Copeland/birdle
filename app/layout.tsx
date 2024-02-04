import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"; // or `v14-appRouter` if you are using Next.js v14
import { Header } from "./components/Header";
import { Providers } from "@/util/providers/Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Birdle",
  description: "Train yourself to recognize bird calls",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppRouterCacheProvider>
            <Header />
            {children}
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
