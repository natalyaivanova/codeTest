import React, { useCallback } from "react";
import { View, SelectInput } from "vcc-ui";

import { FILTER_ALL_VALUE } from "../../constants";
import { FilterProps } from "../../types";

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
        marginLeft: '1vw',
        marginRight: '1vw'
      }}
    >
      <SelectInput
        role="combobox"
        aria-haspopup="listbox"
        aria-label="filter by car body type"

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