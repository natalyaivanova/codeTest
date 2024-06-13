import React, { useState, useCallback, MouseEvent, TouchEvent} from "react";

export const useScroll = (
  offset: number,
  containerRef: React.RefObject<HTMLDivElement>,
  updateOffset: (offset: number) => void,
) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [startOffset, setStartOffset] = useState(0);

  const onMouseStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsScrolling(true);
    setStartPosition(e.pageX - (containerRef.current?.offsetLeft ?? 0));
    setStartOffset(offset);
  }, [containerRef, offset]);

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setIsScrolling(true);
    setStartPosition(e.touches[0].pageX - (containerRef.current?.offsetLeft ?? 0));
    setStartOffset(offset);
  }, [containerRef, offset]);

  const onMouseScroll = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!isScrolling) return;

    const newPosition = e.pageX - (containerRef.current?.offsetLeft ?? 0);
    const newOffset = newPosition - startPosition;

    updateOffset(startOffset - newOffset);
  }, [isScrolling, startPosition, startOffset, containerRef]);

  const onTouchScroll = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (!isScrolling) return;

    const newPosition = e.touches[0].pageX - (containerRef.current?.offsetLeft ?? 0);
    const newOffset = newPosition - startPosition;

    updateOffset(startOffset - newOffset);
  }, [isScrolling, startPosition, startOffset, containerRef]);

  const onStop = useCallback(() => {
    if (isScrolling) {
      setIsScrolling(false);
    }
  }, [isScrolling, offset]);

  return {
    onMouseDown: onMouseStart,
    onMouseLeave: onStop,
    onMouseUp: onStop,
    onMouseMove: onMouseScroll,

    onTouchStart: onTouchStart,
    onTouchMove: onTouchScroll,
    onTouchEnd: onStop
  };
};
