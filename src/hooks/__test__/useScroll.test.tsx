import React, { useRef} from 'react';
import { fireEvent } from "@testing-library/react";

import { useScroll } from "../useScroll";
import { testingRender } from "../../utils/test-utils";

const MockComponent = ({offset, updateOffset }: any) => {
  const ref = useRef(null);
  const scrollHandlers = useScroll(offset, ref, updateOffset);

  return (
    <div
      ref={ref}
      {...scrollHandlers}
      style={{ width: '400px', height: '300px' }}
    >
      Test scroll
    </div>
  );
};

describe('useScroll hook test', () => {
  let updateOffset: (offset: number) => void;

  beforeEach(() => {
    updateOffset = jest.fn();
  });

  it('handles mouse events correctly', () => {
    const { getByText } = testingRender(
      <MockComponent
        offset={0}
        updateOffset={updateOffset}
      />
    );

    const element = getByText('Test scroll');

    fireEvent.mouseDown(element, { clientX: 100 });
    fireEvent.mouseMove(element, { clientX: 150 });
    fireEvent.mouseUp(element);

    expect(updateOffset).toHaveBeenCalled();
  });

  it('handles touch events correctly', () => {
    const { getByText } = testingRender(
      <MockComponent
        offset={0}
        updateOffset={updateOffset}
      />
    );

    const element = getByText('Test scroll');

    fireEvent.touchStart(element, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(element, { touches: [{ clientX: 150 }] });
    fireEvent.touchEnd(element);

    expect(updateOffset).toHaveBeenCalled();
  });
});

