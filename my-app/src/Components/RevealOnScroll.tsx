"use client";

import React from "react";
import { motion } from "motion/react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  className?: string;
}

export default function RevealOnScroll({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: RevealOnScrollProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50 };
      case "down":
        return { opacity: 0, y: -50 };
      case "left":
        return { opacity: 0, x: 50 };
      case "right":
        return { opacity: 0, x: -50 };
      case "fade":
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.25, 0, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
