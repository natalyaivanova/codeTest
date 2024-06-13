import React, { useState, useRef } from "react";
import { isEmpty } from "lodash-es";
import { Click, Flex, IconButton, View } from "vcc-ui";

import { useWindowSize } from "../../hooks/useWindowSize";
import { BREAKPOINTS } from "../../constants";
import { useScroll } from "../../hooks/useScroll";
import { ARIA_LABELS } from "../../constants";

interface CarouselProps {
  items: Array<React.ReactElement>;
}

export const Carousel = (props: CarouselProps) => {
  const { items  } = props;

  const [offset, setOffset] = useState(0);
  const [activeItem, setActiveItem] = useState(0);


  const imagesContainerRef = useRef<HTMLDivElement | null>(null);
  const oneCardWidth = imagesContainerRef?.current?.children[0]?.getBoundingClientRect().width ?? 0
  const containerWidth = imagesContainerRef.current?.clientWidth ?? 0;

  const windowSize = useWindowSize();

  const isMobile = !!(windowSize && (
    windowSize.breakpoint === BREAKPOINTS.untilL ||
    windowSize.breakpoint === BREAKPOINTS.untilM
  ));

  const updateOffset = (newOffset: number) => {
    const maxPossibleOffset = oneCardWidth * items.length - containerWidth;
    const newCountedOffset = Math.min(newOffset, maxPossibleOffset);
    setOffset(newCountedOffset);
    setActiveItem(Math.floor(newCountedOffset / oneCardWidth));
  };

  const scrollHandlers = useScroll(offset, imagesContainerRef, updateOffset);

  const moveLeft = () => {
    const newActiveItem = activeItem === 0
      ? activeItem
      : activeItem - 1
    setActiveItem(newActiveItem);
    setOffset(newActiveItem * oneCardWidth);
  }

  const moveRight = () => {
    const newActiveItem = activeItem === items.length - 1
      ? activeItem
      : activeItem + 1
    setActiveItem(newActiveItem);
    setOffset(newActiveItem * oneCardWidth);
  }

  const dotClick = (index: number) => {
    setActiveItem(index);
    setOffset(index * oneCardWidth);
  }

  const emptyState = <h3>Cars not found</h3>

  return (
    isEmpty(items)
    ? emptyState
    : <>
        <View
          ref={imagesContainerRef}
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
              backgroundColor: index === activeItem ? '#222' : '#d5d5d5',
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
            iconName="navigation-chevronback"
            variant="outline"
            onClick={moveLeft}
            disabled={offset <= 0}
          />

          <IconButton
            aria-label={ARIA_LABELS.RIGHT}
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