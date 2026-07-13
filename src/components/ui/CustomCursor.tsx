"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Return early if not on a device with a fine pointer (like desktop)
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Use GSAP quickTo for highly performant animations instead of setState
    const setCursorX = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const setCursorY = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    const setFollowerX = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
    const setFollowerY = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
      setFollowerX(e.clientX);
      setFollowerY(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        gsap.to(follower, { scale: 1.5, opacity: 0.5, duration: 0.3 });
      } else {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(follower, { scale: 1, opacity: 0.2, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    // Initial opacity
    gsap.set([cursor, follower], { opacity: 1, delay: 0.5 });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block opacity-0"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/40 bg-white/10 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 hidden md:block opacity-0 transition-colors"
      />
    </>
  );
}
