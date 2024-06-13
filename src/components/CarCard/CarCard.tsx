import React from "react";
import Image from 'next/image';
import { Flex, View, Link, Text } from "vcc-ui"

import { ROUTES } from "../../constants";
import { ICar} from "../../model/car";

export interface CarCardProps {
  item: ICar;
}

export const CarCard = (props: CarCardProps) => {
  const { item } = props;

  return (
    <View
      extend={{
        flexDirection: 'column',
        padding: '1rem',
        onlyS: {
          width: '70vw'
        },
        onlyM: {
          width: '45vw',
        },
        fromL: {
          width: '18vw',
        }
      }}
    >
      <Text extend={{ untilL: { fontSize: '1.2em' }}} variant="bates" subStyle="emphasis" fg="fg.secondary">
        {item.bodyType.toUpperCase()}
      </Text>

      <Flex extend={{
        marginBottom: '1rem',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
      }}>
        <Text variant="amundsen">
          {item.modelName}
        </Text>
        <Text variant="bates">
          {item.modelType}
        </Text>
      </Flex>

      <Flex>
        <Image
          src={item.imageUrl}
          alt={`Volvo ${item.modelName} model`}
          width={'290'}
          height={'220'}
          layout="responsive"
          objectFit="cover"
        />

        {/*<img*/}
        {/*  src={item.imageUrl}*/}
        {/*  alt={`Volvo ${item.modelName} model`}*/}
        {/*  width={'290'}*/}
        {/*  height={'220'}*/}
        {/*  objectFit="cover"*/}
        {/*/>*/}
      </Flex>

      <Flex extend={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '1rem',
        gap: '2rem'
      }}>
        <Link href={`${ROUTES.LEARN}/${item.id}`} arrow="right">
          LEARN
        </Link>
        <Link href={`${ROUTES.SHOP}/${item.id}`} arrow="right">
          SHOP
        </Link>
      </Flex>
    </View>
  );
};

export default CarCard;