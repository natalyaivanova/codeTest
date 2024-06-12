import { useEffect, useState, useCallback } from "react";

import { BREAKPOINTS } from "../constants";

export const getBreakPoint = (windowWidth: number): string | undefined => {
  if (windowWidth) {
    if (windowWidth < 480) {
      return BREAKPOINTS.untilM;
    } else if (windowWidth < 1024) {
      return BREAKPOINTS.untilL;
    } else if (windowWidth < 1600) {
      return BREAKPOINTS.untilXL;
    } else {
      return BREAKPOINTS.onlyXL;
    }
  } else {
    return undefined;
  }
}

export const useWindowSize = (onWindowChange?: (width: number) => void) => {
  const isWindowClient = typeof window === "object";
  const [windowSize, setWindowSize] = useState(
    isWindowClient ? {
      width: window.innerWidth,
      breakpoint: getBreakPoint(window.innerWidth)
    } : undefined
  );

  const setSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      breakpoint: getBreakPoint(window.innerWidth)
    });

    if(isWindowClient && onWindowChange) {
      onWindowChange(window.innerWidth);
    }
  }, [onWindowChange, isWindowClient, setWindowSize]);

  useEffect(() => {

    if (isWindowClient) {
      window.addEventListener("resize", setSize);
      window.addEventListener("load", setSize);

      return () => {
        window.removeEventListener("resize", setSize);
        window.removeEventListener("load", setSize);
      }
    }
  }, [isWindowClient, setWindowSize]);

  return windowSize;
}

export default useWindowSize;