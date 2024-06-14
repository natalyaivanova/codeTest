import React from "react";
import { render } from "@testing-library/react";

import { StyleProvider, ThemePicker } from "vcc-ui";

export const testingRender = (ui: React.ReactElement, { ...renderOptions } = {}) => {
  const Wrapper: React.FC = ({ children }: any) => {

    return (
      <React.StrictMode>
        <StyleProvider>
          <ThemePicker variant="light">
            {children}
          </ThemePicker>
        </StyleProvider>
      </React.StrictMode>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}