import { Atom, Github, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Atom className="w-6 h-6 text-cyan-400" />
            <span>Leis de Newton</span>
          </div>

          <nav className="flex items-center gap-6">
            <a href="#inicio" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Início</a>
            <a href="#leis" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">As Três Leis</a>
            <a href="#quiz" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Quiz</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Saiba mais</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-500 text-sm">
            "Se vi mais longe, foi porque estava sobre os ombros de gigantes." — Isaac Newton
          </p>
          <p className="text-slate-600 text-xs mt-4">
            Site educativo sobre as leis do movimento · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
