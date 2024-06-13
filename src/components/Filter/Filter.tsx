import React, { useCallback } from "react";
import { Flex } from "vcc-ui";

import { IFilterOption } from "./Filters.types";
import { FILTER_ALL_VALUE } from "../../constants";

interface FilterProps {
  name: string;
  label: string;
  value?: string;
  options: IFilterOption[];
  onSelect: (key: string, value: string) => void;
}

export const Filter = (props: FilterProps) => {
  const { name, label, value, options, onSelect } = props;

  const filterSelectHandler = useCallback((e: React.ChangeEvent<HTMLSelectElement>) =>
    onSelect(name, e.target.value), [onSelect, name]);

  return (
    <Flex
      extend={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem'
      }}
    >
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        onChange={filterSelectHandler}
        style={{
          width: '200px',
          height: '35px'
        }}
      >
        <option value={FILTER_ALL_VALUE} key={`${label}${FILTER_ALL_VALUE}`}>All</option>)
        {options.map(item =>
          <option
            value={item.value}
            key={`${label}${item.value}`}
          >{item.label}</option>)}
      </select>
    </Flex>
   );
};

export default Filter;