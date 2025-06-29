import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Visualizador de Algoritmos",
  description: "Explora visualmente algoritmos de ordenamiento y rutas.",
  keywords: [
    "algoritmos",
    "visualización",
    "ordenamiento",
    "rutas",
    "BFS",
    "Dijkstra",
    "A*",
    "bubble sort",
    "merge sort",
    "educativo",
    "interactivo",
    "Next.js",
    "Ricardo",
    "Natera"
  ],
  authors: [{ name: "Ricardo Natera", url: "https://github.com/RicardoNatera" }],
  creator: "Ricardo Natera",
  metadataBase: new URL("https://visualizador-algoritmos.vercel.app"), // Reemplaza si la URL final es distinta
  openGraph: {
    title: "Visualizador de Algoritmos",
    description: "Explora visualmente algoritmos de ordenamiento y rutas.",
    url: "https://visualizador-algoritmos.vercel.app", // Reemplaza si la URL final es distinta
    siteName: "Visualizador de Algoritmos",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visualizador de Algoritmos",
    description: "Explora visualmente algoritmos de ordenamiento y rutas.",
    creator: "@NateraSubero",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Header />
        <main className="flex-grow p-4 max-w-6xl mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
