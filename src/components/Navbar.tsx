import { useEffect, useState } from "react";
import { Atom, Menu, X } from "lucide-react";

const links = [
  { label: "Início", href: "#inicio" },
  { label: "As Três Leis", href: "#leis" },
  { label: "Exemplos", href: "#exemplos" },
  { label: "Quiz", href: "#quiz" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2 text-white font-bold text-lg">
          <Atom className="w-7 h-7 text-cyan-400" />
          <span>Leis de Newton</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-md border-t border-white/10 mt-3">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium block"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
