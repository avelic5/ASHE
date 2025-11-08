import React, { useEffect, useMemo, useState } from "react";
import { Check, HelpCircle, Shield, Sparkles } from "lucide-react";

/**
 * LandingTrustExercise
 * A 2–3 minute, privacy-first micro‑exercise for your homepage to build trust before sign-up.
 * Flow:
 *  1) 4‑7‑8 Breathing with animated circle
 *  2) Mood check (0–10) + instant micro‑savjet
 *  3) Jedan mali korak (checkbox + sugestije)
 *  CTA: "Započni besplatnu sesiju" – koristite onStart prop za redirect u aplikaciju
 */

type Props = {
  onStart?: () => void; // called when user clicks the CTA
};

const tips: Record<string, string[]> = {
  low: [
    "Danas probaj 2 kratke šetnje po 5 min.",
    "Napiši jednu rečenicu: ‘Šta mi sada treba?’.",
    "Pozovi prijatelja samo da kažeš ‘hej’.",
  ],
  mid: [
    "Izdvoji 10 min za zadatak koji odgađaš.",
    "Napravi plan za 1 mali korak do cilja.",
    "Zahvali sebi za jednu malu stvar danas.",
  ],
  high: [
    "Podijeli nešto dobro sa nekim koga cijeniš.",
    "Zapiši 3 stvari na kojima si zahvalan.",
    "Napravi playlistu od 3 pjesme za fokus.",
  ],
};

export default function LandingTrustExercise({ onStart }: Props) {
  const [phase, setPhase] = useState<"breath" | "mood" | "step" | "done">("breath");
  const [timer, setTimer] = useState(0);
  const [value, setValue] = useState(5);
  const [chosenTip, setChosenTip] = useState<string | null>(null);
  const [ack, setAck] = useState(false);

  // simple 4-7-8 cycle lengths in seconds
  const cycle = [4, 7, 8];
  const total = cycle.reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (phase !== "breath") return;
    setTimer(0);
    const id = setInterval(() => setTimer((t) => t + 1), 1000);
    const timeout = setTimeout(() => {
      clearInterval(id);
      setPhase("mood");
    }, (total * 2 + 4) * 1000); // ~2 ciklusa + buffer
    return () => {
      clearInterval(id);
      clearTimeout(timeout);
    };
  }, [phase, total]);

  const cycleState = useMemo(() => {
    const t = timer % total;
    if (t < cycle[0]) return { label: "Udah (4)", stage: "in" as const, prog: t / cycle[0] };
    if (t < cycle[0] + cycle[1])
      return { label: "Zadrži (7)", stage: "hold" as const, prog: (t - cycle[0]) / cycle[1] };
    return { label: "Izdah (8)", stage: "out" as const, prog: (t - cycle[0] - cycle[1]) / cycle[2] };
  }, [timer]);

  useEffect(() => {
    // pick a tip bucket based on value
    const bucket = value <= 3 ? "low" : value <= 7 ? "mid" : "high";
    const arr = tips[bucket];
    setChosenTip(arr[Math.floor(Math.random() * arr.length)]);
  }, [value]);

  return (
    <div className="w-full z-99 max-w-3xl mx-auto my-16 p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur border border-neutral-100 shadow-2xl ring-1 ring-black/5">
      {/* Header / Trust strip */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-violet-100 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-violet-700" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Siguran početak</h2>
            <p className="text-xs text-neutral-500">2–3 minute da dođeš sebi, bez registracije.</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-600">
          <Shield className="w-4 h-4" />
          <span>Bez praćenja. Ništa se ne čuva.</span>
        </div>
      </div>

      {/* PHASES */}
      {phase === "breath" && (
        <section className="grid sm:grid-cols-[220px_1fr] gap-6 items-center">
          <BreathCircle state={cycleState.stage} prog={cycleState.prog} />
          <div>
            <h3 className="text-base font-semibold text-neutral-900 mb-2">Vježba disanja 4‑7‑8</h3>
            <p className="text-sm text-neutral-600 mb-4">Dva ciklusa. Prati krug: udah 4s, zadrži 7s, izdah 8s.</p>
            <p className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-xl bg-neutral-100 text-neutral-700">
              <HelpCircle className="w-4 h-4" /> Ako želiš, možeš preskočiti.
            </p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setPhase("mood")} className="px-4 py-2 rounded-xl bg-white border text-sm hover:bg-neutral-50">Preskoči</button>
            </div>
          </div>
        </section>
      )}

      {phase === "mood" && (
        <section className="space-y-5">
          <div>
            <h3 className="text-base font-semibold text-neutral-900 mb-2">Kako si danas na skali 0–10?</h3>
            <input
              type="range"
              min={0}
              max={10}
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value, 10))}
              className="w-full accent-neutral-900"
            />
            <div className="mt-2 flex justify-between text-xs text-neutral-500">
              <span>0 — Teško mi je</span>
              <span>10 — Osjećam se dobro</span>
            </div>
            <div className="mt-2 flex justify-center">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 text-white text-xs shadow">
                Trenutno: <strong className="font-semibold ml-1">{value}</strong>
              </span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100 text-sm text-violet-900">
            <p className="font-medium mb-1">Brzi savjet</p>
            <p>{chosenTip}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setPhase("step")} className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm hover:opacity-90">Nastavi</button>
            <button onClick={() => setPhase("breath")} className="px-4 py-2 rounded-xl bg-white border text-sm hover:bg-neutral-50">Nazad</button>
          </div>
        </section>
      )}

      {phase === "step" && (
        <section className="space-y-5">
          <div>
            <h3 className="text-base font-semibold text-neutral-900 mb-2">Jedan mali korak za danas</h3>
            <ul className="space-y-2 text-sm">
              {["Popit ću čašu vode sada","Napravit ću 5 minuta šetnje","Zapisat ću jednu misao bez filtera"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <input type="checkbox" onChange={(e)=> setAck(e.currentTarget.checked)} className="rounded" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setPhase("done")}
              disabled={!ack}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm disabled:opacity-40"
            >
              Potvrdi korak
            </button>
            <button onClick={() => setPhase("mood")} className="px-4 py-2 rounded-xl bg-white border text-sm hover:bg-neutral-50">Nazad</button>
          </div>
        </section>
      )}

      {phase === "done" && (
        <section className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <Check className="w-6 h-6 text-emerald-700" />
          </div>
          <h3 className="text-base font-semibold text-neutral-900">Lijepo! Danas si već uradio/la nešto dobro za sebe.</h3>
          <p className="text-sm text-neutral-600">Ako želiš, možeš odmah nastaviti u vođenu sesiju.</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onStart}
              className="px-5 py-2.5 rounded-2xl bg-neutral-900 text-white text-sm hover:opacity-90"
            >
              Započni besplatnu sesiju
            </button>
          </div>
          <p className="text-[11px] text-neutral-500">Ne čuvamo tvoje odgovore. Možeš nastaviti anonimno.</p>
        </section>
      )}
    </div>
  );
}

function BreathCircle({ state, prog }: { state: "in" | "hold" | "out"; prog: number }) {
  const label = state === "in" ? "Udah" : state === "hold" ? "Zadrži" : "Izdah";
  const aria = `${label} – ${Math.round(prog * 100)}%`;
  return (
    <div className="flex flex-col items-center">
      <div
        className={
          "relative grid place-items-center w-48 h-48 rounded-full transition-all duration-700 " +
          (state === "in" ? "scale-110 bg-violet-200" : state === "hold" ? "scale-100 bg-violet-100" : "scale-90 bg-violet-50")
        }
        aria-label={aria}
      >
        <div className="w-28 h-28 rounded-full bg-white/70 border border-white shadow-inner" />
      </div>
      <p className="mt-3 text-sm text-neutral-700">{label}</p>
    </div>
  );
}
