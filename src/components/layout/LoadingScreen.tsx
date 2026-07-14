'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Box, Gamepad2 } from 'lucide-react';
import styles from './LoadingScreen.module.css';

const LOAD_DURATION = 600;
const EXIT_DELAY = 40;

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min((now - startedAt) / LOAD_DURATION, 1);
      const eased = 1 - Math.pow(1 - elapsed, 2.35);
      setProgress(Math.min(100, Math.floor(eased * 100)));

      if (elapsed < 1) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      setProgress(100);
      exitTimer = setTimeout(() => setLoading(false), EXIT_DELAY);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      if (exitTimer) clearTimeout(exitTimer);
    };
  }, []);

  useEffect(() => {
    if (!loading) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={styles.screen}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025, filter: 'blur(8px)' }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-label={`Loading game portfolio: ${progress}%`}
          aria-live="polite"
        >
          <div className={styles.spaceGlow} aria-hidden="true" />
          <div className={styles.starsFar} aria-hidden="true" />
          <div className={styles.starsNear} aria-hidden="true" />
          <div className={styles.floor} aria-hidden="true" />
          <div className={styles.scanline} aria-hidden="true" />

          <div className={styles.topHud} aria-hidden="true"><i /><i /><i /></div>
          <div className={`${styles.topHud} ${styles.topHudRight}`} aria-hidden="true">
            <i /><i /><i />
          </div>
          <div className={styles.sideHudLeft} aria-hidden="true" />
          <div className={styles.sideHudRight} aria-hidden="true" />

          <motion.div
            className={styles.console}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.hudStage} aria-hidden="true">
              <div className={`${styles.orbit} ${styles.orbitOuter}`} />
              <div className={`${styles.orbit} ${styles.orbitMiddle}`} />
              <div className={`${styles.orbit} ${styles.orbitInner}`} />
              <div className={styles.hudAxis} />
              <div className={styles.hudWingLeft} />
              <div className={styles.hudWingRight} />

              <motion.div
                className={styles.logoHalo}
                animate={{ scale: [0.96, 1.04, 0.96], opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className={styles.logoCard}>
                <div className={styles.logoInner}>
                  <Gamepad2 className={styles.gamepad} strokeWidth={1.8} />
                </div>
              </div>
            </div>

            <div className={styles.copy}>
              <h1>
                <span>DUY.</span><span className={styles.dev}>DEV</span><span className={styles.dot}>.</span>
              </h1>
              <p>Loading Game Portfolio...</p>
            </div>

            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              >
                <span className={styles.progressSpark} />
              </div>
            </div>

            <p className={styles.percentage}>{progress}%</p>

            <div className={styles.statusLine}>
              <span className={styles.statusIcon} aria-hidden="true">
                <Box size={17} strokeWidth={1.7} />
              </span>
              <span>Preparing playable ads, games, and tech stack</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
