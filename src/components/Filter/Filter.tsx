import React, { useCallback } from "react";
import { View, SelectInput } from "vcc-ui";

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
  const { name, label, options, onSelect } = props;
  const [value, setValue] = React.useState(FILTER_ALL_VALUE);

  const filterSelectHandler = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onSelect(name, e.target.value);
  }, [onSelect, setValue, name]);

  return (
    <View
      extend={{
        marginBottom: '2vw',
        padding: '1rem',
      }}
    >
      <SelectInput
        name={name}
        label={label}
        value={value}
        id={name}
        onChange={filterSelectHandler}
      >
        <option value={FILTER_ALL_VALUE} key={`${label}${FILTER_ALL_VALUE}`}>All</option>)
        {options.map(item =>
          <option
            value={item.value}
            key={`${label}${item.value}`}
          >{item.label}</option>)}
      </SelectInput>
    </View>
   );
};

export default Filter;