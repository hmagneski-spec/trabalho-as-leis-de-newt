import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, Trophy, Brain } from 'lucide-react';
import { quizQuestions } from '@/data/laws';

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[current];
  const isLast = current === quizQuestions.length - 1;

  function handleSelect(i: number) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.correctIndex) setScore((s) => s + 1);
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setAnswered(false);
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  }

  const scorePercent = Math.round((score / quizQuestions.length) * 100);

  return (
    <section id="quiz" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium">Desafie-se</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Teste seus Conhecimentos
          </h2>
          <p className="text-slate-400 text-lg">
            5 perguntas sobre as leis que você acabou de aprender.
          </p>
        </div>

        {finished ? (
          /* Results screen */
          <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-8 md:p-12 text-center animate-fade-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">
              Você acertou {score} de {quizQuestions.length}!
            </h3>
            <p className="text-slate-400 text-lg mb-2">
              Pontuação: <span className="text-cyan-400 font-bold">{scorePercent}%</span>
            </p>
            <p className="text-slate-500 mb-8">
              {scorePercent === 100
                ? "Perfeito! Você domina as leis de Newton."
                : scorePercent >= 60
                ? "Muito bem! Você entende os conceitos principais."
                : "Continue praticando — revise as leis acima e tente novamente."}
            </p>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold hover:scale-105 transition-transform"
            >
              <RotateCcw className="w-5 h-5" />
              Tentar Novamente
            </button>
          </div>
        ) : (
          /* Question card */
          <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-8 md:p-10 animate-fade-up">
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-400 text-sm font-medium">
                Pergunta {current + 1} de {quizQuestions.length}
              </span>
              <span className="text-cyan-400 text-sm font-bold">
                Acertos: {score}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 mb-8">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 transition-all duration-500"
                style={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 leading-relaxed">
              {q.question}
            </h3>

            <div className="space-y-3 mb-6">
              {q.options.map((opt, i) => {
                const isCorrect = i === q.correctIndex;
                const isSelected = i === selected;
                let cls = "border-white/10 bg-white/5 hover:bg-white/10 text-slate-200";
                if (answered && isCorrect) {
                  cls = "border-emerald-500/50 bg-emerald-500/15 text-white";
                } else if (answered && isSelected && !isCorrect) {
                  cls = "border-red-500/50 bg-red-500/15 text-white";
                } else if (answered) {
                  cls = "border-white/5 bg-white/5 text-slate-400";
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={answered}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-center justify-between ${cls} ${
                      !answered ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <span className="font-medium">{opt}</span>
                    {answered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                    {answered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {answered && (
              <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-5 mb-6 animate-fade-up">
                <p className="text-cyan-200 text-sm leading-relaxed">
                  <span className="font-semibold">Explicação: </span>
                  {q.explanation}
                </p>
              </div>
            )}

            {answered && (
              <button
                onClick={handleNext}
                className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold hover:scale-[1.02] transition-transform"
              >
                {isLast ? "Ver Resultado" : "Próxima Pergunta"}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
