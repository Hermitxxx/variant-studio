'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface RevealWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: boolean;
  className?: string;
  threshold?: number;
}

export function RevealWrapper({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 40,
  blur = true,
  className = '',
  threshold = 0.15,
  ...rest
}: RevealWrapperProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        filter: blur ? 'blur(10px)' : 'none',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default RevealWrapper;
