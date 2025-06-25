import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Client Web Test",
  description: "An Client web to use the python api",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
