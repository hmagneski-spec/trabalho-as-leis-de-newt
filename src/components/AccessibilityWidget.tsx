import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Square, Accessibility, X } from 'lucide-react';

type SpeakState = 'idle' | 'playing' | 'paused';

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<SpeakState>('idle');
  const [supported, setSupported] = useState(true);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const chunksRef = useRef<string[]>([]);
  const chunkIdxRef = useRef(0);
  const stateRef = useRef<SpeakState>('idle');
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Pick the best available Portuguese voice once voices are loaded.
  // Browser voice lists load asynchronously, so we listen for the event.
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }
    synthRef.current = window.speechSynthesis;

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      // Prefer pt-BR, then any pt-* voice, as a fallback the first available.
      const ptBR = voices.find((v) => v.lang === 'pt-BR');
      const anyPt = voices.find((v) => v.lang.startsWith('pt'));
      voiceRef.current = ptBR ?? anyPt ?? voices[0] ?? null;
    };

    pickVoice();
    window.speechSynthesis.addEventListener('voiceschanged', pickVoice);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', pickVoice);
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Collect all readable leaf text from the page, then split it into
  // sentence-level chunks so the narrator pauses at natural punctuation
  // points instead of mid-paragraph — making the voice sound human.
  function buildChunks(): string[] {
    const main = document.querySelector('main');
    if (!main) return [];

    const leafTexts: string[] = [];
    const walker = document.createTreeWalker(main, NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        const el = node as HTMLElement;
        if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') {
          return NodeFilter.FILTER_REJECT;
        }
        if (el.getAttribute('aria-hidden') === 'true') return NodeFilter.FILTER_REJECT;
        if (el.children.length === 0 && el.textContent?.trim()) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      },
    });

    const seen = new Set<string>();
    while (walker.nextNode()) {
      const text = walker.currentNode.textContent?.trim();
      if (text && !seen.has(text)) {
        seen.add(text);
        leafTexts.push(text);
      }
    }

    // Join all leaf texts into one flowing passage, then split by sentence
    // boundaries (., !, ?, :). This lets the TTS engine place natural
    // micro-pauses at punctuation rather than between arbitrary DOM nodes.
    const fullText = leafTexts.join('. ');
    const rawSentences = fullText.split(/(?<=[.!?:])\s+/);

    // Group 2–3 sentences per utterance so the engine doesn't reset tone
    // too often, keeping the delivery smooth and conversational.
    const chunks: string[] = [];
    let buffer = '';

    for (const sentence of rawSentences) {
      const trimmed = sentence.trim();
      if (!trimmed) continue;
      const candidate = buffer ? `${buffer} ${trimmed}` : trimmed;
      if (candidate.length > 180 && buffer) {
        chunks.push(buffer);
        buffer = trimmed;
      } else {
        buffer = candidate;
      }
    }
    if (buffer) chunks.push(buffer);

    return chunks;
  }

  function speakChunk(idx: number) {
    const synth = synthRef.current;
    if (!synth || idx >= chunksRef.current.length) {
      setState('idle');
      chunkIdxRef.current = 0;
      return;
    }

    const text = chunksRef.current[idx];
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'pt-BR';
    // Slightly slower than default for a calmer, more human pace.
    utter.rate = 0.95;
    // Marginally higher pitch softens the robotic monotone of default voices.
    utter.pitch = 1.08;
    // Slightly lower volume prevents harsh clipping on certain syllables.
    utter.volume = 0.9;
    if (voiceRef.current) utter.voice = voiceRef.current;

    utter.onend = () => {
      if (stateRef.current === 'playing') {
        chunkIdxRef.current = idx + 1;
        speakChunk(idx + 1);
      }
    };

    synth.speak(utter);
  }

  function handlePlay() {
    const synth = synthRef.current;
    if (!synth) return;

    if (state === 'paused') {
      synth.resume();
      setState('playing');
      return;
    }

    synth.cancel();
    chunksRef.current = buildChunks();
    chunkIdxRef.current = 0;
    if (chunksRef.current.length === 0) return;
    setState('playing');
    speakChunk(0);
  }

  function handlePause() {
    const synth = synthRef.current;
    if (!synth) return;
    synth.pause();
    setState('paused');
  }

  function handleStop() {
    const synth = synthRef.current;
    if (!synth) return;
    synth.cancel();
    setState('idle');
    chunkIdxRef.current = 0;
  }

  if (!supported) return null;

  const isActive = state === 'playing' || state === 'paused';

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          open
            ? 'bg-slate-800 text-white rotate-90'
            : isActive
            ? 'bg-gradient-to-br from-cyan-500 to-sky-500 text-white'
            : 'bg-slate-800 text-cyan-400 hover:scale-110'
        }`}
        aria-label="Opções de acessibilidade"
      >
        {open ? <X className="w-6 h-6" /> : <Accessibility className="w-6 h-6" />}
      </button>

      {/* Pulsing ring when active */}
      {!open && isActive && (
        <span className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-cyan-500 animate-ping opacity-30 pointer-events-none" />
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-white/15 shadow-2xl p-5 animate-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <Volume2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white font-bold text-base">Leitura Automática</h3>
          </div>

          <p className="text-slate-400 text-sm mb-5 leading-relaxed">
            Clique em reproduzir para ouvir todo o conteúdo do site em português, com narração automática.
          </p>

          {/* Controls */}
          <div className="flex items-center gap-3 mb-4">
            {state !== 'playing' ? (
              <button
                onClick={handlePlay}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold text-sm hover:scale-105 transition-transform"
              >
                <Play className="w-4 h-4" />
                {state === 'paused' ? 'Retomar' : 'Reproduzir'}
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
              >
                <Pause className="w-4 h-4" />
                Pausar
              </button>
            )}

            <button
              onClick={handleStop}
              disabled={state === 'idle'}
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Parar leitura"
            >
              <Square className="w-4 h-4" />
            </button>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 text-sm">
            {state === 'playing' && (
              <>
                <span className="flex gap-1">
                  <span className="w-1.5 h-4 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-4 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-4 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                </span>
                <span className="text-cyan-400">Lendo conteúdo...</span>
              </>
            )}
            {state === 'paused' && (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Leitura pausada</span>
              </>
            )}
            {state === 'idle' && (
              <>
                <VolumeX className="w-4 h-4 text-slate-500" />
                <span className="text-slate-500">Pronto para iniciar</span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
