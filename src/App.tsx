import { useEffect, useRef, useState } from "react";

type WindowData = {
  id: number;
  x: number;
  y: number;
  type: "normal" | "takeover";
};

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const brand = "IF789";
    const fontSize = 11;
    const columnGap = 6;

    type Drop = {
      x: number;
      y: number;
      speed: number;
      text: string;
      brand: boolean;
      offset: number;
    };

    let drops: Drop[] = [];

    const makeDrop = (x: number): Drop => {
      const isBrand = Math.random() > 0.955;
      return {
        x,
        y: Math.random() * height,
        speed: 1.05 + Math.random() * 1.65,
        text: isBrand ? brand : letters[Math.floor(Math.random() * letters.length)],
        brand: isBrand,
        offset: 0,
      };
    };

    const setup = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      drops = [];

      for (let x = 0; x < width; x += columnGap) {
        drops.push(makeDrop(x));
        drops.push(makeDrop(x + Math.random() * 3));
        drops.push(makeDrop(x + Math.random() * 6));
      }

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);
    };

    const drawVerticalText = (text: string, x: number, y: number, color: string, alpha = 1) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;

      for (let i = 0; i < text.length; i++) {
        ctx.fillText(text[i], x, y + i * fontSize);
      }

      ctx.globalAlpha = 1;
    };

    const draw = () => {
      const mouse = mouseRef.current;

      ctx.fillStyle = "rgba(0, 0, 0, 0.075)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'Lucida Console', 'Courier New', monospace`;
      ctx.textBaseline = "top";

      for (const drop of drops) {
        const dx = drop.x - mouse.x;
        const dy = drop.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 55) {
          const push = (55 - distance) / 55;
          drop.offset += dx > 0 ? push * 0.45 : -push * 0.45;
        } else {
          drop.offset *= 0.92;
        }

        const x = drop.x + drop.offset;
        const y = drop.y;

        if (drop.brand) {
          drawVerticalText(drop.text, x, y, Math.random() > 0.92 ? "#eaffea" : "#2dff77", 0.9);
        } else {
          const bright = Math.random() > 0.9;
          drawVerticalText(drop.text, x, y, bright ? "#d8ffd8" : "#00c84a", bright ? 0.95 : 0.72);
        }

        drop.y += drop.speed;

        if (drop.y > height + fontSize * 8) {
          const newDrop = makeDrop(drop.x);
          drop.y = -Math.random() * height * 0.25;
          drop.speed = newDrop.speed;
          drop.text = newDrop.text;
          drop.brand = newDrop.brand;
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    setup();
    window.addEventListener("resize", setup);
    window.addEventListener("mousemove", handleMouseMove);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", setup);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0 }} />;
}

function WindowCloseButton() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        height: 18,
        background: "#c0c0c0",
        border: "1px solid black",
        color: "black",
        boxShadow: "inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff",
      }}
    >
      ×
    </span>
  );
}

function ErrorWindow({ data, index, onEnter }: { data: WindowData; index: number; onEnter: () => void }) {
  const isTakeover = data.type === "takeover";

  return (
    <div
      style={{
        position: "absolute",
        top: isTakeover ? "50%" : data.y,
        left: isTakeover ? "50%" : data.x,
        transform: isTakeover ? "translate(-50%, -50%)" : "none",
        width: isTakeover ? "min(640px, calc(100vw - 32px))" : "235px",
        background: "#c0c0c0",
        border: "2px solid black",
        boxShadow:
          "inset -2px -2px 0 #808080, inset 2px 2px 0 #ffffff, 6px 6px 0 rgba(0,0,0,0.6)",
        fontFamily: "'Share Tech Mono', 'OCR A Std', monospace",
        color: "black",
        opacity: isTakeover ? 1 : Math.max(0.56, 1 - index * 0.032),
        zIndex: isTakeover ? 100 : 10 + index,
      }}
    >
      <div
        style={{
          background: "#000080",
          color: "white",
          padding: "2px 6px",
          fontSize: isTakeover ? "0.95rem" : "0.72rem",
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>{isTakeover ? "SYSTEM FAILURE" : "IF789 ERROR"}</span>
        <WindowCloseButton />
      </div>

      <div style={{ padding: isTakeover ? "28px 32px 30px" : "11px", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: isTakeover ? 34 : 22,
            height: isTakeover ? 34 : 22,
            marginBottom: isTakeover ? 14 : 6,
            border: "2px solid black",
            fontSize: isTakeover ? "1.75rem" : "1.1rem",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          !
        </div>

        <div
          style={{
            fontSize: isTakeover ? "3.5rem" : "1.35rem",
            fontWeight: 900,
            letterSpacing: "-0.06em",
            lineHeight: 0.85,
          }}
        >
          IF789
        </div>

        {isTakeover && (
          <div style={{ marginTop: 16, fontSize: "0.85rem", letterSpacing: "0.08em" }}>
            TOO MANY WINDOWS OPENED
          </div>
        )}

        <button
          onClick={onEnter}
          style={{
            marginTop: isTakeover ? "24px" : "10px",
            padding: isTakeover ? "6px 20px" : "4px 10px",
            border: "1px solid black",
            background: "#c0c0c0",
            cursor: "pointer",
            boxShadow: "inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff",
            fontFamily: "inherit",
            fontWeight: 900,
          }}
        >
          ENTER
        </button>
      </div>
    </div>
  );
}

function MessageWindow() {
  return (
    <div
      style={{
        position: "absolute",
        top: "42%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(520px, calc(100vw - 32px))",
        background: "#c0c0c0",
        border: "2px solid black",
        boxShadow:
          "inset -2px -2px 0 #808080, inset 2px 2px 0 #ffffff, 8px 8px 0 rgba(0,0,0,0.65)",
        fontFamily: "'Share Tech Mono', 'OCR A Std', monospace",
        color: "black",
        zIndex: 200,
      }}
    >
      <div
        style={{
          background: "#000080",
          color: "white",
          padding: "3px 7px",
          fontSize: "0.9rem",
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>IF789 MESSAGE</span>
        <WindowCloseButton />
      </div>

      <div style={{ padding: "34px 32px", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 34,
            height: 34,
            marginBottom: 18,
            border: "2px solid black",
            fontSize: "1.75rem",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          !
        </div>

        <div
          style={{
            fontSize: "clamp(2.4rem, 8vw, 4.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.06em",
            lineHeight: 0.9,
          }}
        >
          IF789
        </div>

        <div style={{ marginTop: 18, fontSize: "1rem", letterSpacing: "0.1em", fontWeight: 900 }}>
          COMING SOON
        </div>
      </div>
    </div>
  );
}

function CountdownWindow({ countdown, justKidding }: { countdown: number; justKidding: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "64%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(430px, calc(100vw - 40px))",
        background: "#c0c0c0",
        border: "2px solid black",
        boxShadow:
          "inset -2px -2px 0 #808080, inset 2px 2px 0 #ffffff, 6px 6px 0 rgba(0,0,0,0.65)",
        fontFamily: "'Share Tech Mono', 'OCR A Std', monospace",
        color: "black",
        zIndex: 210,
      }}
    >
      <div
        style={{
          background: "#000080",
          color: "white",
          padding: "3px 7px",
          fontSize: "0.85rem",
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>{justKidding ? "IF789 NOTICE" : "CRITICAL ERROR"}</span>
        <WindowCloseButton />
      </div>

      <div style={{ padding: "24px", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 30,
            height: 30,
            marginBottom: 14,
            border: "2px solid black",
            fontSize: "1.5rem",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          !
        </div>

        <div style={{ fontSize: "1rem", letterSpacing: "0.08em", fontWeight: 900 }}>
          {justKidding ? "JUST KIDDING" : `SELF-DESTRUCTING IN ${countdown} SECONDS`}
        </div>
      </div>
    </div>
  );
}

function FileExplorer() {
  const [activeTab, setActiveTab] = useState("Downloads");
  const [currentFolder, setCurrentFolder] = useState("Downloads");
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(760px, calc(100vw - 36px))",
        height: "min(520px, calc(100vh - 36px))",
        background: "#c0c0c0",
        border: "2px solid black",
        boxShadow:
          "inset -2px -2px 0 #808080, inset 2px 2px 0 #ffffff, 10px 10px 0 rgba(0,0,0,0.7)",
        fontFamily: "'Share Tech Mono', 'OCR A Std', monospace",
        color: "black",
        zIndex: 300,
      }}
    >
      <div
        style={{
          height: 28,
          background: "#000080",
          color: "white",
          padding: "3px 7px",
          fontSize: "0.9rem",
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>File Explorer - Downloads</span>
        <WindowCloseButton />
      </div>

      <div style={{ display: "flex", height: "calc(100% - 28px)" }}>
        <aside
          style={{
            width: 190,
            borderRight: "2px solid #808080",
            padding: 10,
            background: "#d6d6d6",
            boxShadow: "inset -1px -1px 0 #ffffff, inset 1px 1px 0 #808080",
            fontSize: "0.8rem",
          }}
        >
          {["Desktop", "Documents", "Downloads", "Pictures", "Music", "Recycle Bin"].map((item) => (
            <div
              key={item}
              onClick={() => {
                setActiveTab(item);
                setCurrentFolder(item);
              }}
              style={{
                padding: "7px 8px",
                marginBottom: 4,
                cursor: "pointer",
                background: activeTab === item ? "#000080" : "transparent",
                color: activeTab === item ? "white" : "black",
                border: activeTab === item ? "1px dotted white" : "1px solid transparent",
              }}
            >
              {item}
            </div>
          ))}
        </aside>

        <section style={{ flex: 1, padding: 12 }}>
          <div
            style={{
              marginBottom: 10,
              padding: "6px 8px",
              background: "white",
              border: "2px solid black",
              boxShadow: "inset -2px -2px 0 #ffffff, inset 2px 2px 0 #808080",
              fontSize: "0.8rem",
            }}
          >
            C:\Users\IF789\{currentFolder}
          </div>

          <div
            style={{
              height: "calc(100% - 42px)",
              background: "white",
              border: "2px solid black",
              boxShadow: "inset -2px -2px 0 #ffffff, inset 2px 2px 0 #808080",
              padding: 18,
            }}
          >
            {currentFolder === "Downloads" && (
            <div onDoubleClick={() => setCurrentFolder("shop")} style={{ width: 92, textAlign: "center", cursor: "pointer", userSelect: "none" }}>
              <div
                style={{
                  width: 54,
                  height: 38,
                  margin: "0 auto 8px",
                  background: "#f5d76e",
                  border: "2px solid black",
                  boxShadow: "inset -2px -2px 0 #b59b35, inset 2px 2px 0 #fff4a8",
                }}
              />
              <div style={{ fontSize: "0.82rem", fontWeight: 900 }}>shop</div>
            </div>
          )}

          {currentFolder === "shop" && (
            <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>empty folder</div>
          )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function App() {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [entered, setEntered] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [justKidding, setJustKidding] = useState(false);
  const [showExplorer, setShowExplorer] = useState(false);

  useEffect(() => {
    let count = 0;
    const maxWindows = 26;

    const interval = setInterval(() => {
      setWindows((prev) => {
        const cascade = count < 10;
        const baseX = 28;
        const baseY = 30;

        const next: WindowData = {
          id: Date.now() + count,
          x: cascade ? baseX + count * 24 : Math.random() * Math.max(1, window.innerWidth - 250),
          y: cascade ? baseY + count * 20 : Math.random() * Math.max(1, window.innerHeight - 145),
          type: count === maxWindows - 1 ? "takeover" : "normal",
        };

        return [...prev, next];
      });

      count++;
      if (count >= maxWindows) clearInterval(interval);
    }, 90);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!entered) return;

    setCountdown(5);
    setJustKidding(false);
    setShowExplorer(false);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setJustKidding(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [entered]);

  useEffect(() => {
    if (!justKidding) return;

    const timeout = setTimeout(() => {
      setShowExplorer(true);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [justKidding]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "black",
      }}
    >
      <MatrixRain />

      {!entered ? (
        windows.map((w, i) => <ErrorWindow key={w.id} data={w} index={i} onEnter={() => setEntered(true)} />)
      ) : (
        <>
          <MessageWindow />
          <CountdownWindow countdown={countdown} justKidding={justKidding} />
          {showExplorer && <FileExplorer />}
        </>
      )}
    </div>
  );
}
