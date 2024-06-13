import React, { useCallback, useEffect, useState } from "react";
import { Grid, Row } from "vcc-ui";
import { uniqWith, isEqual } from "lodash-es";

import { useCars } from "../../hooks/useCars";
import Carousel from "../../components/Carousel";
import CarCard from "../../components/CarCard";
import { ICar } from "../../model/car";
import Filter from "../../components/Filter";
import { FILTER_ALL_VALUE } from "../../constants";

export const CarList: React.FC = () => {
  const initialCars = useCars();
  const bodyTypeFilterOptions = uniqWith(
    initialCars.map(item => ({ label: item.bodyType, value: item.bodyType })),
    isEqual);

  const getCarCards = useCallback((cars: ICar[]) =>
    cars.map((item: ICar) => <CarCard
      key={`carCard${item.id}`}
      item={item}
    /> ), []);

  const [carCards, setCarCards] = useState(
    getCarCards(initialCars)
  ) ;

  const onSelectFilter = (name: string, value: string) =>
    value === FILTER_ALL_VALUE
      ? setCarCards(getCarCards(initialCars))
      : setCarCards(getCarCards(initialCars.filter(item => item[name] === value)));

  useEffect(() => {
    setCarCards(getCarCards(initialCars));
  }, [initialCars, setCarCards, getCarCards]);

  return (
    <Grid>
      <Row align={'center'}>
        <h2 style={{ textAlign: 'center', margin: '10vh' }}>VOLVO cars:</h2>
      </Row>
      <Row align={'center'}>
        <Filter
          name="bodyType"
          label="Body type"
          options={bodyTypeFilterOptions}
          onSelect={onSelectFilter}
        />
      </Row>
      <Row>
        <Carousel items={carCards} />
      </Row>
    </Grid>
  );
};

export default CarList;