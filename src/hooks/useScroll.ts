import React, { useState, useCallback, MouseEvent, TouchEvent} from "react";

export const useScroll = (
  offset: number,
  containerRef: React.RefObject<HTMLDivElement>,
  updateOffset: (offset: number) => void,
) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [startOffset, setStartOffset] = useState(0);

  const onStart = useCallback((e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement> ) => {
    const startPosition = 'touches' in e
      ? e.touches[0].pageX - (containerRef.current?.offsetLeft ?? 0)
      : e.pageX - (containerRef.current?.offsetLeft ?? 0)
    setIsScrolling(true);
    setStartPosition(startPosition);
    setStartOffset(offset);
  }, [containerRef, offset]);

  const onScroll = useCallback((e: TouchEvent<HTMLDivElement>|  MouseEvent<HTMLDivElement>) => {
    if (!isScrolling) return;

    const newPosition = 'touches' in e
      ? e.touches[0].pageX - (containerRef.current?.offsetLeft ?? 0)
      :e.pageX - (containerRef.current?.offsetLeft ?? 0);

    updateOffset(startOffset - (newPosition - startPosition));
  }, [isScrolling, startPosition, startOffset, containerRef]);

  const onStop = useCallback(() => {
    if (isScrolling) {
      setIsScrolling(false);
    }
  }, [isScrolling, offset]);

  return {
    onMouseDown: onStart,
    onMouseLeave: onStop,
    onMouseUp: onStop,
    onMouseMove: onScroll,

    onTouchStart: onStart,
    onTouchMove: onScroll,
    onTouchEnd: onStop
  };
};
