export default function Header() {
  return (
    <header className="bg-gray-800 text-gray-100 py-4 shadow">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Visualizador de Algoritmos</h1>
        <nav>
          <span className="text-sm text-gray-400">por Ricardo Natera</span>
        </nav>
      </div>
    </header>
  );
}
