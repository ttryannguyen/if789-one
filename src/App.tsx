import React, { useEffect, useState } from "react";

export default function IF789() {
  const [entered, setEntered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white font-sans">
      <style>{`
        @keyframes flicker {
          0%, 19%, 21%, 23%, 80%, 100% { opacity: 1; transform: translate(0,0); }
          20% { opacity: .3; transform: translate(-2px, 1px); }
          22% { opacity: .7; transform: translate(2px, -1px); }
          81% { opacity: .4; transform: translate(1px, 1px); }
        }
        .flicker { animation: flicker 3s infinite; }
      `}</style>

      <div
        className="pointer-events-none fixed z-50 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference md:block"
        style={{ left: cursor.x, top: cursor.y }}
      />

      {!entered ? (
        <main className="relative z-10 flex min-h-screen flex-col px-6 py-8">
          <div className="mt-[20vh] max-w-5xl">
            <h1 className="flicker text-[18vw] leading-none tracking-[-0.08em] sm:text-[11rem]">
              IF789
            </h1>

            <div className="mt-4 grid max-w-3xl grid-cols-12 gap-4">
              <p className="col-span-7 text-sm text-white/60">7 ate 9.</p>
              <p className="col-span-5 translate-y-6 text-right text-xs text-white/30">8 watched.</p>
            </div>
          </div>

          <div className="mt-auto flex items-end justify-between pb-12">
            <p className="max-w-xs text-xs text-white/25">
              unassigned.
            </p>
            <button
              onClick={() => setEntered(true)}
              className="rounded-full border border-white/25 px-7 py-3 text-xs tracking-[0.3em] text-white/70 transition hover:bg-white hover:text-black"
            >
              ENTER
            </button>
          </div>
        </main>
      ) : (
        <main className="relative z-10 px-6 py-8">
          <nav className="mx-auto flex max-w-6xl items-center justify-between pb-6">
            <button onClick={() => setEntered(false)} className="text-lg tracking-[0.3em]">
              IF789
            </button>
          </nav>

          <section className="mx-auto min-h-[80vh] max-w-6xl py-20">
            <h2 className="text-[14vw] leading-[0.85] tracking-[-0.08em] sm:text-8xl">
              no origin
            </h2>

            <p className="mt-10 max-w-sm text-sm text-white/40">
              789 isn’t real.
            </p>
          </section>

          {/* ONE STRONG ELEMENT */}
          <section className="mx-auto max-w-6xl py-20">
            <div className="relative h-[400px] border border-white/10 bg-[#0b0b0b] flex items-center justify-center">
              <div className="text-[10rem] text-white/10">7</div>
              <div className="absolute text-[12rem] text-white/20 blur-[0.5px]">8</div>
              <div className="absolute text-[10rem] text-red-500/20 blur-[1px]">9</div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
