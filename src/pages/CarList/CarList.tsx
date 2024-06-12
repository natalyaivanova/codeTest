import React from "react";
import { Grid, Row } from "vcc-ui";

import { useCars } from "../../hooks/useCars";
import Carousel from "../../components/Carousel";
import CarCard from "../../components/CarCard";
import { ICar } from "../../model/car";

export const CarList: React.FC = () => {
  const { cars } = useCars();
  const carCards = cars.map((item: ICar) =>
    <CarCard
      key={`carCard${item.id}`}
      item={item}
    /> ) ;

  return (
    <Grid>
      <Row align={'center'}>
        <h2 style={{ textAlign: 'center', margin: '10vh' }}>VOLVO products:</h2>
      </Row>
      <Row align={'center'}>
        <Carousel
          items={carCards}
        />
      </Row>
    </Grid>
  );
};

export default CarList;