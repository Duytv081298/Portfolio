'use client';

import { useEffect, useRef } from 'react';

const SECTIONS = ['hero', 'playable', 'games', 'tech', 'career', 'contact'];
const SCROLL_COOLDOWN = 900; // Lock duration in ms (slightly shorter than scroll duration for responsiveness)

export default function ScrollSnapController() {
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    // Only hijack scroll snap on desktop layout sizes
    const isDesktop = () => window.innerWidth >= 1024;

    const getSectionIndex = () => {
      let activeIndex = 0;
      let minDistance = Infinity;

      SECTIONS.forEach((id, index) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            activeIndex = index;
          }
        }
      });

      return activeIndex;
    };

    const scrollToSection = (index: number) => {
      if (index < 0 || index >= SECTIONS.length) return;

      const targetEl = document.getElementById(SECTIONS[index]);
      if (targetEl) {
        isScrolling.current = true;
        lastScrollTime.current = Date.now();

        // 80px fixed header offset
        const headerOffset = 80;
        const targetTop = window.scrollY + targetEl.getBoundingClientRect().top - headerOffset;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });

        setTimeout(() => {
          isScrolling.current = false;
        }, SCROLL_COOLDOWN);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isDesktop()) return;

      // Prevent jerky native browser scroll jumping
      e.preventDefault();

      const now = Date.now();
      if (isScrolling.current || now - lastScrollTime.current < SCROLL_COOLDOWN) {
        return;
      }

      const currentIndex = getSectionIndex();
      if (e.deltaY > 0) {
        scrollToSection(currentIndex + 1);
      } else if (e.deltaY < 0) {
        scrollToSection(currentIndex - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDesktop()) return;

      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(e.key)) {
        e.preventDefault();

        const now = Date.now();
        if (isScrolling.current || now - lastScrollTime.current < SCROLL_COOLDOWN) {
          return;
        }

        const currentIndex = getSectionIndex();
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
          scrollToSection(currentIndex + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          scrollToSection(currentIndex - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
