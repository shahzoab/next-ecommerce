import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/app/providers";
import "@/app/globals.css";

// Import the Inter font
const inter = Inter({ subsets: ["latin"] });

/**
 * The metadata for the Next.js app.
 * This includes the title and description of the app.
 */
export const metadata: Metadata = {
  title: "Next Ecommerce",
  description: "An e-commerce application built with Next.js",
};

/**
 * The RootLayout component is the top-level layout component for the app.
 * It wraps its children with the Providers component
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The children of the component.
 * @returns {JSX.Element} The RootLayout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
