import React from "react";
import { View, Flex } from "vcc-ui";

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
          width: '90vw',
        },
        fromL: {
          width: '70vw',
          margin: '0 auto'
        }
    }}>
      <CarList />
    </Flex>
  )
};

export default IndexPage;