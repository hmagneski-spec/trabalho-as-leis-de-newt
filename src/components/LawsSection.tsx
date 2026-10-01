import { BookOpen, Bus, CircleDot, Rocket, ShoppingCart, Waves, Bird } from "lucide-react";
import type { LucideIcon } from 'lucide-react';
import { laws } from '@/data/laws';
import { useInView } from '@/hooks/useInView';

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Bus,
  BookOpen,
  ShoppingCart,
  CircleDot,
  Waves,
  Bird,
};

export default function LawsSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="leis" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-widest">
            Princípios Fundamentais
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 text-balance">
            As Três Leis do Movimento
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Publicadas em 1687 no livro "Principia", estas leis formam a base da
            mecânica clássica e descrevem como forças governam o movimento dos corpos.
          </p>
        </div>

        {/* Law cards */}
        <div ref={ref} className="space-y-12">
          {laws.map((law, idx) => {
            const Icon = iconMap[law.examples[0].icon] ?? Rocket;
            return (
              <div
                key={law.id}
                className={`transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Image side — alternates left/right */}
                  <div className={`relative ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative rounded-2xl overflow-hidden group">
                      <img
                        src={law.image}
                        alt={law.imageAlt}
                        className="w-full h-72 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                      {/* Law number badge */}
                      <div className={`absolute top-4 left-4 w-14 h-14 rounded-full bg-gradient-to-br ${law.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                        {law.id}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">
                          {law.name}
                        </span>
                        <p className="text-white font-bold text-lg">{law.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className={`${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${law.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-400 font-semibold text-sm uppercase tracking-wider">
                        {law.name} · {law.title}
                      </span>
                    </div>

                    <p className="text-slate-200 text-lg leading-relaxed mb-6">
                      {law.statement}
                    </p>

                    {/* Formula box */}
                    <div className="rounded-xl bg-slate-900/80 border border-white/10 p-6 mb-6">
                      <span className="text-slate-500 text-xs uppercase tracking-widest font-semibold">
                        Fórmula
                      </span>
                      <p className="text-2xl font-mono font-bold text-white mt-1 mb-2">
                        {law.formula}
                      </p>
                      <p className="text-slate-400 text-sm">{law.formulaMeaning}</p>
                    </div>

                    {/* Examples */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-2">
                        Exemplos do Cotidiano
                      </h4>
                      {law.examples.map((ex) => {
                        const ExIcon = iconMap[ex.icon] ?? CircleDot;
                        return (
                          <div
                            key={ex.title}
                            className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                          >
                            <ExIcon className={`w-5 h-5 text-${law.accent}-400 flex-shrink-0 mt-0.5`} />
                            <div>
                              <p className="text-white font-semibold text-sm">{ex.title}</p>
                              <p className="text-slate-400 text-sm mt-1">{ex.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
