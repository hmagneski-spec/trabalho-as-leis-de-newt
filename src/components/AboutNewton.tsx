import { Quote } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

export default function AboutNewton() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`grid lg:grid-cols-5 gap-12 items-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Image */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src="https://images.pexels.com/photos/714698/pexels-photo-714698.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Equações de física em um quadro negro com uma maçã"
                className="w-full h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">
              O Pai da Física Clássica
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6 text-balance">
              Quem foi Isaac Newton?
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              Isaac Newton (1643–1727) foi um físico, matemático e astrônomo inglês
              cujas descobertas revolucionaram nossa compreensão do universo. Em 1687,
              publicou sua obra magna, <em className="text-white">"Philosophiæ Naturalis Principia Mathematica"</em>,
              onde apresentou as três leis do movimento e a lei da gravitação universal.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Suas leis unificaram a física dos céus e da Terra, mostrando que a
              mesma força que faz a maçã cair também governa o movimento dos planetas.
              Mais de três séculos depois, continuam sendo a base da engenharia, da
              astronáutica e de inúmeras tecnologias modernas.
            </p>

            <div className="rounded-xl bg-slate-950/60 border border-white/10 p-6">
              <Quote className="w-8 h-8 text-cyan-400/40 mb-3" />
              <p className="text-slate-200 text-lg italic leading-relaxed">
                "Se vi mais longe, foi porque estava sobre os ombros de gigantes."
              </p>
              <p className="text-slate-500 text-sm mt-3">— Isaac Newton</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
