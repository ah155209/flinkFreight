"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { useApp } from "@/contexts/AppContext";

type Crumb = { label: string; href: string };

export default function PageHero({
  title,
  subtitle,
  crumbs = [],
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  const { t } = useApp();

  return (
    /* Always dark regardless of site theme */
    <section className="relative overflow-hidden bg-[#0d1f3c] py-20 text-white">
      {/* Gradient — hardcoded so it never flips white in dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#0d2244] to-[#1a3a6e] opacity-95" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Diagonal speed-lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #FFDC39 0px, #FFDC39 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="container relative">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl font-extrabold text-white md:text-5xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-2xl text-lg text-slate-200"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 flex items-center gap-1 text-sm text-slate-300"
        >
          {/* <Link href="/" className="hover:text-accent">
            {t.breadcrumbHome}
          </Link> */}
          {/* {crumbs.map((c) => (
            <span key={c.href} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4" />
              <Link href={c.href} className="hover:text-accent">
                {c.label}
              </Link>
            </span>
          ))} */}
        </motion.nav>
      </div>
    </section>
  );
}
