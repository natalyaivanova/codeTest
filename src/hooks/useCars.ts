import { useEffect, useState } from "react";

import { ICar } from "../model/car";
import { getCars } from "../api/cars";

export function useCars() {
  const [cars, setCars] = useState<ICar[]>([])

  useEffect(() => {
    getCars().then(res => setCars(res))
  }, [])

  return cars;
}