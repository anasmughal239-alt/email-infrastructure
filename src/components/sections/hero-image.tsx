"use client";

import Image from "next/image";

export function HeroImage({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-primary/20">
        <Image
          src="/email-marketing-hero.svg"
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