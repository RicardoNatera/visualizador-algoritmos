import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Visualizador de Algoritmos",
  description: "Explora visualmente algoritmos de ordenamiento y rutas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
        <Header />
        <main className="flex-grow p-4 max-w-6xl mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
