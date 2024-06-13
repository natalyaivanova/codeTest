import React from "react";
import { Flex } from "vcc-ui";

import CarList from "../src/pages/CarList";

const IndexPage = () => {
  return (
    <Flex
      extend={{
        overflowX: 'hidden',
        untilM: {
          width: '100vw',
          padding: 5,
        },
        untilL: {
          width: '100vw',
        },
        fromL: {
          width: '90vw',
          margin: '0 auto'
        }}}
    >
      <CarList />
    </Flex>
  )
};

export default IndexPage;