'use client';

import React from 'react';
import Select from "react-select";

const options = [
  { value: 'chocolate', label: 'Chocolate', color: '#00B8D9' },
  { value: 'strawberry', label: 'Strawberry', color: '#00B8D9' },
  { value: 'vanilla', label: 'Vanilla', color: '#00B8D9' },
];

const style = {
  option: (styles, { isSelected }) => ({
    ...styles,
    backgroundColor: !isSelected && 'transparent',
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    opacity: 100,
  }),
};

const BasicSelect = (props) => {
  const {
    label = 'Select a value',
    items = [],

    isSearchable = true,
    customStyle = {},
  } = props;
  const [selectedValue, setValue] = React.useState('');

  let value = props?.value || '';

  const handleChange = (event) => {
    value = selectedValue;
    setValue(event.target.value);
  };
  return (
    <Select
      options={items}
      onChange={props?.handleChange || handleChange}
      placeholder={label}
      isSearchable={isSearchable}
      // className="select"
      value={value? {label: value}: ''}
      ref={props.refValue}
      // styles={{ ...style, ...customStyle }}
    />
  );
};


export { BasicSelect };
