import { Github, Linkedin } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gray-800 text-gray-100 py-4 shadow">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Visualizador de Algoritmos</h1>
        <nav className="flex items-center gap-4">
          <span className="text-sm text-gray-400">por Ricardo Natera</span>
          <a
            href="https://github.com/RicardoNatera"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/natera-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
