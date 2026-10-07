"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Карточка первого экрана «выпрямляется» при загрузке, как у референса.
export function HeroCard({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <div className="[perspective:1400px]">
      <motion.div
        initial={
          reduce ? false : { opacity: 0, rotateX: 14, rotateZ: -2, y: 40 }
        }
        animate={{ opacity: 1, rotateX: 0, rotateZ: 0, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[28px] bg-[var(--f-card)] px-5 pb-8 pt-10 sm:px-10 md:rounded-[36px] md:px-16 md:pb-14 md:pt-16"
      >
        {children}
      </motion.div>
    </div>
  );
}
