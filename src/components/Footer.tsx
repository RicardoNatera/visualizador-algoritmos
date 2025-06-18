export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 text-center py-4 mt-8 border-t border-gray-700">
      <p className="text-sm">
        © {new Date().getFullYear()} Visualizador de Algoritmos. Hecho con Next.js.
      </p>
    </footer>

  );
}
