"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo — uses the official Flink Freight PNG.
 * Two versions are served:
 *   /logo.png       — transparent, dark elements (for light backgrounds)
 *   /logo-light.png — transparent, white elements (for dark backgrounds)
 *
 * `tone="light"` forces the light variant (e.g. footer).
 * `tone="dark"` auto-switches between variants based on the `.dark` class.
 */
export default function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  if (tone === "light") {
    return (
      <Link href="/" className={cn("inline-flex items-center", className)}>
        <Image
          src="/logo-light.png"
          alt="Flink Freight Logistics"
          width={160}
          height={63}
          priority
          className="h-12 w-auto object-contain"
        />
      </Link>
    );
  }

  return (
    <Link href="/" className={cn("inline-flex items-center", className)}>
      {/* Dark elements — shown on light backgrounds */}
      <Image
        src="/logo.png"
        alt="Flink Freight Logistics"
        width={160}
        height={63}
        priority
        className="block h-12 w-auto object-contain dark:hidden"
      />
      {/* White elements — shown on dark backgrounds */}
      <Image
        src="/logo-light.png"
        alt="Flink Freight Logistics"
        width={160}
        height={63}
        priority
        className="hidden h-12 w-auto object-contain dark:block"
      />
    </Link>
  );
}
