import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SumiControl",
  description: "Base operativa inicial para el proyecto SumiControl.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
