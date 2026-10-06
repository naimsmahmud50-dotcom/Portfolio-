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
  hasFlare: boolean;
  flareSize: number;
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
  glowColor: string;
  active: boolean;
}

// Sophisticated celestial palette (High-end Luxury Tech & Starlight)
const CELESTIAL_PALETTE = [
  // Crisp Diamond Starlight
  { color: "#FFFFFF", glow: "rgba(255, 255, 255, 0.65)" },
  { color: "#F0F9FF", glow: "rgba(224, 242, 254, 0.55)" },
  // Cyber Cyan & Aqua Starlight
  { color: "#38BDF8", glow: "rgba(56, 189, 248, 0.50)" },
  { color: "#00F0FF", glow: "rgba(0, 240, 255, 0.55)" },
  { color: "#22D3EE", glow: "rgba(34, 211, 238, 0.45)" },
  // Electric Azure & Royal Blue
  { color: "#60A5FA", glow: "rgba(96, 165, 250, 0.45)" },
  { color: "#818CF8", glow: "rgba(129, 140, 248, 0.40)" },
  // Cosmic Violet & Nebula Lilac
  { color: "#C084FC", glow: "rgba(192, 132, 252, 0.45)" },
  { color: "#E879F9", glow: "rgba(232, 121, 249, 0.40)" },
  // Warm Golden Champagne Nova (Creates authentic contrast)
  { color: "#FEF08A", glow: "rgba(254, 240, 138, 0.55)" },
  { color: "#FDE047", glow: "rgba(253, 224, 71, 0.50)" },
];

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive star allocation
    const isMobile = width < 768;
    const totalStars = isMobile ? 85 : Math.min(Math.floor(width / 9.5), 180);
    const stars: Star[] = [];

    // Initialize 3 realistic tiers of stars
    for (let i = 0; i < totalStars; i++) {
      const palette = CELESTIAL_PALETTE[Math.floor(Math.random() * CELESTIAL_PALETTE.length)];
      const rand = Math.random();

      // Tier 3: Signature Prismatic Diamond Stars (~10%)
      if (rand < 0.10) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.06,
          vy: (Math.random() - 0.5) * 0.06,
          radius: Math.random() * 0.6 + 1.4, // 1.4 - 2.0px
          baseAlpha: Math.random() * 0.3 + 0.5,
          color: palette.color,
          glowColor: palette.glow,
          twinkleSpeed: Math.random() * 1.2 + 0.8,
          twinklePhase: Math.random() * Math.PI * 2,
          hasFlare: true,
          flareSize: Math.random() * 6 + 10, // 10 - 16px soft flare
        });
      }
      // Tier 2: Medium Luminous Celestial Stars (~25%)
      else if (rand < 0.35) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.09,
          vy: (Math.random() - 0.5) * 0.09,
          radius: Math.random() * 0.4 + 0.9, // 0.9 - 1.3px
          baseAlpha: Math.random() * 0.3 + 0.35,
          color: palette.color,
          glowColor: palette.glow,
          twinkleSpeed: Math.random() * 1.6 + 1.0,
          twinklePhase: Math.random() * Math.PI * 2,
          hasFlare: false,
          flareSize: 0,
        });
      }
      // Tier 1: Distant Micro-stardust (~65%)
      else {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.03,
          vy: (Math.random() - 0.5) * 0.03,
          radius: Math.random() * 0.35 + 0.45, // 0.45 - 0.8px
          baseAlpha: Math.random() * 0.35 + 0.2,
          color: Math.random() > 0.4 ? "#FFFFFF" : palette.color,
          glowColor: palette.glow,
          twinkleSpeed: Math.random() * 2.0 + 0.6,
          twinklePhase: Math.random() * Math.PI * 2,
          hasFlare: false,
          flareSize: 0,
        });
      }
    }

    // Shooting stars pool
    const shootingStars: ShootingStar[] = [];
    let nextShootingStarTime = Date.now() + Math.random() * 3500 + 2000;

    const spawnShootingStar = () => {
      const colors = [
        { c: "#FFFFFF", g: "rgba(0, 240, 255, 0.6)" },
        { c: "#38BDF8", g: "rgba(56, 189, 248, 0.5)" },
        { c: "#FEF08A", g: "rgba(254, 240, 138, 0.5)" },
        { c: "#C084FC", g: "rgba(192, 132, 252, 0.5)" },
      ];
      const pick = colors[Math.floor(Math.random() * colors.length)];
      // Diagonal trajectory between 25 and 36 degrees
      const angle = (Math.PI / 180) * (Math.random() * 12 + 25);
      const speed = Math.random() * 6 + 9;

      shootingStars.push({
        x: Math.random() * (width * 0.85),
        y: Math.random() * (height * 0.35),
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length: Math.random() * 80 + 90, // 90 - 170px graceful trail
        speed,
        opacity: 1,
        color: pick.c,
        glowColor: pick.g,
        active: true,
      });
    };

    // Smooth cursor tracking with fluid inertia
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let currentMouseX = -1000;
    let currentMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      if (currentMouseX === -1000) {
        currentMouseX = e.clientX;
        currentMouseY = e.clientY;
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Render loop
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse spotlight interpolation
      if (targetMouseX !== -1000) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.08;
        currentMouseY += (targetMouseY - currentMouseY) * 0.08;

        // Draw subtle celestial spotlight around cursor
        const spotRadius = 180;
        const spotGrad = ctx.createRadialGradient(
          currentMouseX,
          currentMouseY,
          0,
          currentMouseX,
          currentMouseY,
          spotRadius
        );
        spotGrad.addColorStop(0, "rgba(56, 189, 248, 0.07)");
        spotGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.03)");
        spotGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.save();
        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(currentMouseX, currentMouseY, spotRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      const t = time * 0.0016;

      // 1. Render & Animate Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Cosmic slow drift
        star.x += star.vx;
        star.y += star.vy;

        // Smooth viewport wrap
        if (star.x < 0) star.x = width;
        else if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        else if (star.y > height) star.y = 0;

        // Proximity to mouse
        let proximityBoost = 0;
        if (currentMouseX !== -1000) {
          const dxM = currentMouseX - star.x;
          const dyM = currentMouseY - star.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);
          if (distM < 140) {
            proximityBoost = (1 - distM / 140) * 0.35;
          }
        }

        // Smooth sine-wave twinkling calculation
        const twinkleOsc = Math.sin(t * star.twinkleSpeed + star.twinklePhase);
        const currentAlpha = Math.max(
          0.14,
          Math.min(1.0, star.baseAlpha + twinkleOsc * 0.38 + proximityBoost)
        );

        // A. Draw Soft Photometric Radial Bloom Halo
        if (star.hasFlare || star.radius > 0.85) {
          const bloomRadius = star.radius * (star.hasFlare ? 4.5 : 2.8);
          const bloom = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            bloomRadius
          );
          bloom.addColorStop(0, star.glowColor);
          bloom.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.save();
          ctx.globalAlpha = currentAlpha * 0.75;
          ctx.fillStyle = bloom;
          ctx.beginPath();
          ctx.arc(star.x, star.y, bloomRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // B. Draw Diamond 4-Point Starlight Flare (Signature Jewels)
        if (star.hasFlare && currentAlpha > 0.42) {
          const flarePulse = Math.max(0.2, (currentAlpha - 0.35) / 0.65);
          const flareLen = star.flareSize * flarePulse;
          const flareWidth = star.radius * 0.65;

          ctx.save();
          ctx.globalAlpha = (currentAlpha - 0.25) * 0.75;
          ctx.fillStyle = star.color;

          // Horizontal diamond needle
          ctx.beginPath();
          ctx.moveTo(star.x - flareLen, star.y);
          ctx.lineTo(star.x, star.y - flareWidth);
          ctx.lineTo(star.x + flareLen, star.y);
          ctx.lineTo(star.x, star.y + flareWidth);
          ctx.closePath();
          ctx.fill();

          // Vertical diamond needle
          ctx.beginPath();
          ctx.moveTo(star.x, star.y - flareLen);
          ctx.lineTo(star.x + flareWidth, star.y);
          ctx.lineTo(star.x, star.y + flareLen);
          ctx.lineTo(star.x - flareWidth, star.y);
          ctx.closePath();
          ctx.fill();

          ctx.restore();
        }

        // C. Draw Star Glowing Body
        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // D. Draw Pure White Core (High brilliance center)
        ctx.globalAlpha = Math.min(1.0, currentAlpha * 1.35);
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(star.x, star.y, Math.max(0.4, star.radius * 0.6), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // E. Delicate Constellation Filaments between close stars
        for (let j = i + 1; j < stars.length; j++) {
          const star2 = stars[j];
          const dx = star.x - star2.x;
          const dy = star.y - star2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(star2.x, star2.y);
            ctx.strokeStyle = star.color;
            ctx.globalAlpha = (1 - dist / 80) * 0.08 * Math.min(currentAlpha, 0.85);
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // 2. Render & Animate Realistic Shooting Stars
      const now = Date.now();
      if (now > nextShootingStarTime) {
        spawnShootingStar();
        nextShootingStarTime = now + Math.random() * 4500 + 3500; // Next in 3.5 - 8s
      }

      for (let s = shootingStars.length - 1; s >= 0; s--) {
        const meteor = shootingStars[s];
        if (!meteor.active) continue;

        meteor.x += meteor.dx;
        meteor.y += meteor.dy;
        meteor.opacity -= 0.015; // Smooth exponential decay

        if (meteor.opacity <= 0 || meteor.x > width + 100 || meteor.y > height + 100) {
          meteor.active = false;
          shootingStars.splice(s, 1);
          continue;
        }

        // Tapered luminous tail with gradient falloff
        const tailX = meteor.x - (meteor.dx / meteor.speed) * meteor.length;
        const tailY = meteor.y - (meteor.dy / meteor.speed) * meteor.length;

        const grad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(0.6, meteor.glowColor);
        grad.addColorStop(1, "#FFFFFF");

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = meteor.opacity;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.stroke();

        // Meteor glowing nucleus
        const headGlow = ctx.createRadialGradient(
          meteor.x,
          meteor.y,
          0,
          meteor.x,
          meteor.y,
          4.5
        );
        headGlow.addColorStop(0, "#FFFFFF");
        headGlow.addColorStop(0.4, meteor.color);
        headGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Reduced motion compliance
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
      className="fixed inset-0 pointer-events-none z-0 w-full h-full opacity-95 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
