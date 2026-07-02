import { useEffect, useRef, useCallback } from "react";

export default function CursorGlow() {
  const glowRef = useRef(null);
  const trailRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const trail = useRef({ x: -200, y: -200 });

  const update = useCallback(() => {
    const g = glowRef.current;
    const t = trailRef.current;
    if (!g || !t) return;
    pos.current.x += (trail.current.x - pos.current.x) * 0.08;
    pos.current.y += (trail.current.y - pos.current.y) * 0.08;
    g.style.transform = `translate(${pos.current.x - 150}px, ${pos.current.y - 150}px)`;
    t.style.transform = `translate(${trail.current.x - 8}px, ${trail.current.y - 8}px)`;
    requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      trail.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    requestAnimationFrame(update);
    return () => window.removeEventListener("mousemove", onMove);
  }, [update]);

  useEffect(() => {
    const g = glowRef.current;
    const t = trailRef.current;
    const onLeave = () => { if (g) g.style.opacity = "0"; if (t) t.style.opacity = "0"; };
    const onEnter = () => { if (g) g.style.opacity = "1"; if (t) t.style.opacity = "1"; };
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(15,106,107,0.08) 0%, rgba(213,138,106,0.04) 40%, transparent 70%)",
          transform: "translate(-150px, -150px)",
          willChange: "transform",
        }}
      />
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999]"
        style={{
          background: "radial-gradient(circle, rgba(15,106,107,0.3), rgba(213,138,106,0.15) 60%, transparent)",
          transform: "translate(-8px, -8px)",
          willChange: "transform",
          boxShadow: "0 0 12px rgba(15,106,107,0.2)",
        }}
      />
    </>
  );
}