import React, { useState, useRef, useEffect, useCallback } from "react";
import { isEmpty } from "lodash-es";
import { Flex, View } from "vcc-ui";

import { useWindowSize } from "../../hooks/useWindowSize";
import { BREAKPOINTS } from "../../constants";
import Pagination from "../Pagination";

interface CarouselProps {
  items: Array<React.ReactElement>;
}

export const Carousel = (props: CarouselProps) => {
  const { items  } = props;
  const imagesContainerRef = useRef<HTMLDivElement | null>(null);
  const oneStepOffset = imagesContainerRef?.current?.children[0].clientWidth || 0;
  const [currentOffset, setCurrentOffset] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const updateCarouselWidth = useCallback((width) => {
    const visibleItems = oneStepOffset ? Math.floor(width / oneStepOffset) : 1;
    setCarouselWidth (visibleItems * oneStepOffset);
  }, [oneStepOffset]);

  const windowSize = useWindowSize(updateCarouselWidth);
  const isMobile = !!(windowSize && windowSize.breakpoint === BREAKPOINTS.untilL);

  const moveLeft = () => {
    setCurrentOffset(currentOffset === 0 ? currentOffset : currentOffset - 1);
  }

  const moveRight = () => {
    setCurrentOffset(currentOffset === items.length - 1 ? currentOffset : currentOffset + 1);
  }

  const dotClick = (index: number) => {
    setCurrentOffset(index);
  }

  const emptyState = <h3>Cars not found</h3>

  useEffect(() => {
    if (windowSize?.width) {
      updateCarouselWidth(windowSize.width);
    }
  }, [windowSize, oneStepOffset]);

  return (
    isEmpty(items)
    ? emptyState
    : <View
        extend={{
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          flexWrap: 'nowrap',
          overflow: 'hidden',
          width: carouselWidth ? `${carouselWidth}px` : '100%',
          maxWidth: carouselWidth ? `${carouselWidth}px` : '100%',
        }}
      >
        <Flex
          ref={imagesContainerRef}
          extend={{
              display: 'flex',
              flexDirection: 'row',
              transition: '0.4s transform ease-out',
              transform: `translate3d(-${currentOffset * oneStepOffset}px, 0, 0)`
            }}
        >
          {items}
        </Flex>
        <Pagination
          isMobile={isMobile}
          activeItemIndex={currentOffset}
          totalItems={items.length}
          moveLeftHandler={moveLeft}
          moveRightHandler={moveRight}
          dotClickHandler={dotClick}
        />
    </View>
  );
};

export default Carousel;