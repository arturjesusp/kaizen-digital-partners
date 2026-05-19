"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted]     = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible,  setIsVisible]  = useState(false);

  // Ref for the inner dot — we write style.transform directly, zero React overhead
  const dotRef = useRef<HTMLDivElement>(null);

  // Motion values feed the spring-driven outer ring only
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const rx = useSpring(mx, { stiffness: 400, damping: 35 });
  const ry = useSpring(my, { stiffness: 400, damping: 35 });

  useEffect(() => {
    if (!window.matchMedia("(any-hover: hover)").matches) return;
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      // Inner dot: raw DOM write — no React, no Framer Motion overhead
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      // Outer ring: feed spring motion values
      mx.set(e.clientX);
      my.set(e.clientY);

      if (!isVisible) setIsVisible(true);
    };

    // Event delegation for hover expansion
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      setIsHovering(!!t?.closest?.("a, button, [data-cursor-hover]"));
    };

    // Hide both elements the moment the pointer leaves the viewport
    const onLeave = () => {
      setIsVisible(false);
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      setIsVisible(true);
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  // mx / my are stable MotionValue refs; isVisible intentionally omitted
  // so the closure captures setIsVisible (stable) without re-registering listeners
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mx, my]);

  if (!mounted) return null;

  return (
    /* mix-blend-mode:difference inverts white elements against any background —
       dot and ring stay white; the blend layer auto-renders them dark on light
       backgrounds and white on dark backgrounds with zero theme-state wiring. */
    <div
      className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference"
      aria-hidden
    >
      {/* ── Inner dot — white; blend mode handles contrast inversion ──────── */}
      <div
        ref={dotRef}
        className="pointer-events-none absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-white"
        style={{
          transform:   "translate3d(-200px, -200px, 0)",
          marginLeft:  "-3px",
          marginTop:   "-3px",
          opacity:     0,
          willChange:  "transform",
        }}
      />

      {/* ── Outer ring — white border; blend mode auto-inverts ────────────── */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 h-7 w-7 rounded-full border-2 border-white bg-transparent"
        style={{
          x:           rx,
          y:           ry,
          marginLeft:  "-14px",
          marginTop:   "-14px",
          willChange:  "transform",
        }}
        animate={{
          scale:   isHovering ? 1.5 : 1,
          opacity: isVisible  ? 1   : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </div>
  );
}
