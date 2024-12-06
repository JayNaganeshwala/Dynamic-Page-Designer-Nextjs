import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "B Different",
  description: "Created by Jay Naganeshwala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="h-screen"
      >
        {children}
      </body>
    </html>
  );
}
