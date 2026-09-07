'use client';

import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type FC } from 'react';

type ThemeConfig = {
  bg: string;
  button: string;
  dot: string;
  progress: string;
};

interface CarouselNavigatorProps {
  totalSlides?: number;
  autoDelay?: number;
  themes?: ThemeConfig[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const DEFAULT_TOTAL_SLIDES = 4;
const DEFAULT_AUTO_DELAY = 5000;

const DEFAULT_THEMES: ThemeConfig[] = [
  {
    bg: '#0a0a0d',
    button: 'bg-white/10 hover:bg-white/20 border border-white/15',
    dot: 'bg-white/20',
    progress: 'bg-white',
  },
  {
    bg: '#0d080b',
    button: 'bg-white/10 hover:bg-white/20 border border-white/15',
    dot: 'bg-white/20',
    progress: 'bg-white',
  },
  {
    bg: '#070a0e',
    button: 'bg-white/10 hover:bg-white/20 border border-white/15',
    dot: 'bg-white/20',
    progress: 'bg-white',
  },
  {
    bg: '#0b0906',
    button: 'bg-white/10 hover:bg-white/20 border border-white/15',
    dot: 'bg-white/20',
    progress: 'bg-white',
  },
];

export const CarouselNavigator: FC<CarouselNavigatorProps> = ({
  totalSlides = DEFAULT_TOTAL_SLIDES,
  autoDelay = DEFAULT_AUTO_DELAY,
  themes = DEFAULT_THEMES,
  currentIndex,
  onIndexChange,
}) => {
  const theme = themes[currentIndex % themes.length];

  const goPrev = () =>
    onIndexChange((currentIndex - 1 + totalSlides) % totalSlides);

  const goNext = () => onIndexChange((currentIndex + 1) % totalSlides);

  return (
    <motion.div
      animate={{
        backgroundColor: theme.bg.replace('bg-[', '').replace(']', ''),
      }}
      className="flex items-center justify-center gap-1 rounded-full px-4 py-2.5 transition-colors duration-300 border border-white/10 backdrop-blur-md shadow-2xl shadow-black"
    >
      <ArrowButton
        onClick={goPrev}
        themeColor={theme.button}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </ArrowButton>

      <div className="flex items-center gap-2 px-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <Indicator
            key={i}
            isActive={i === currentIndex}
            theme={theme}
            autoDelay={autoDelay}
            onClick={() => onIndexChange(i)}
          />
        ))}
      </div>

      <ArrowButton
        onClick={goNext}
        themeColor={theme.button}
        disabled={currentIndex === totalSlides - 1}
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </ArrowButton>
    </motion.div>
  );
};

const ArrowButton = ({ children, onClick, themeColor, disabled }: any) => {
  return (
    <motion.button
      type="button"
      onClick={disabled ? undefined : onClick}
      whileTap={disabled ? undefined : { scale: 0.9 }}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-300 ${
        disabled
          ? 'bg-white/5 opacity-30 text-white/30 cursor-not-allowed border border-white/5'
          : `cursor-pointer ${themeColor}`
      }`}
    >
      {children}
    </motion.button>
  );
};

const Indicator = ({
  isActive,
  theme,
  autoDelay,
  onClick,
}: {
  isActive: boolean;
  theme: ThemeConfig;
  autoDelay: number;
  onClick: () => void;
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ borderRadius:24}}
      className={`relative h-3 cursor-pointer  focus:outline-none ${isActive ? `w-12 ${theme.progress}` : `w-3 ${theme.dot}`} transition-colors duration-300`}
    >
      {isActive && (
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: autoDelay / 1000, ease: 'linear' }}
          className="absolute inset-0 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        />
      )}
    </motion.button>
  );
};
