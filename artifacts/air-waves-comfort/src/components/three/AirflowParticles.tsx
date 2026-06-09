import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

export default function AirflowParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.5 + 0.2),
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.01,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.pulse += p.pulseSpeed;
        const pulsedOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
        const pulsedSize = p.size * (0.85 + 0.15 * Math.sin(p.pulse * 1.3));

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulsedSize * 3);
        gradient.addColorStop(0, `rgba(0, 174, 239, ${pulsedOpacity})`);
        gradient.addColorStop(0.5, `rgba(0, 174, 239, ${pulsedOpacity * 0.4})`);
        gradient.addColorStop(1, `rgba(0, 174, 239, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
