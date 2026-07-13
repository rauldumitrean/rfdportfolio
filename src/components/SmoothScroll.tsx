"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Disable smooth scrolling on the Sanity Studio admin route
  if (pathname?.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
