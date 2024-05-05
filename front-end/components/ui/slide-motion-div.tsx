"use client";
import { AnimatePresence, Variants } from "framer-motion";
import { motion } from "framer-motion";

export const fadeIn = (
  direction: "left" | "right" | "up" | "down",
  type: "tween" | "spring" | "linear",
  delay: number,
  duration: number
): Variants => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

interface SlideMotionDivProps {
  children: React.ReactNode;
  fadeDirection?: "left" | "right" | "up" | "down";
  motionType?: "tween" | "spring" | "linear";
  delay?: number;
  duration?: number;
}

const SlideMotionDiv: React.FC<SlideMotionDivProps> = ({
  children,
  fadeDirection = "up",
  motionType = "tween",
  delay = 0,
  duration = 0.5,
}) => {
  const variants = fadeIn(fadeDirection, motionType, delay, duration);
  return (
    <motion.div initial="hidden" animate="show" variants={variants}>
      {children}
    </motion.div>
  );
};

export default SlideMotionDiv