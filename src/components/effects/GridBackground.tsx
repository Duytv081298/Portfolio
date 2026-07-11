'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    const gridSize = 60;
    let time = 0;

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw grid lines
      for (let i = 0; i <= cols; i++) {
        const x = i * gridSize;
        const distX = Math.abs(x - mx);
        const intensity = Math.max(0, 1 - distX / 300);
        const baseAlpha = 0.03;
        const alpha = baseAlpha + intensity * 0.08;

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = `rgba(77, 163, 255, ${alpha})`;
        ctx.lineWidth = intensity > 0.3 ? 1 : 0.5;
        ctx.stroke();
      }

      for (let j = 0; j <= rows; j++) {
        const y = j * gridSize;
        const distY = Math.abs(y - my);
        const intensity = Math.max(0, 1 - distY / 300);
        const baseAlpha = 0.03;
        const alpha = baseAlpha + intensity * 0.08;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = `rgba(77, 163, 255, ${alpha})`;
        ctx.lineWidth = intensity > 0.3 ? 1 : 0.5;
        ctx.stroke();
      }

      // Draw intersection dots near mouse
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);

          if (dist < 200) {
            const alpha = (1 - dist / 200) * 0.6;
            const size = (1 - dist / 200) * 2.5;
            const pulse = Math.sin(time * 3 + i + j) * 0.3 + 0.7;

            ctx.beginPath();
            ctx.arc(x, y, size * pulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(77, 163, 255, ${alpha * pulse})`;
            ctx.fill();
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
