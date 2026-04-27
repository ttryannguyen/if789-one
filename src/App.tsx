import { useEffect, useRef, useState } from "react";

type WindowData = {
  id: number;
  x: number;
  y: number;
  type: "normal" | "takeover";
};

type DragData = {
  id: string;
  offsetX: number;
  offsetY: number;
};

function WindowsXpBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background: "black",
      }}
    >
      <img
        src="/window%20xp.png" // IMPORTANT: space encoded
        alt="Windows XP"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none", // allows clicking through
        }}
      />
    </div>
  );
}

function WindowCloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        height: 18,
        padding: 0,
        background: "#c0c0c0",
        border: "1px solid black",
        color: "black",
        cursor: "pointer",
        fontFamily: "inherit",
        fontWeight: 900,
        lineHeight: 1,
        position: "relative",
        zIndex: 999,
        pointerEvents: "auto",
        boxShadow: "inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff",
      }}
    >
      ×
    </button>
  );
}

function ErrorWindow({
  data,
  index,
  onEnter,
  onDragStart,
}: {
  data: WindowData;
  index: number;
  onEnter: () => void;
  onDragStart: (id: number, e: React.MouseEvent) => void;
}) {
  const isTakeover = data.type === "takeover";

  return (
    <div
      style={{
        position: "absolute",
        top: data.y,
        left: data.x,
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
        onMouseDown={(e) => onDragStart(data.id, e)}
        style={{
          background: "#000080",
          color: "white",
          padding: "2px 6px",
          fontSize: isTakeover ? "0.95rem" : "0.72rem",
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "move",
          userSelect: "none",
        }}
      >
        <span>{isTakeover ? "SYSTEM FAILURE" : "IF789 ERROR"}</span>
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

function MessageWindow({ onClose }: { onClose: () => void }) {
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
        <WindowCloseButton onClick={onClose} />
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

function DesktopExplorerShortcut({ onOpen }: { onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      style={{
        position: "absolute",
        left: 26,
        top: 24,
        width: 92,
        textAlign: "center",
        color: "white",
        fontFamily: "'Share Tech Mono', 'OCR A Std', monospace",
        fontWeight: 900,
        textShadow: "1px 1px 2px black",
        cursor: "pointer",
        zIndex: 150,
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: 52,
          height: 38,
          margin: "0 auto 6px",
          background: "#f5d76e",
          border: "2px solid black",
          boxShadow: "inset -2px -2px 0 #b59b35, inset 2px 2px 0 #fff4a8",
        }}
      />
      <div style={{ fontSize: "0.78rem" }}>File Explorer</div>
    </div>
  );
}

function Taskbar({
  onOpenExplorer,
  explorerOpen,
  explorerUnlocked,
}: {
  onOpenExplorer: (folder?: string) => void;
  explorerOpen: boolean;
  explorerUnlocked: boolean;
}) {
  const [startOpen, setStartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const date = now.toLocaleDateString([], { month: "numeric", day: "numeric", year: "2-digit" });
  const cleanQuery = query.toLowerCase().trim();
  const searchResults = [
    { label: "File Explorer", folder: "Downloads", keywords: "file explorer files" },
    { label: "Downloads", folder: "Downloads", keywords: "downloads download" },
    { label: "shop", folder: "shop", keywords: "shop store products" },
  ].filter((item) => cleanQuery === "" || item.label.toLowerCase().includes(cleanQuery) || item.keywords.includes(cleanQuery));

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 38,
        background: "#245edb",
        borderTop: "2px solid #6aa0ff",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
        display: "flex",
        alignItems: "center",
        fontFamily: "'Share Tech Mono', 'OCR A Std', monospace",
        zIndex: 500,
      }}
    >
      {startOpen && (
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 38,
            width: 310,
            background: "#c0c0c0",
            border: "2px solid black",
            boxShadow: "inset -2px -2px 0 #808080, inset 2px 2px 0 #ffffff, 6px 6px 0 rgba(0,0,0,0.55)",
            color: "black",
          }}
        >
          <div
            style={{
              background: "#000080",
              color: "white",
              padding: "7px 10px",
              fontWeight: 900,
              fontSize: "0.9rem",
            }}
          >
            IF789 START
          </div>

          <div style={{ padding: 10 }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search files..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "7px 8px",
                border: "2px solid black",
                background: "white",
                fontFamily: "inherit",
                fontSize: "0.8rem",
                boxShadow: "inset -2px -2px 0 #ffffff, inset 2px 2px 0 #808080",
              }}
            />

            <div style={{ marginTop: 10 }}>
              {searchResults.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  disabled={!explorerUnlocked}
                  onClick={() => {
                    if (!explorerUnlocked) return;
                    onOpenExplorer(item.folder);
                    setStartOpen(false);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px",
                    marginBottom: 6,
                    border: "1px dotted black",
                    background: explorerUnlocked ? "white" : "#d6d6d6",
                    color: explorerUnlocked ? "black" : "#777",
                    cursor: explorerUnlocked ? "pointer" : "not-allowed",
                    fontFamily: "inherit",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 20,
                      background: "#f5d76e",
                      border: "2px solid black",
                      boxShadow: "inset -1px -1px 0 #b59b35, inset 1px 1px 0 #fff4a8",
                    }}
                  />
                  <span>{explorerUnlocked ? item.label : `${item.label} locked`}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setStartOpen((v) => !v)}
        style={{
          height: 32,
          marginLeft: 4,
          padding: "0 14px",
          border: "2px solid #0c3b8f",
          borderRadius: "0 10px 10px 0",
          background: "linear-gradient(#4bd34b, #138a13)",
          color: "white",
          fontWeight: 900,
          fontFamily: "inherit",
          textShadow: "1px 1px 1px black",
          cursor: "pointer",
        }}
      >
        start
      </button>

      {explorerOpen && (
        <button
          type="button"
          onClick={() => onOpenExplorer()}
          style={{
            height: 28,
            marginLeft: 8,
            padding: "0 12px",
            minWidth: 160,
            border: "1px solid #123c91",
            background: "#3c77e8",
            color: "white",
            fontFamily: "inherit",
            fontWeight: 900,
            textAlign: "left",
            boxShadow: "inset -1px -1px 0 #174aa8, inset 1px 1px 0 #8fb7ff",
            cursor: "pointer",
          }}
        >
          ▣ File Explorer
        </button>
      )}

      <div style={{ marginLeft: "auto", height: "100%", display: "flex", alignItems: "center" }}>
        <div
          style={{
            height: "100%",
            minWidth: 92,
            padding: "0 10px",
            background: "#0b8be8",
            borderLeft: "1px solid #6bbcff",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.68rem",
            lineHeight: 1.1,
            textShadow: "1px 1px 1px black",
            boxSizing: "border-box",
          }}
        >
          <div>{time}</div>
          <div>{date}</div>
        </div>
      </div>
    </div>
  );
}

function GameWindow({ onClose }: { onClose: () => void }) {
  const [score, setScore] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [obstacleX, setObstacleX] = useState(430);
  const [gameOver, setGameOver] = useState(false);

  const playerYRef = useRef(0);
  const velocityRef = useRef(0);

  // 🟢 NEW JUMP (gravity based)
  const jump = () => {
    if (gameOver) return;

    if (playerYRef.current === 0) {
      velocityRef.current = 16;
    }
  };

  // ⌨️ keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault();
      jump();
    };

    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [gameOver]);

  // 🌍 GRAVITY LOOP
  useEffect(() => {
    if (gameOver) return;

    const gravity = setInterval(() => {
      velocityRef.current -= .9;

      let nextY = playerYRef.current + velocityRef.current;

      if (nextY <= 0) {
        nextY = 0;
        velocityRef.current = 0;
      }

      playerYRef.current = nextY;
      setPlayerY(nextY);
    }, 16);

    return () => clearInterval(gravity);
  }, [gameOver]);

  // 🚧 OBSTACLES + SPEED SCALE
  useEffect(() => {
    if (gameOver) return;

    const loop = setInterval(() => {
      setObstacleX((prev) => {
        let next = prev - (6 + score * 0.4); // 🔥 speed scaling

        const playerLeft = 70;
        const playerRight = 104;
        const obstacleLeft = next;
        const obstacleRight = next + 22;

        const isTouchingX =
          obstacleRight > playerLeft && obstacleLeft < playerRight;

        const playerLowEnoughToHit = playerYRef.current < 28;

        if (isTouchingX && playerLowEnoughToHit) {
          setGameOver(true);
          return next;
        }

        if (next < -30) {
          setScore((s) => s + 1);
          next = 430 + Math.random() * 80;
        }

        return next;
      });
    }, 35);

    return () => clearInterval(loop);
  }, [gameOver, score]);

  const resetGame = () => {
    setScore(0);
    setObstacleX(430);
    setPlayerY(0);
    playerYRef.current = 0;
    velocityRef.current = 0;
    setGameOver(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(520px, calc(100vw - 32px))",
        background: "#c0c0c0",
        border: "2px solid black",
        boxShadow:
          "inset -2px -2px 0 #808080, inset 2px 2px 0 #ffffff, 8px 8px 0 rgba(0,0,0,0.65)",
        fontFamily: "'Share Tech Mono', 'OCR A Std', monospace",
        color: "black",
        zIndex: 360,
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
          justifyContent: "space-between",
        }}
      >
        <span>game.exe</span>
        <WindowCloseButton onClick={onClose} />
      </div>

      <div style={{ padding: 16 }}>
        <div
          tabIndex={0}
          onClick={(e) => {
            e.currentTarget.focus();
            jump();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            jump();
          }}
          style={{
            height: 230,
            background: "black",
            border: "2px solid black",
            position: "relative",
            overflow: "hidden",
            color: "#00ff66",
          }}
        >
          <div style={{ position: "absolute", top: 10, left: 12 }}>
            SCORE: {score}
          </div>

          {/* PLAYER */}
          <div
            style={{
              position: "absolute",
              left: 70,
              bottom: 48 + playerY,
              width: 34,
              height: 34,
              background: gameOver ? "red" : "#00ff66",
            }}
          />

          {/* OBSTACLE */}
          <div
            style={{
              position: "absolute",
              left: obstacleX,
              bottom: 48,
              width: 22,
              height: 38,
              background: "#00ff66",
            }}
          />

          {/* GROUND */}
          <div
            style={{
              position: "absolute",
              bottom: 42,
              height: 2,
              width: "100%",
              background: "#00ff66",
            }}
          />

          {gameOver && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.7)",
              }}
            >
              <div>GAME OVER</div>
              <button onClick={resetGame}>RESTART</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FileExplorer({ onClose, startFolder = "Downloads", onOpenGame }: { onClose: () => void; startFolder?: string; onOpenGame: () => void }) {
  const [activeTab, setActiveTab] = useState(startFolder === "shop" ? "Downloads" : startFolder);
  const [currentFolder, setCurrentFolder] = useState(startFolder);
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const fileDragRef = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!fileDragRef.current.dragging) return;
      setPosition({
        x: e.clientX - fileDragRef.current.offsetX,
        y: e.clientY - fileDragRef.current.offsetY,
      });
    };

    const up = () => {
      fileDragRef.current.dragging = false;
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  const startFileDrag = (e: React.MouseEvent) => {
    if (isMobile) return;
    fileDragRef.current = {
      dragging: true,
      offsetX: e.clientX - position.x,
      offsetY: e.clientY - position.y,
    };
  };

  useEffect(() => {
    setCurrentFolder(startFolder);
    setActiveTab(startFolder === "shop" ? "Downloads" : startFolder);
  }, [startFolder]);

  const folders = ["Desktop", "Documents", "Downloads", "Pictures", "Music", "Recycle Bin"];

  return (
    <div
      style={{
        position: "absolute",
        top: isMobile ? "50%" : position.y,
        left: isMobile ? "50%" : position.x,
        transform: "translate(-50%, -50%)",
        width: isMobile ? "90vw" : "min(760px, calc(100vw - 36px))",
        height: isMobile ? "80vh" : "min(520px, calc(100vh - 36px))",
        borderRadius: isMobile ? 10 : 0,
        background: "#c0c0c0",
        border: "2px solid black",
        boxSizing: "border-box",
        boxShadow: isMobile
        ? "0 8px 30px rgba(0,0,0,0.5)"
        : "inset -2px -2px 0 #808080, inset 2px 2px 0 #ffffff, 10px 10px 0 rgba(0,0,0,0.7)",
        fontFamily: "'Share Tech Mono', 'OCR A Std', monospace",
        color: "black",
        zIndex: 300,
        overflow: "hidden",
      }}
    >
      <div
        onMouseDown={startFileDrag}
        style={{
          height: 28,
          background: "#000080",
          color: "white",
          padding: "3px 7px",
          fontSize: isMobile ? "0.72rem" : "0.9rem",
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
          cursor: isMobile ? "default" : "move",
          userSelect: "none",
        }}
      >
        <span>{`File Explorer - ${currentFolder}`}</span>
        <WindowCloseButton onClick={onClose} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: "calc(100% - 28px)",
          minHeight: 0,
        }}
      >
        <aside
          style={{
            width: isMobile ? "100%" : 190,
            height: isMobile ? 86 : "auto",
            flexShrink: 0,
            borderRight: isMobile ? "none" : "2px solid #808080",
            borderBottom: isMobile ? "2px solid #808080" : "none",
            padding: 8,
            background: "#d6d6d6",
            boxSizing: "border-box",
            boxShadow: "inset -1px -1px 0 #ffffff, inset 1px 1px 0 #808080",
            fontSize: isMobile ? "0.68rem" : "0.8rem",
            display: isMobile ? "grid" : "block",
            gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : undefined,
            gap: isMobile ? 4 : undefined,
            overflow: "auto",
          }}
        >
          {folders.map((item) => (
            <div
              key={item}
              onClick={() => {
                setActiveTab(item);
                setCurrentFolder(item);
              }}
              style={{
                padding: isMobile ? "6px 4px" : "7px 8px",
                marginBottom: isMobile ? 0 : 4,
                cursor: "pointer",
                background: activeTab === item ? "#000080" : "transparent",
                color: activeTab === item ? "white" : "black",
                border: activeTab === item ? "1px dotted white" : "1px solid transparent",
                textAlign: isMobile ? "center" : "left",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                boxSizing: "border-box",
              }}
            >
              {item}
            </div>
          ))}
        </aside>

        <section
          style={{
            flex: 1,
            minWidth: 0,
            padding: isMobile ? 8 : 12,
            minHeight: 0,
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              marginBottom: 8,
              padding: "6px 8px",
              background: "white",
              border: "2px solid black",
              boxShadow: "inset -2px -2px 0 #ffffff, inset 2px 2px 0 #808080",
              fontSize: isMobile ? "0.62rem" : "0.8rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              boxSizing: "border-box",
            }}
          >
            {`C:\\Users\\IF789\\${currentFolder}`}
          </div>

          <div
            style={{
              height: "calc(100% - 40px)",
              background: "white",
              border: "2px solid black",
              boxShadow: "inset -2px -2px 0 #ffffff, inset 2px 2px 0 #808080",
              padding: isMobile ? 12 : 18,
              boxSizing: "border-box",
              overflow: "auto",
            }}
          >
            {currentFolder === "Downloads" && (
  <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
    <div
      onClick={() => setCurrentFolder("shop")}
      style={{ width: 92, textAlign: "center", cursor: "pointer", userSelect: "none" }}
    >
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

    <div
      onClick={onOpenGame}
      style={{ width: 92, textAlign: "center", cursor: "pointer", userSelect: "none" }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          margin: "0 auto 8px",
          background: "#c0c0c0",
          border: "2px solid black",
          boxShadow: "inset -2px -2px 0 #808080, inset 2px 2px 0 #ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
        }}
      >
        EXE
      </div>
      <div style={{ fontSize: "0.82rem", fontWeight: 900 }}>game.exe</div>
    </div>
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
  const [showMessage, setShowMessage] = useState(true);
  const [showCountdown, setShowCountdown] = useState(true);
  const [showExplorer, setShowExplorer] = useState(false);
  const [explorerUnlocked, setExplorerUnlocked] = useState(false);
  const [explorerStartFolder, setExplorerStartFolder] = useState("Downloads");
  const [showGame, setShowGame] = useState(false);
  const dragRef = useRef<DragData | null>(null);

  useEffect(() => {
    let count = 0;
    const maxWindows = 26;

    const interval = setInterval(() => {
      setWindows((prev) => {
        const cascade = count < 10;
        const baseX = 28;
        const baseY = 30;
        const isTakeover = count === maxWindows - 1;

        const next: WindowData = {
          id: Date.now() + count,
          x: isTakeover
            ? Math.max(16, window.innerWidth / 2 - 320)
            : cascade
              ? baseX + count * 24
              : Math.random() * Math.max(1, window.innerWidth - 250),
          y: isTakeover
            ? Math.max(16, window.innerHeight / 2 - 140)
            : cascade
              ? baseY + count * 20
              : Math.random() * Math.max(1, window.innerHeight - 145),
          type: isTakeover ? "takeover" : "normal",
        };

        return [...prev, next];
      });

      count++;
      if (count >= maxWindows) clearInterval(interval);
    }, 90);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;

      const { id, offsetX, offsetY } = dragRef.current;

      setWindows((prev) =>
        prev.map((win) =>
          String(win.id) === id
            ? { ...win, x: e.clientX - offsetX, y: e.clientY - offsetY }
            : win
        )
      );
    };

    const onMouseUp = () => {
      dragRef.current = null;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (!entered) return;
  
    setCountdown(5);
    setJustKidding(false);
    setShowMessage(true);
    setShowCountdown(false); // ⬅️ start hidden
    setShowExplorer(false);
    setExplorerUnlocked(false);
    setExplorerStartFolder("Downloads");
  
    // ⬇️ wait 1 second after COMING SOON appears
    const delayStart = setTimeout(() => {
      setShowCountdown(true);
  
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
    }, 1000); // ⬅️ THIS is the 1 second delay
  
    return () => clearTimeout(delayStart);
  }, [entered]);

  useEffect(() => {
    if (!justKidding) return;

    // show explorer after message
    const openExplorer = setTimeout(() => {
      setExplorerStartFolder("Downloads");
      setShowExplorer(true);
      setExplorerUnlocked(true);
      setShowMessage(false);
    }, 1200);

    // hide countdown window after "just kidding"
    const hideCountdown = setTimeout(() => {
      setShowCountdown(false);
    }, 1800);

    return () => {
      clearTimeout(openExplorer);
      clearTimeout(hideCountdown);
    };
  }, [justKidding]);

  const startDrag = (id: number, e: React.MouseEvent) => {
    const win = windows.find((item) => item.id === id);
    if (!win) return;

    dragRef.current = {
      id: String(id),
      offsetX: e.clientX - win.x,
      offsetY: e.clientY - win.y,
    };
  };

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
      <WindowsXpBackground />

      {entered && explorerUnlocked && (
        <DesktopExplorerShortcut onOpen={() => setShowExplorer(true)} />
      )}

      {entered && explorerUnlocked && (
        <Taskbar
          onOpenExplorer={(folder) => {
            setExplorerStartFolder(folder || "Downloads");
            setShowExplorer(true);
          }}
          explorerOpen={showExplorer}
          explorerUnlocked={explorerUnlocked}
        />
      )}

      {!entered ? (
        windows.map((w, i) => (
          <ErrorWindow
            key={w.id}
            data={w}
            index={i}
            onEnter={() => setEntered(true)}
            onDragStart={startDrag}
          />
        ))
      ) : (
        <>
          {showMessage && <MessageWindow onClose={() => setShowMessage(false)} />}
          {showCountdown && <CountdownWindow countdown={countdown} justKidding={justKidding} />}
          {showExplorer && (
            <FileExplorer
              startFolder={explorerStartFolder}
              onClose={() => setShowExplorer(false)}
              onOpenGame={() => setShowGame(true)}
            />
          )}
          {showGame && <GameWindow onClose={() => setShowGame(false)} />}
        
        </>
      )}
    </div>
  );
}
