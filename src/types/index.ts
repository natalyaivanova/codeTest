import {ICar} from "../model/car";
import React from "react";
import {IFilterOption} from "../components/Filter/Filters.types";

export interface CarCardProps {
  item: ICar;
}

export interface CarouselProps {
  items: Array<React.ReactElement>;
}

export interface FilterProps {
  name: string;
  label: string;
  value?: string;
  options: IFilterOption[];
  onSelect: (key: string, value: string) => void;
}
