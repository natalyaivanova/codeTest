import React from "react";
import { act } from "@testing-library/react";
import matchMediaPolyfill from "mq-polyfill";

import { testingRender } from "../../utils/test-utils";
import { useWindowSize } from '../useWindowSize';

const mockDelay = (delay: number): Promise<string> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, delay);
  });

const MockComponent = () => {
  const windowSize = useWindowSize();
  const setWindowSize = jest.fn();

  return (
    <div
      style={{width: '400px', height: '300px'}}
    >
      Test resize
    </div>
  );
};

matchMediaPolyfill(window);
window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height
  }).dispatchEvent(new this.Event("resize"));
};

describe('useWindowSize hook test', () => {
  const spy = jest.fn();
  const testWidth = 420;
  const testHeight = 360;

  beforeEach(() => {
    window.addEventListener('resize', spy);
  });

  it('does not fire resize event by default',  () => {
    testingRender(<MockComponent />);

    expect(spy).not.toHaveBeenCalled();
    expect(window.innerWidth).not.toBe(testWidth);
  });

  it('should be called on window resize', async () => {
    testingRender(<MockComponent />);

    act(() => window.resizeTo(testWidth, testHeight));
    await mockDelay(300);

    expect(spy).toHaveBeenCalled();
  })
})




