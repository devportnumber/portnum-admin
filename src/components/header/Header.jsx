import React from "react";
import styled from "styled-components";
import LOGO_IMG from "../../assets/logo/brand-logo.svg";
const Header = () => {
  return (
    <Wrap>
      <div>
        <img src={LOGO_IMG} alt="로고 이미지" />
      </div>
      {/* <h1 className="headerTit">PORT’S NUMBER Tab Tab Tab</h1> */}
    </Wrap>
  );
};

export default Header;

const Wrap = styled.header`
  padding: 0px 56px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  .headerTit {
  }
`;
