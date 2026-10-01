import { ArrowDown, Atom, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/17954395/pexels-photo-17954395.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920"
          alt="Via Láctea"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/70 to-slate-950" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Floating atom */}
      <div className="absolute top-1/4 right-[10%] hidden lg:block animate-float">
        <Atom className="w-32 h-32 text-cyan-400/20" strokeWidth={1} />
      </div>
      <div className="absolute bottom-1/4 left-[8%] hidden lg:block animate-float" style={{ animationDelay: "2s" }}>
        <Atom className="w-20 h-20 text-orange-400/20" strokeWidth={1} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-slate-200 font-medium">Física Clássica · Mecânica Newtoniana</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance animate-fade-up">
          As Três Leis de
          <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-sky-400 to-orange-400 bg-clip-text text-transparent">
            Isaac Newton
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Descubra as leis que governam todo movimento no universo — desde uma
          maçã que cai até um foguete que cruza o espaço.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <a
            href="#leis"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold text-lg hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
          >
            Explorar as Leis
          </a>
          <a
            href="#quiz"
            className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300"
          >
            Testar Conhecimento
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-slate-400" />
      </div>
    </section>
  );
}
