"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * HoverLift — a reusable hover micro-interaction that lifts and slightly
 * scales its child. Use to wrap cards and tiles for a tactile feel.
 */
export default function HoverLift({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
