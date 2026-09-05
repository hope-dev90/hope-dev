import { useEffect, useRef } from "react";

/**
 * useSectionScroll
 *
 * Intercepts wheel, touch, and keyboard events and snaps
 * the viewport to the nearest section, one section per scroll gesture.
 *
 * @param {string[]} sectionIds — ordered list of section element IDs
 * @param {boolean}  enabled    — toggle on/off (e.g. disable on CV page)
 */
export function useSectionScroll(sectionIds, enabled = true) {
  const isScrolling = useRef(false); // debounce flag
  const currentIdx  = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    // ── Helpers ────────────────────────────────────────────────────────────

    function getSections() {
      return sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);
    }

    function getClosestIndex(sections) {
      const mid = window.scrollY + window.innerHeight / 2;
      let closest = 0;
      let minDist = Infinity;
      sections.forEach((el, i) => {
        const dist = Math.abs(el.getBoundingClientRect().top + window.scrollY - window.scrollY);
        // Use top of section relative to viewport
        const top = el.getBoundingClientRect().top;
        const d = Math.abs(top);
        if (d < minDist) { minDist = d; closest = i; }
      });
      return closest;
    }

    function scrollTo(index) {
      const sections = getSections();
      if (index < 0 || index >= sections.length) return;
      currentIdx.current = index;
      isScrolling.current = true;

      sections[index].scrollIntoView({ behavior: "smooth" });

      // Lock further scrolls while animation plays
      setTimeout(() => {
        isScrolling.current = false;
      }, 900);
    }

    function navigate(direction) {
      if (isScrolling.current) return;
      const sections = getSections();
      // Recalculate current position in case user jumped via nav link
      currentIdx.current = getClosestIndex(sections);
      const next = currentIdx.current + direction;
      if (next < 0 || next >= sections.length) return;
      scrollTo(next);
    }

    // ── Wheel ──────────────────────────────────────────────────────────────
    function onWheel(e) {
      // Don't intercept while hero has scroll locked
      if (document.body.style.overflow === "hidden") return;
      e.preventDefault();
      navigate(e.deltaY > 0 ? 1 : -1);
    }

    // ── Keyboard ───────────────────────────────────────────────────────────
    function onKeyDown(e) {
      if (document.body.style.overflow === "hidden") return;
      // Don't capture when user is typing in an input/textarea
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        navigate(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        navigate(-1);
      }
    }

    // ── Touch ──────────────────────────────────────────────────────────────
    function onTouchStart(e) {
      touchStartY.current = e.touches[0].clientY;
    }

    function onTouchEnd(e) {
      if (document.body.style.overflow === "hidden") return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return; // ignore tiny swipes
      navigate(delta > 0 ? 1 : -1);
    }

    // ── Attach ─────────────────────────────────────────────────────────────
    window.addEventListener("wheel",      onWheel,    { passive: false });
    window.addEventListener("keydown",    onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true });

    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("keydown",    onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, [sectionIds, enabled]);
}
