"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroImage({ className }: { className?: string }) {
  const [usePng, setUsePng] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const res = await fetch("/email-marketing-hero.png", { method: "HEAD" });
        if (!cancelled && res.ok) setUsePng(true);
      } catch (_err) {
        // silently fall back to SVG
      }
    };
    check();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={className}>
      <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-primary/20">
        <Image
          src={usePng ? "/email-marketing-hero.png" : "/email-marketing-hero.svg"}
          alt="Email Marketing hero illustration"
          width={1280}
          height={720}
          priority
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}