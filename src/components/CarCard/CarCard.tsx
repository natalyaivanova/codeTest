import React from "react";
import { Flex, Link, Text, Block } from "vcc-ui"

import { ROUTES } from "../../constants";
import { ICar} from "../../model/car";

export interface CarCardProps {
  item: ICar;
}

export const CarCard = (props: CarCardProps) => {
  const { item } = props;

  return (
    <Flex
      extend={{
        flexDirection: 'column',
        padding: '1rem'
    }}
    >
      <Text
        extend={{ untilL: { fontSize: '1.3em' }}}
        variant="bates"
        subStyle="emphasis"
      >{item.bodyType.toUpperCase()}</Text>
      <Flex extend={{
        marginBottom: '1rem',
        untilL: {
          flexDirection: 'column'
        },
        fromL: {
          flexDirection: 'row',
          gap: '1rem'
        }
      }}>
        <Text
          extend={{ untilL: { fontSize: '1.3em' }}}
          variant="amundsen"
        >{item.modelName}</Text>
        <Text
          extend={{ untilL: { fontSize: '1.3em' }}}
          variant="bates"
        >{item.modelType}</Text>
      </Flex>

      <Flex extend={{
        untilL: {
          width: '380px'
        },
        fromL: {
          width: '240px'
        }
      }}>
        <img
          src={item.imageUrl}
          alt={`Volvo ${item.modelName} model`}
          width="100%"
          height="100%"
        />
      </Flex>

      <Flex extend={{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '1vw',
        marginTop: '1rem'
      }}>
        <Link href={`${ROUTES.LEARN}/${item.id}`} arrow="right">
          LEARN
        </Link>
        <Link href={`${ROUTES.SHOP}/${item.id}`} arrow="right">
          SHOP
        </Link>
      </Flex>
    </Flex>
  );
};

export default CarCard;