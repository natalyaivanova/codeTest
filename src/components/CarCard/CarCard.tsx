import React from "react";
import { Flex, Link, Text } from "vcc-ui"

import { ROUTES } from "../../constants";
import styles from "./CarCard.module.scss"
import { ICar} from "../../model/car";

export interface CarCardProps {
  item: ICar;
}

const sizes = {
  imageWidth: 267,
  imageHeight: 200
}

export const CarCard = (props: CarCardProps) => {
  const { item } = props;

  return (
    <Flex
      extend={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'left',
        margin: '1rem'
    }}
    >
      <Text variant="bates" subStyle="emphasis">{item.bodyType.toUpperCase()}</Text>
      <div className={styles.carCardSubtext}>
        <Text variant="amundsen">{item.modelName}</Text>
        <Text variant="bates" subStyle="inline-link">{item.modelType}</Text>
      </div>

      <img
        src={item.imageUrl}
        alt={`Volvo ${item.modelName} model`}
        width={sizes.imageWidth}
        height={sizes.imageHeight}
      />

      <div className={styles.carCardLinks}>
        <Link href={`${ROUTES.LEARN}/${item.id}`} arrow="right">
          LEARN
        </Link>
        <Link href={`${ROUTES.SHOP}/${item.id}`} arrow="right">
          SHOP
        </Link>
      </div>
    </Flex>
  );
};

export default CarCard;