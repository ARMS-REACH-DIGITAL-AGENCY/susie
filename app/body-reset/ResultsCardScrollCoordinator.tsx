"use client";

import { useEffect } from "react";

const CARD_SELECTOR = ".results-treatment-card";
const SCROLLER_SELECTOR = ".results-pricing-scroll";
const BUMPER_TOLERANCE = 28;

function stickyTop() {
  return window.innerWidth >= 768 ? 88 : 72;
}

function isFlipped(card: HTMLElement) {
  const inner = card.firstElementChild as HTMLElement | null;
  return Boolean(inner && String(inner.className).includes("[transform:rotateY(180deg)]"));
}

function getScroller(card: HTMLElement) {
  return card.querySelector<HTMLElement>(SCROLLER_SELECTOR);
}

function canScrollInside(card: HTMLElement, direction: number) {
  if (!isFlipped(card)) return false;
  const scroller = getScroller(card);
  if (!scroller) return false;

  const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
  if (max <= 1) return false;
  return direction > 0 ? scroller.scrollTop < max - 1 : scroller.scrollTop > 1;
}

export default function ResultsCardScrollCoordinator() {
  useEffect(() => {
    let activeCard: HTMLElement | null = null;
    let lastWindowY = window.scrollY;
    let lastTouchY: number | null = null;
    let snapping = false;

    const setActive = (card: HTMLElement | null) => {
      if (activeCard === card) return;
      document.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach((item) => {
        item.dataset.scrollActive = item === card ? "true" : "false";
      });
      activeCard = card;
    };

    const alignCard = (card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const distance = rect.top - stickyTop();
      if (Math.abs(distance) <= 1) return;

      snapping = true;
      window.scrollTo({ top: window.scrollY + distance, behavior: "auto" });
      requestAnimationFrame(() => {
        snapping = false;
        lastWindowY = window.scrollY;
      });
    };

    const findBumperCard = (direction: number, target?: EventTarget | null) => {
      const targetElement = target instanceof Element ? target : null;
      const targetCard = targetElement?.closest<HTMLElement>(CARD_SELECTOR) ?? null;

      if (targetCard) {
        const offset = targetCard.getBoundingClientRect().top - stickyTop();
        if (Math.abs(offset) <= BUMPER_TOLERANCE && canScrollInside(targetCard, direction)) return targetCard;
      }

      const candidates = Array.from(document.querySelectorAll<HTMLElement>(CARD_SELECTOR))
        .filter((card) => Math.abs(card.getBoundingClientRect().top - stickyTop()) <= BUMPER_TOLERANCE)
        .filter((card) => canScrollInside(card, direction))
        .sort((a, b) => Math.abs(a.getBoundingClientRect().top - stickyTop()) - Math.abs(b.getBoundingClientRect().top - stickyTop()));

      return candidates[0] ?? null;
    };

    const routeDelta = (direction: number, amount: number, target?: EventTarget | null) => {
      let card = activeCard;

      if (!card || !canScrollInside(card, direction)) {
        if (card && !canScrollInside(card, direction)) setActive(null);
        card = findBumperCard(direction, target);
        if (card) {
          alignCard(card);
          setActive(card);
        }
      }

      if (!card) return false;

      const scroller = getScroller(card);
      if (!scroller) {
        setActive(null);
        return false;
      }

      const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
      const next = Math.max(0, Math.min(max, scroller.scrollTop + amount));
      const moved = Math.abs(next - scroller.scrollTop) > 0.5;

      if (moved) {
        scroller.scrollTop = next;
        return true;
      }

      setActive(null);
      return false;
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 0.5) return;
      const direction = event.deltaY > 0 ? 1 : -1;

      if (routeDelta(direction, event.deltaY, event.target)) {
        event.preventDefault();
        return;
      }

      if (activeCard) setActive(null);
    };

    const onTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY;
      if (currentY == null || lastTouchY == null) {
        lastTouchY = currentY ?? null;
        return;
      }

      const deltaY = lastTouchY - currentY;
      lastTouchY = currentY;
      if (Math.abs(deltaY) < 0.5) return;

      const direction = deltaY > 0 ? 1 : -1;
      if (routeDelta(direction, deltaY, event.target)) {
        event.preventDefault();
      } else if (activeCard) {
        setActive(null);
      }
    };

    const onTouchEnd = () => {
      lastTouchY = null;
    };

    const onWindowScroll = () => {
      if (snapping) return;

      const currentY = window.scrollY;
      const delta = currentY - lastWindowY;
      lastWindowY = currentY;
      if (Math.abs(delta) < 0.5) return;

      const direction = delta > 0 ? 1 : -1;

      if (activeCard && canScrollInside(activeCard, direction)) {
        alignCard(activeCard);
        return;
      }

      if (activeCard) setActive(null);

      const candidate = findBumperCard(direction);
      if (candidate) {
        alignCard(candidate);
        setActive(candidate);
      }
    };

    const alignCardOnOpen = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const front = target?.closest<HTMLButtonElement>(`${CARD_SELECTOR} button`);
      const card = front?.closest<HTMLElement>(CARD_SELECTOR);
      if (!front || !card) return;

      const scroller = getScroller(card);
      if (scroller) scroller.scrollTop = 0;
      setActive(null);

      requestAnimationFrame(() => {
        alignCard(card);
        requestAnimationFrame(() => {
          if (canScrollInside(card, 1)) setActive(card);
        });
      });
    };

    document.addEventListener("wheel", onWheel, { passive: false, capture: true });
    document.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true, capture: true });
    document.addEventListener("touchcancel", onTouchEnd, { passive: true, capture: true });
    document.addEventListener("click", alignCardOnOpen, true);
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    window.addEventListener("resize", onWindowScroll);

    return () => {
      document.removeEventListener("wheel", onWheel, true);
      document.removeEventListener("touchstart", onTouchStart, true);
      document.removeEventListener("touchmove", onTouchMove, true);
      document.removeEventListener("touchend", onTouchEnd, true);
      document.removeEventListener("touchcancel", onTouchEnd, true);
      document.removeEventListener("click", alignCardOnOpen, true);
      window.removeEventListener("scroll", onWindowScroll);
      window.removeEventListener("resize", onWindowScroll);
    };
  }, []);

  return null;
}
