import React from "react";
import styled from "styled-components";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

const RangeDatePicker = () => {
  return (
    <div>
      <DateTitle>기간</DateTitle>
      <RangePicker
        style={{
          width: "100%",
        }}
      />
    </div>
  );
};

export default RangeDatePicker;

const DateTitle = styled.h4`
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
`;
