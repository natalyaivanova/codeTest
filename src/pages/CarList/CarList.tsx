import React from "react";

import { useCars } from "../../hooks/useCars";
import Carousel from "../../components/Carousel";
import CarCard from "../../components/CarCard";
import { ICar } from "../../model/car";

export const CarList: React.FC = () => {
  const { cars } = useCars();
  const carCards = cars.map((item: ICar) =>
    <CarCard
      key={`carousel${item.id}`}
      item={item}
    /> ) ;

  return (
    <>
      <h2 style={{ textAlign: 'center', margin: '10vh' }}>VOLVO products:</h2>
      <Carousel
        items={carCards}
      />
    </>
  );
};

export default CarList;