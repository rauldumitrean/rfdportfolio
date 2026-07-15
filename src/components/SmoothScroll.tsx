"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Disable smooth scrolling on the Sanity Studio admin route or on Mobile
  if (pathname?.startsWith("/studio") || isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
