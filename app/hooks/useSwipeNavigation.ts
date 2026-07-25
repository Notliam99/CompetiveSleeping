"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const tabs = ["stats", "challenges", "personal", "profile"];

export function useSwipeNavigation() {
  const router = useRouter();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleSwipe = useCallback(() => {
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (!isLeftSwipe && !isRightSwipe) return;

    const currentPath = window.location.pathname;
    const currentTabIndex = tabs.findIndex((tab) =>
      currentPath.includes(tab)
    );

    if (currentTabIndex === -1) return;

    let nextTabIndex = currentTabIndex;

    if (isLeftSwipe && currentTabIndex < tabs.length - 1) {
      nextTabIndex = currentTabIndex + 1;
    } else if (isRightSwipe && currentTabIndex > 0) {
      nextTabIndex = currentTabIndex - 1;
    }

    if (nextTabIndex !== currentTabIndex) {
      router.push(`/${tabs[nextTabIndex]}`);
    }
  }, [router]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      handleSwipe();
    },
    [handleSwipe]
  );

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);
}
