import React from "react";
import styled from "styled-components";

const BoxShadow = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};

export default BoxShadow;

const Wrap = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  width: 100%;
  background: #fff;
  border-radius: 15px;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 28px;
`;
