import React from "react";
import { AppProps } from "next/app";
import { StyleProvider, ThemePicker } from "vcc-ui";

import "../public/css/styles.css";

function TestApp({ Component }: AppProps) {
  return (
    <React.StrictMode>
      <StyleProvider>
        <ThemePicker variant="light">
          <Component />
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}

export default TestApp;
