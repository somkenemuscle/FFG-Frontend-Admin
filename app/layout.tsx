import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Admin Gym",
  description: "Admin Gym Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans text-sm"
      >
        {children}
      </body>
    </html>
  );
}
