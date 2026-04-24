import { useState } from "react";

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#000000] text-[#00ff00] font-mono overflow-hidden">
      {!entered ? (
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="text-center">
            <p className="mb-4 text-xs">C:\\IF789\\ACCESS</p>
            <h1 className="text-4xl tracking-widest">IF789</h1>
            <p className="mt-4 text-xs text-[#00aa00]">PRESS ENTER TO CONTINUE</p>
          </div>

          <button
            onClick={() => setEntered(true)}
            className="mt-10 border border-[#00ff00] px-6 py-2 text-xs hover:bg-[#00ff00] hover:text-black"
          >
            ENTER
          </button>
        </div>
      ) : (
        <div className="relative h-screen w-full">
          {/* Windows XP field background */}
          <div className="absolute inset-0">
            <img
              src="https://i.imgur.com/8bKQ8Qp.jpg"
              alt="field"
              className="h-full w-full object-cover opacity-70"
            />
          </div>

          {/* overlay terminal feel */}
          <div className="relative z-10 flex h-full flex-col p-6">
            <div className="text-xs">
              IF789.EXE
              <br />
              STATUS: UNASSIGNED
            </div>

            <div className="mt-10">
              <h2 className="text-5xl tracking-tight">789</h2>
              <p className="mt-4 text-sm">not found</p>
            </div>

            <div className="mt-auto text-xs text-[#00aa00]">
              C:\\UNKNOWN\\SIGNAL
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
