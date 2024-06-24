import React from "react";
import styled from "styled-components";
import { Select, Space } from "antd";

const SelectOption = ({ selectTitle }) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <SelectTitle>{selectTitle}</SelectTitle>
      <Select
        defaultValue="test1"
        style={{
          width: "100%",
        }}
        onChange={handleChange}
        options={[
          {
            value: "test1",
            label: "test1",
          },
          {
            value: "test2",
            label: "test2",
          },
          {
            value: "test3",
            label: "test3",
          },
        ]}
      />
    </div>
  );
};

export default SelectOption;

const SelectTitle = styled.h4`
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
`;
