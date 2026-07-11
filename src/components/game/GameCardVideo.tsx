'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GameCardVideoProps {
  src?: string;
  posterGradient: string;
  isHovered: boolean;
}

export default function GameCardVideo({ src, posterGradient, isHovered }: GameCardVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!videoRef.current || !src) return;

    if (isHovered) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log('Autoplay was prevented or video failed to load:', error);
            setIsPlaying(false);
          });
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isHovered, src]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Fallback Static Gradient */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: posterGradient }}
      />

      {/* Video element */}
      {src && (
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isPlaying && isLoaded ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ transition: 'opacity 0.5s ease, transform 7s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      )}

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-bg-primary/20 pointer-events-none" />
    </div>
  );
}
