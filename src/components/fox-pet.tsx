import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type FoxAction = "idle" | "walk-right" | "walk-left" | "sit" | "sleep" | "jump" | "love" | "wisdom";

type SpriteFrame = {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  anchorX: number;
  baselineY: number;
  targetX: number;
};

const SHEET_WIDTH = 1536;
const SHEET_HEIGHT = 1024;

function spriteFrame(
  left: number,
  top: number,
  right: number,
  bottom: number,
  scale: number,
  alignment: "left" | "center" | "right" = "center",
): SpriteFrame {
  const padding = 4;
  return {
    x: left - padding,
    y: top - padding,
    width: right - left + padding * 2,
    height: bottom - top + padding * 2,
    scale,
    anchorX: alignment === "left" ? left : alignment === "right" ? right : (left + right) / 2,
    baselineY: bottom,
    targetX: alignment === "left" ? 10 : alignment === "right" ? 146 : 78,
  };
}

// The generated poses have intentionally different silhouettes and margins.
// Each frame uses its measured alpha bounds so the fox stays centered and grounded.
const SPRITES: Record<FoxAction, SpriteFrame[]> = {
  idle: [
    spriteFrame(210, 17, 376, 238, 0.42),
    spriteFrame(528, 17, 695, 238, 0.42),
    spriteFrame(863, 17, 1035, 238, 0.42),
    spriteFrame(1192, 17, 1362, 238, 0.42),
  ],
  "walk-right": [
    spriteFrame(132, 280, 419, 456, 0.45, "right"),
    spriteFrame(462, 280, 735, 457, 0.45, "right"),
    spriteFrame(770, 280, 1072, 457, 0.45, "right"),
    spriteFrame(1115, 280, 1393, 457, 0.45, "right"),
  ],
  "walk-left": [
    spriteFrame(132, 500, 420, 681, 0.45, "left"),
    spriteFrame(458, 500, 750, 681, 0.45, "left"),
    spriteFrame(799, 500, 1089, 681, 0.45, "left"),
    spriteFrame(1114, 500, 1406, 681, 0.45, "left"),
  ],
  sit: [spriteFrame(159, 733, 379, 952, 0.44)],
  sleep: [spriteFrame(492, 804, 743, 941, 0.5)],
  jump: [spriteFrame(813, 700, 1035, 974, 0.4)],
  love: [spriteFrame(1135, 706, 1346, 961, 0.41)],
  wisdom: [spriteFrame(1135, 706, 1346, 961, 0.41)],
};

const PET_WIDTH_DESKTOP = 156;
const PET_WIDTH_MOBILE = 126;

function petWidth() {
  return window.innerWidth <= 640 ? PET_WIDTH_MOBILE : PET_WIDTH_DESKTOP;
}

function clampPosition(position: number) {
  return Math.max(6, Math.min(position, window.innerWidth - petWidth() - 6));
}

function actionMessage(action: FoxAction) {
  if (action === "love") return "You found a friend!";
  if (action === "jump") return "Let’s explore!";
  if (action === "sleep") return "zzz";
  if (action === "sit") return "Watching the stars…";
  if (action === "wisdom") return "It is only with the heart that one can see rightly; what is essential is invisible to the eye.";
  return "";
}

export function FoxPet() {
  const [action, setAction] = useState<FoxAction>("walk-right");
  const [frame, setFrame] = useState(0);
  const [x, setX] = useState(24);
  const [isDragging, setIsDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const actionRef = useRef<FoxAction>(action);
  const xRef = useRef(x);
  const directionRef = useRef<"left" | "right">("right");
  const dragOffsetRef = useRef(0);
  const draggedRef = useRef(false);
  const reactionTimerRef = useRef<number | null>(null);

  const changeAction = useCallback((nextAction: FoxAction) => {
    actionRef.current = nextAction;
    setAction(nextAction);
    setFrame(0);
  }, []);

  const resumeWalking = useCallback(() => {
    changeAction(directionRef.current === "right" ? "walk-right" : "walk-left");
  }, [changeAction]);

  const react = useCallback((nextAction: "jump" | "love" | "wisdom") => {
    if (reactionTimerRef.current !== null) window.clearTimeout(reactionTimerRef.current);
    changeAction(nextAction);
    reactionTimerRef.current = window.setTimeout(() => {
      if (reducedMotion) changeAction("sit");
      else resumeWalking();
    }, nextAction === "jump" ? 900 : nextAction === "wisdom" ? 7200 : 1600);
  }, [changeAction, reducedMotion, resumeWalking]);

  useEffect(() => {
    actionRef.current = action;
  }, [action]);

  useEffect(() => {
    xRef.current = x;
  }, [x]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      setReducedMotion(media.matches);
      if (media.matches) changeAction("sit");
    };
    syncMotion();
    media.addEventListener("change", syncMotion);
    return () => media.removeEventListener("change", syncMotion);
  }, [changeAction]);

  useEffect(() => {
    const handleResize = () => setX((current) => clampPosition(current));
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let previous = performance.now();
    let animationFrame: number;

    const move = (now: number) => {
      const deltaSeconds = Math.min((now - previous) / 1000, 0.1);
      previous = now;
      if (!document.hidden && !isDragging && actionRef.current.startsWith("walk")) {
        const velocity = directionRef.current === "right" ? 34 : -34;
        const next = clampPosition(xRef.current + velocity * deltaSeconds);
        const maximum = window.innerWidth - petWidth() - 6;

        if (next >= maximum) {
          directionRef.current = "left";
          changeAction("walk-left");
        } else if (next <= 6) {
          directionRef.current = "right";
          changeAction("walk-right");
        }

        xRef.current = next;
        setX(next);
      }
      animationFrame = window.requestAnimationFrame(move);
    };

    animationFrame = window.requestAnimationFrame(move);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [changeAction, isDragging, reducedMotion]);

  useEffect(() => {
    const frameTimer = window.setInterval(() => {
      const frames = SPRITES[actionRef.current];
      if (frames.length > 1 && !document.hidden) setFrame((current) => (current + 1) % frames.length);
    }, 150);
    return () => window.clearInterval(frameTimer);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let activityTimer: number;
    let resumeTimer: number;

    const scheduleActivity = () => {
      activityTimer = window.setTimeout(() => {
        if (!isDragging && actionRef.current.startsWith("walk")) {
          const roll = Math.random();
          const nextAction: FoxAction = roll > 0.86 ? "wisdom" : roll > 0.7 ? "sleep" : roll > 0.42 ? "sit" : "idle";
          changeAction(nextAction);
          resumeTimer = window.setTimeout(resumeWalking, nextAction === "wisdom" ? 7200 : nextAction === "sleep" ? 4200 : 2300);
        }
        scheduleActivity();
      }, 7000 + Math.random() * 5000);
    };

    scheduleActivity();
    return () => {
      window.clearTimeout(activityTimer);
      window.clearTimeout(resumeTimer);
    };
  }, [changeAction, isDragging, reducedMotion, resumeWalking]);

  useEffect(() => () => {
    if (reactionTimerRef.current !== null) window.clearTimeout(reactionTimerRef.current);
  }, []);

  function handlePointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    dragOffsetRef.current = event.clientX - xRef.current;
    draggedRef.current = false;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!isDragging) return;
    const next = clampPosition(event.clientX - dragOffsetRef.current);
    if (Math.abs(next - xRef.current) > 3) draggedRef.current = true;
    directionRef.current = next >= xRef.current ? "right" : "left";
    xRef.current = next;
    setX(next);
    changeAction(directionRef.current === "right" ? "walk-right" : "walk-left");
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!isDragging) return;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (draggedRef.current) react("jump");
  }

  const frames = SPRITES[action];
  const sprite = frames[frame % frames.length];
  const message = actionMessage(action);
  const quoteEdge = action !== "wisdom"
    ? ""
    : x < 130
      ? "is-left-edge"
      : x > window.innerWidth - petWidth() - 130
        ? "is-right-edge"
        : "";

  return (
    <div className="fox-pet-layer" style={{ transform: `translate3d(${x}px, 0, 0)` }}>
      {message ? <span className={`fox-pet-bubble fox-pet-bubble-${action} ${quoteEdge}`} role="status" aria-live="polite">{message}</span> : null}
      <button
        type="button"
        className={`fox-pet ${isDragging ? "is-dragging" : ""}`}
        aria-label="Interactive fox pet. Click to pet it, click twice for a thought, or drag it along the screen."
        title="Pet me twice for a thought — or drag me along the screen"
        onClick={() => {
          if (!draggedRef.current) react(actionRef.current === "love" ? "wisdom" : "love");
          draggedRef.current = false;
        }}
        onDoubleClick={() => react("wisdom")}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => setIsDragging(false)}
      >
        <span className="fox-pet-sprite-stage" aria-hidden>
          <span className="fox-pet-sprite-rig">
            <span
              className="fox-pet-sprite"
              style={{
                left: `${sprite.targetX - (sprite.anchorX - sprite.x) * sprite.scale}px`,
                bottom: `${-(sprite.y + sprite.height - sprite.baselineY) * sprite.scale}px`,
                width: `${sprite.width * sprite.scale}px`,
                height: `${sprite.height * sprite.scale}px`,
                backgroundSize: `${SHEET_WIDTH * sprite.scale}px ${SHEET_HEIGHT * sprite.scale}px`,
                backgroundPosition: `${-sprite.x * sprite.scale}px ${-sprite.y * sprite.scale}px`,
              }}
            />
          </span>
        </span>
      </button>
    </div>
  );
}
