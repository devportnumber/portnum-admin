import React from "react";
import styled from "styled-components";
import { Input as Inputs } from "antd";

const Input = ({ inputTitle, placeholder }) => {
  return (
    <div>
      <InputTitle>{inputTitle}</InputTitle>
      <Inputs
        style={{
          width: "100%",
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;

const InputTitle = styled.h4`
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
`;
