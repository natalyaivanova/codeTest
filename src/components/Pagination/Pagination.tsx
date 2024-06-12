import React from "react";
import { IconButton } from "vcc-ui";
import { Flex, Click } from "vcc-ui";

const ARIA_LABELS = {
  LEFT: 'Go to previous car',
  RIGHT: 'Go to next car',
  CLICK: 'Select car'
}

interface PaginationProps {
  isMobile: boolean;
  activeItemIndex: number;
  totalItems: number;
  moveLeftHandler: () => void;
  moveRightHandler: () => void;
  dotClickHandler: (index: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const {
    isMobile,
    totalItems,
    activeItemIndex,
    moveLeftHandler,
    moveRightHandler,
    dotClickHandler
  } = props;

  return (
    isMobile
      ? <Flex
          extend={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginRight: '.5vw',
            marginTop: '1rem',
            gap: '1vw'
          }}
      >
        {new Array(totalItems).fill(0).map((_, index: number) => (
          <Click
            extend={{
              width: '0.6rem',
              height: '0.6rem',
              borderRadius: '100%',
              backgroundColor: index === activeItemIndex ? '#222' : '#d5d5d5',
              border: 'none',
              padding: '0'
            }}
            key={`dot${index}`}
            onClick={() => dotClickHandler(index)}
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
          onClick={moveLeftHandler}
          disabled={activeItemIndex === 0}
        />

        <IconButton
          aria-label={ARIA_LABELS.RIGHT}
          iconName="navigation-chevronforward"
          variant="outline"
          onClick={moveRightHandler}
          disabled={activeItemIndex === totalItems - 1}
        />
      </Flex>
  );
};

export default Pagination;