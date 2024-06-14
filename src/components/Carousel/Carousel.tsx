import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { isEmpty } from "lodash-es";
import { Click, Flex, IconButton, View } from "vcc-ui";

import { useWindowSize } from "../../hooks/useWindowSize";
import { BREAKPOINTS } from "../../constants";
import { useScroll } from "../../hooks/useScroll";
import { ARIA_LABELS } from "../../constants";
import EmptyState from "../EmptyState";
import { CarouselProps } from "../../types";

export const Carousel = (props: CarouselProps) => {
  const { items  } = props;

  const [offset, setOffset] = useState(0);

  const imagesContainerRef = useRef<HTMLDivElement | null>(null);
  const oneCardWidth = imagesContainerRef?.current?.children[0]?.getBoundingClientRect().width ?? 0
  const containerWidth = imagesContainerRef.current?.clientWidth ?? 0;

  const windowSize = useWindowSize();

  const isMobile = !!(windowSize && (
    windowSize.breakpoint === BREAKPOINTS.untilL ||
    windowSize.breakpoint === BREAKPOINTS.untilM
  ));

  const updateOffset = useCallback((newOffset: number) => {
    const cardRest = newOffset / oneCardWidth;
    const adjustedOffset = oneCardWidth * ((cardRest - Math.floor(cardRest)) > 0.5
      ? Math.ceil(cardRest)
      : Math.floor(cardRest));
    const maxPossibleOffset = oneCardWidth * items.length - containerWidth;
    const newCountedOffset = Math.min(Math.max(adjustedOffset, 0), maxPossibleOffset);

    setOffset(newCountedOffset);
    }, [oneCardWidth, containerWidth]);

  const scrollHandlers = useScroll(offset, imagesContainerRef, updateOffset);

  const moveLeft = () => {
    setOffset(offset - oneCardWidth);
  }

  const moveRight = () => {
    setOffset(offset + oneCardWidth);
  }

  const dotClick = (index: number) => {
    setOffset(index * oneCardWidth);
  }

  const getActiveItemIndex = useMemo(() =>
      oneCardWidth ? Math.floor(offset / oneCardWidth) : 0,
    [offset, oneCardWidth]
  );

  useEffect(() => setOffset(0), [items]);

  return (
    isEmpty(items)
    ? <EmptyState />
    : <>
        <View
          ref={imagesContainerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="volvo cars"
          extend={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            transition: '0.4s transform ease-out',
            transform: `translate3d(-${offset}px, 0, 0)`
          }}

          {...scrollHandlers}
        >
          {items}
        </View>

        {isMobile
        ? <Flex
          role="group"
          aria-label="carousel controls"
          data-testid="carousel-controls"
          extend={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginRight: '.5vw',
            marginTop: '1rem',
            gap: '1vw'
          }}>
        {items.map((_, index: number) => (
          <Click
            extend={{
              width: '0.6rem',
              height: '0.6rem',
              borderRadius: '100%',
              backgroundColor: getActiveItemIndex === index ? '#222' : '#d5d5d5',
              border: 'none',
              padding: '0'
            }}
            key={`dot${index}`}
            onClick={() => dotClick(index)}
            type="button"
          />
        ))}
        </Flex>
          : <Flex
          extend={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: '.5vw',
            marginTop: '1rem',
            gap: '1vw'
          }}
        >
          <IconButton
            aria-label={ARIA_LABELS.LEFT}
            data-testid="button-previous"
            iconName="navigation-chevronback"
            variant="outline"
            onClick={moveLeft}
            disabled={offset <= 0}
          />

          <IconButton
            aria-label={ARIA_LABELS.RIGHT}
            data-testid="button-next"
            iconName="navigation-chevronforward"
            variant="outline"
            onClick={moveRight}
            disabled={offset !== 0 && offset >= containerWidth}
          />
        </Flex>}
      </>
  );
};

export default Carousel;