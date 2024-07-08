import React from "react";
import styled from "styled-components";
import { Select, Space } from "antd";

const SelectOption = ({ selectTitle, selectItems }) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <SelectTitle>{selectTitle}</SelectTitle>
      <Select
        defaultValue={"전체"}
        style={{
          width: "100%",
        }}
        onChange={handleChange}
        options={selectItems}
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
