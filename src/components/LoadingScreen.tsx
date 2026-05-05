import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Initializing...');

  const loadingTexts = [
    'Loading Templates...',
    'Preparing 1000+ Designs...',
    'Setting up Magic...',
    'Almost Ready...',
    'Welcome to Template Builder!',
  ];

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
      setProgress(Math.min(currentProgress, 100));
      const textIndex = Math.min(
        Math.floor((currentProgress / 100) * loadingTexts.length),
        loadingTexts.length - 1
      );
      setText(loadingTexts[textIndex]);
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -50, transition: { duration: 0.5, ease: 'easeInOut' } }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #0f0f23)' }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-purple-500/30"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              animate={{
                y: [null, -100, 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <motion.div
              className="absolute -inset-2 rounded-2xl border-2 border-purple-500/30"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
              Template{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Builder
              </span>
            </h1>
            <p className="text-white/50 text-sm">1000+ Templates Ready to Deploy</p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            transition={{ delay: 0.5 }}
            className="w-72"
          >
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/50">
              <span className="flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                {text}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom decorative elements */}
        <motion.div
          className="absolute bottom-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex gap-4 text-white/30 text-xs">
            <span>Gaming</span>
            <span>Business</span>
            <span>Portfolio</span>
            <span>E-Commerce</span>
            <span>+16 More</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
