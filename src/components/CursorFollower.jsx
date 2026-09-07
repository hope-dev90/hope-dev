import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function CursorFollower() {
  const fishRef    = useRef(null);
  const dotRef     = useRef(null);
  const bubblePool = useRef([]);
  const container  = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const fish = fishRef.current;
    const dot  = dotRef.current;
    const wrap = container.current;
    if (!fish || !dot || !wrap) return;

    document.body.style.cursor = "none";

    const FISH_SIZE = 120;

    let fishX = -300, fishY = -300;
    let lastFishX = fishX, lastFishY = fishY;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let flipped = false;
    let frame = 0;
    let bubbleTimer = 0; // frames between bubble spawns

    gsap.set(fish, { x: fishX, y: fishY, scaleX: -1, scaleY: 1 });
    gsap.set(dot,  { x: targetX - 4, y: targetY - 4 });

    // ── Bubble pool — reuse DOM nodes ──────────────────────────────────────
    const POOL_SIZE = 18;
    for (let i = 0; i < POOL_SIZE; i++) {
      const b = document.createElement("div");
      b.style.cssText = `
        position:fixed; top:0; left:0; pointer-events:none; z-index:9998;
        border-radius:50%; border:1.5px solid rgba(232,98,44,0.55);
        background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.6), rgba(232,98,44,0.08));
        will-change:transform,opacity; opacity:0;
      `;
      wrap.appendChild(b);
      bubblePool.current.push({ el: b, active: false });
    }

    function spawnBubble(x, y, speed) {
      const slot = bubblePool.current.find((b) => !b.active);
      if (!slot) return;
      slot.active = true;

      const size   = 6 + Math.random() * 10;       // 6–16px
      const drift  = (Math.random() - 0.5) * 30;   // horizontal wobble
      const rise   = 40 + Math.random() * 50;       // how far up
      const dur    = 0.8 + Math.random() * 0.6;     // lifetime

      gsap.set(slot.el, {
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        width: size, height: size,
        opacity: 0.75 + Math.random() * 0.2,
        scale: 0.4,
      });

      gsap.to(slot.el, {
        y: `-=${rise}`,
        x: `+=${drift}`,
        scale: 1,
        opacity: 0,
        duration: dur,
        ease: "power1.out",
        onComplete: () => { slot.active = false; },
      });
    }

    // ── Mouse ──────────────────────────────────────────────────────────────
    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      gsap.to(dot, { x: targetX - 4, y: targetY - 4, duration: 0.05, ease: "none", overwrite: true });
    };
    window.addEventListener("mousemove", onMove);

    // ── RAF loop ───────────────────────────────────────────────────────────
    let raf;
    const loop = () => {
      frame++;

      const lerp = 0.012;
      fishX += (targetX - FISH_SIZE / 2 - fishX) * lerp;
      fishY += (targetY - FISH_SIZE / 2 - fishY) * lerp;

      const dx    = fishX - lastFishX;
      const dy    = fishY - lastFishY;
      const speed = Math.hypot(dx, dy);
      lastFishX = fishX;
      lastFishY = fishY;

      // Heading angle — point nose at cursor
      const angleRad = Math.atan2(
        targetY - (fishY + FISH_SIZE / 2),
        targetX - (fishX + FISH_SIZE / 2)
      );
      const angleDeg = angleRad * (180 / Math.PI);

      // Tail wag on top of heading
      const wagFreq      = 0.18 + speed * 0.12;
      const wagAmplitude = 4 + Math.min(speed * 3, 20);
      const wag = Math.sin(frame * wagFreq) * wagAmplitude;

      // When cursor is to the LEFT (angle outside -90..90), flip scaleX
      // so the fish nose always points toward cursor, never swims tail-first
      const goingLeft = angleDeg > 90 || angleDeg < -90;
      if (goingLeft && !flipped) {
        flipped = true;
        gsap.to(fish, { scaleX: 1, scaleY: -1, duration: 0.2, ease: "power2.out" });
      } else if (!goingLeft && flipped) {
        flipped = false;
        gsap.to(fish, { scaleX: -1, scaleY: 1, duration: 0.2, ease: "power2.out" });
      }

      // Clamp rotation so fish never flips upside-down via rotation alone
      // When going left we mirror via scale, so subtract 180 to keep angle sane
      const displayAngle = goingLeft ? angleDeg + 180 : angleDeg;
      gsap.set(fish, { x: fishX, y: fishY, rotation: displayAngle + wag });

      // ── Spawn bubbles proportional to speed ──
      // faster swimming = more frequent bubbles
      const minInterval = Math.max(3, Math.round(12 - speed * 2));
      bubbleTimer++;
      if (speed > 0.3 && bubbleTimer >= minInterval) {
        bubbleTimer = 0;
        // Bubbles come from the tail side — opposite to heading
        const tailAngle = angleRad + Math.PI;
        const tailX = fishX + FISH_SIZE / 2 + Math.cos(tailAngle) * (FISH_SIZE * 0.35);
        const tailY = fishY + FISH_SIZE / 2 + Math.sin(tailAngle) * (FISH_SIZE * 0.35);
        spawnBubble(tailX, tailY, speed);
        // Occasionally spawn a second smaller bubble
        if (speed > 1.5 && Math.random() > 0.5) {
          spawnBubble(tailX, tailY, speed);
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    // Magnetic
    const onEnter = () => gsap.to(fish, { scale: 1.35, duration: 0.3, ease: "back.out(1.7)" });
    const onLeave = () => gsap.to(fish, { scale: 1,    duration: 0.4, ease: "power3.out" });
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.style.cursor = "none";
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.querySelectorAll("[data-magnetic]").forEach((el) => {
        el.style.cursor = "";
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div ref={container} className="pointer-events-none">
      {/* Fish */}
      <img
        ref={fishRef}
        src="/image.png"
        alt=""
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] select-none"
        style={{
          width: 120, height: 120,
          objectFit: "contain",
          willChange: "transform",
          filter: "drop-shadow(0 4px 16px rgba(232,98,44,0.25))",
        }}
      />
      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 8, height: 8,
          borderRadius: "50%",
          background: "#e8622c",
          willChange: "transform",
        }}
      />
    </div>
  );
}
