import React, { useState} from "react";
import { IconButton } from "vcc-ui";
import { isEmpty } from "lodash-es";
import { Flex } from "vcc-ui";

import styles from "./Carousel.module.scss"

interface CarouselProps {
  items: Array<React.ReactElement>;
}

export const Carousel = (props: CarouselProps) => {
  const { items } = props;
  const [currentOffset, setCurrentOffset] = useState(0);

  const moveLeft = () =>
    setCurrentOffset(currentOffset === 0 ? currentOffset : currentOffset - 1);

  const moveRight = () =>
    setCurrentOffset(currentOffset === items.length - 1 ? currentOffset : currentOffset + 1);

  const emptyState = <h3>There are no data</h3>

  return (
    isEmpty(items)
    ? emptyState
    : <div className={styles.carouselWrapper}>
        <Flex
          extend={{
              display: 'flex',
              flexDirection: 'row',
              transition: '0.3s transform ease-out',
              transform: `translate3d(-${currentOffset * 200}px, 0, 0)`
            }}
        >
          {items}
        </Flex>
        <div className={styles.paginationDesktop}>
          <IconButton
            aria-label="Scroll left"
            iconName="navigation-chevronback"
            variant="outline"
            onClick={moveLeft}
            disabled={currentOffset === 0}
          />

          <IconButton
            aria-label="Scroll right"
            iconName="navigation-chevronforward"
            variant="outline"
            onClick={moveRight}
            disabled={currentOffset === items.length - 1}
          />
        </div>
    </div>
  );
};

export default Carousel;