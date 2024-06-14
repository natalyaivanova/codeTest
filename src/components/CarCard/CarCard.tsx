import React from "react";
import Image from 'next/image';
import { Flex, View, Link, Text } from "vcc-ui"

import { ROUTES } from "../../constants";
import { CarCardProps } from "../../types";

export const CarCard = (props: CarCardProps) => {
  const { item } = props;

  return (
    <View
      role="group"
      aria-roledescription="car slide"
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
      <Text subStyle="emphasis" fg="foreground.secondary">
        {item.bodyType.toUpperCase()}
      </Text>

      <Flex extend={{
        marginBottom: '1rem',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        untilL: {
          flexDirection: 'column'
        },
        fromL: {
          flexDirection: 'row'
        }
      }}>
        <Text variant="amundsen" extend={{ paddingRight: '10px' }}>
          {item.modelName}
        </Text>
        <Text fg="foreground.secondary">
          {item.modelType}
        </Text>
      </Flex>

      <Flex
        role="img"
        aria-label="car image"
      >
        <Image
          src={item.imageUrl}
          alt={`Volvo ${item.modelName} model`}
          width={'290'}
          height={'220'}
          layout="responsive"
          objectFit="cover"
        />
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