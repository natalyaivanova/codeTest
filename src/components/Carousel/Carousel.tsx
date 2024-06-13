import React, { useState, useRef, useEffect, useCallback } from "react";
import { isEmpty } from "lodash-es";
import { Flex, View } from "vcc-ui";

import { useWindowSize } from "../../hooks/useWindowSize";
import { BREAKPOINTS } from "../../constants";
import Pagination from "../Pagination";
import { useScroll } from "../../hooks/useScroll";

interface CarouselProps {
  items: Array<React.ReactElement>;
}

export const Carousel = (props: CarouselProps) => {
  const { items  } = props;

  const [offset, setOffset] = useState(0);

  const imagesContainerRef = useRef<HTMLDivElement | null>(null);
  const oneCardWidth = imagesContainerRef?.current?.children[0]?.getBoundingClientRect().width ?? 0
  const containerWidth = imagesContainerRef.current?.clientWidth ?? 0;

  const [firstVisibleItem, setFirstVisibleItem] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const updateCarouselWidth = useCallback((width) => {
    const visibleItems = oneCardWidth ? Math.floor(width / oneCardWidth) : 1;
    setCarouselWidth (visibleItems * oneCardWidth);
  }, [oneCardWidth]);

  const windowSize = useWindowSize(updateCarouselWidth);

  const isMobile = !!(windowSize && (
    windowSize.breakpoint === BREAKPOINTS.untilL ||
    windowSize.breakpoint === BREAKPOINTS.untilM
  ));

  const updateOffset = (newOffset: number) => {
    const maxPossibleOffset = oneCardWidth * items.length - containerWidth;
    setOffset(Math.min(newOffset, maxPossibleOffset));
  };

  const scrollHandlers = useScroll(offset, imagesContainerRef, updateOffset);

  const moveLeft = () => {
    setFirstVisibleItem(firstVisibleItem === 0 ? firstVisibleItem : firstVisibleItem - 1);
  }

  const moveRight = () => {
    setFirstVisibleItem(firstVisibleItem === items.length - 1 ? firstVisibleItem : firstVisibleItem + 1);
  }

  const dotClick = (index: number) => {
    setFirstVisibleItem(index);
  }

  const emptyState = <h3>Cars not found</h3>

  // useEffect(() => {
  //   if (windowSize?.width) {
  //     updateCarouselWidth(windowSize.width < CAROUSEL_MAX_WIDTH ? windowSize.width : CAROUSEL_MAX_WIDTH);
  //   }
  // }, [windowSize?.width, oneCardWidth]);

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
            // transform: `translate3d(-${firstVisibleItem * oneCardWidth}px, 0, 0)`
            transform: `translate3d(-${offset}px, 0, 0)`
          }}

          {...scrollHandlers}
        >
          {items}
        </View>

        <Pagination
          isMobile={isMobile}
          activeItemIndex={firstVisibleItem}
          totalItems={items.length}
          moveLeftHandler={moveLeft}
          moveRightHandler={moveRight}
          dotClickHandler={dotClick}
        />
    </>
  );
};

export default Carousel;