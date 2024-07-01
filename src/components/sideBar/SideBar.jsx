import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
// import { Layout, Menu } from "antd";

const SideBar = () => {
  const menus = [
    { name: "팝업관리", path: "/" },
    { name: "버튼관리", path: "/buttonMng" },
  ];
  return (
    <Side>
      {/* <MenuHead>관리자</MenuHead> */}
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink
              to={menu.path}
              key={index}
              // activeStyle={{ color: "black" }}
            >
              <SidebarItem>{menu.name}</SidebarItem>
            </NavLink>
          );
        })}
      </Menu>
    </Side>
  );
};

export default SideBar;

const Side = styled.div`
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 256px;
  height: 100vh;
  border-right: 1px solid #d9d9d9;
`;

const MenuHead = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #e0e0e0;
`;
const Menu = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled.p`
  padding: 15px 20px;
  font-size: 14px;
  color: #000;
  &:hover {
    background-color: #cccccc;
    color: white;
  }
`;
