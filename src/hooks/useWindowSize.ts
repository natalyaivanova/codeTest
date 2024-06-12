import { useEffect, useState, useCallback } from "react";
import { ThemeBreakpointName } from "vcc-ui/dist/types/shared";


interface windowResizeArgs {
  width: number,
  height: number,
  themeBreakpoint: ThemeBreakpointName,
}

export const useWindow = (onWindowChange?: () => void) => {
  const [windowSize, setWindowSize] = useState<windowResizeArgs>({
    width: 0,
    height: 0,
    themeBreakpoint: 'untilXL',
  });

  const handleResize = useCallback(() => {
    const themeBreakpoint = ThemeService.extractThemeBreakpoint(window.innerWidth);

    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      themeBreakpoint
    });

    if(onWindowChange) {
      onWindowChange();
    }
  }, [onWindowChange]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Call to update with initial window size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize)
    };
  }, []);

  return windowSize
}
