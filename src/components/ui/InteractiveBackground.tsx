"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
  glowColor: string;
  twinkleSpeed: number;
  twinklePhase: number;
  hasSpikes: boolean;
  spikeLength: number;
}

interface ShootingStar {
  x: number;
  y: number;
  dx: number;
  dy: number;
  length: number;
  speed: number;
  opacity: number;
  color: string;
  active: boolean;
}

const STAR_PALETTE = [
  // Cyan & Aqua Starlight (Core Cyber Tech)
  { color: "#38BDF8", glow: "rgba(56, 189, 248, 0.45)" },
  { color: "#00F0FF", glow: "rgba(0, 240, 255, 0.55)" },
  { color: "#06B6D4", glow: "rgba(6, 182, 212, 0.4)" },
  // Electric Azure & Blue
  { color: "#60A5FA", glow: "rgba(96, 165, 250, 0.45)" },
  { color: "#818CF8", glow: "rgba(129, 140, 248, 0.4)" },
  // Cosmic Violet & Nebula Pink
  { color: "#C084FC", glow: "rgba(192, 132, 252, 0.45)" },
  { color: "#E879F9", glow: "rgba(232, 121, 249, 0.4)" },
  // Warm Golden Starlight
  { color: "#FDE047", glow: "rgba(253, 224, 71, 0.5)" },
  { color: "#FCD34D", glow: "rgba(252, 211, 77, 0.45)" },
  // Pure Diamond White
  { color: "#FFFFFF", glow: "rgba(255, 255, 255, 0.65)" },
];

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive star count for silky 60fps
    const isMobile = width < 768;
    const starCount = isMobile ? 70 : Math.min(Math.floor(width / 11), 160);
    const stars: Star[] = [];

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      const palette = STAR_PALETTE[Math.floor(Math.random() * STAR_PALETTE.length)];
      const isMajorStar = Math.random() < 0.22; // ~22% stars have prominent twinkle & spikes

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: isMajorStar ? Math.random() * 1.4 + 1.2 : Math.random() * 0.9 + 0.6,
        baseAlpha: Math.random() * 0.35 + 0.3,
        color: palette.color,
        glowColor: palette.glow,
        twinkleSpeed: Math.random() * 1.5 + 0.8,
        twinklePhase: Math.random() * Math.PI * 2,
        hasSpikes: isMajorStar,
        spikeLength: Math.random() * 4 + 4,
      });
    }

    // Shooting stars pool
    const shootingStars: ShootingStar[] = [];
    let nextShootingStarTime = Date.now() + Math.random() * 4000 + 2000;

    const spawnShootingStar = () => {
      const colors = ["#00F0FF", "#38BDF8", "#FDE047", "#FFFFFF", "#C084FC"];
      const angle = (Math.PI / 180) * (Math.random() * 20 + 25); // 25-45 degrees diagonal
      const speed = Math.random() * 7 + 8;

      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * (height * 0.3),
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length: Math.random() * 70 + 60,
        speed,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        active: true,
      });
    };

    // Mouse tracking for subtle star interaction
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Grid animation offset
    let gridOffset = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Cyber Space Grid (Very faint high-tech atmosphere)
      gridOffset = (gridOffset + 0.08) % 80;
      ctx.save();
      ctx.strokeStyle = "rgba(59, 130, 246, 0.025)";
      ctx.lineWidth = 0.8;
      for (let x = 0; x < width; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = gridOffset; y < height; y += 80) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Render & Twinkle Stars
      const t = time * 0.0015;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Smooth slow celestial drift
        star.x += star.vx;
        star.y += star.vy;

        // Wrap boundaries seamlessly
        if (star.x < 0) star.x = width;
        else if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        else if (star.y > height) star.y = 0;

        // Mouse gentle repel
        const dxM = mouseX - star.x;
        const dyM = mouseY - star.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < 100 && distM > 0) {
          star.x -= (dxM / distM) * 0.35;
          star.y -= (dyM / distM) * 0.35;
        }

        // Calculate organic breathing twinkle
        const twinkleSine = Math.sin(t * star.twinkleSpeed + star.twinklePhase);
        const currentAlpha = Math.max(
          0.12,
          Math.min(1, star.baseAlpha + twinkleSine * 0.42)
        );

        // A. Draw soft radial glow for major stars
        if (star.hasSpikes || star.radius > 1.1) {
          const glowRadius = star.radius * 3.5;
          const gradient = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            glowRadius
          );
          gradient.addColorStop(0, star.glowColor);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.save();
          ctx.globalAlpha = currentAlpha * 0.7;
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // B. Draw Star Core
        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // C. Draw 4-point cross diffraction spikes for major stars when bright
        if (star.hasSpikes && currentAlpha > 0.55) {
          const spikeLen = star.spikeLength * ((currentAlpha - 0.4) / 0.6);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = (currentAlpha - 0.5) * 0.85;

          ctx.beginPath();
          // Horizontal spike
          ctx.moveTo(star.x - spikeLen, star.y);
          ctx.lineTo(star.x + spikeLen, star.y);
          // Vertical spike
          ctx.moveTo(star.x, star.y - spikeLen);
          ctx.lineTo(star.x, star.y + spikeLen);
          ctx.stroke();
        }
        ctx.restore();

        // D. Constellation Links between close stars
        for (let j = i + 1; j < stars.length; j++) {
          const star2 = stars[j];
          const dx = star.x - star2.x;
          const dy = star.y - star2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(star2.x, star2.y);
            ctx.strokeStyle = star.color;
            ctx.globalAlpha = (1 - dist / 85) * 0.09 * Math.min(currentAlpha, 0.8);
            ctx.lineWidth = 0.65;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // 3. Handle Occasional Shooting Stars
      const now = Date.now();
      if (now > nextShootingStarTime) {
        spawnShootingStar();
        nextShootingStarTime = now + Math.random() * 5000 + 3500; // Next in 3.5-8.5s
      }

      for (let s = shootingStars.length - 1; s >= 0; s--) {
        const meteor = shootingStars[s];
        if (!meteor.active) continue;

        meteor.x += meteor.dx;
        meteor.y += meteor.dy;
        meteor.opacity -= 0.016;

        if (meteor.opacity <= 0 || meteor.x > width || meteor.y > height) {
          meteor.active = false;
          shootingStars.splice(s, 1);
          continue;
        }

        // Tail gradient
        const tailX = meteor.x - (meteor.dx / meteor.speed) * meteor.length;
        const tailY = meteor.y - (meteor.dy / meteor.speed) * meteor.length;

        const meteorGrad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        meteorGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        meteorGrad.addColorStop(1, meteor.color);

        ctx.save();
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = meteor.opacity;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.stroke();

        // Meteor glowing head
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Reduced motion check
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mediaQuery.matches) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full opacity-90 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
