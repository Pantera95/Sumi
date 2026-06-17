import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SumiControl",
  description: "Plataforma interna de control administrativo para Sumigases y Sudematin.",
};

// Evita parpadeo de tema: aplica la preferencia guardada antes del primer paint.
const themeInit = `(function(){try{var t=localStorage.getItem('sumi-theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
