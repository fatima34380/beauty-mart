'use client';

import React, { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const Sparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate random particles
    const generated: Sparkle[] = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x
      y: Math.random() * 100, // percentage y
      size: Math.random() * 6 + 2, // 2px to 8px
      duration: Math.random() * 15 + 10, // 10s to 25s
      delay: Math.random() * -20 // negative delay so they start immediately at different keyframe times
    }));
    setSparkles(generated);
  }, []);

  return (
    <div className="sparkles-container">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle-particle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            background: 'radial-gradient(circle, rgba(255,209,220,1) 0%, rgba(212,175,55,0.7) 50%, rgba(255,255,255,0) 100%)',
            boxShadow: '0 0 10px rgba(255, 209, 220, 0.8)',
          }}
        />
      ))}
      <style jsx global>{`
        .sparkles-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .sparkle-particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          animation-name: floatSparkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        @keyframes floatSparkle {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(-80px) translateX(20px) rotate(180deg) scale(1.2);
            opacity: 0.8;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-160px) translateX(-10px) rotate(360deg) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
export default Sparkles;
