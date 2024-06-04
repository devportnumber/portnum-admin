import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Side = styled.div`
  background: #4f5d75;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 292px;
  height: 100vh;
`;

const MenuHead = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #818181;
`;
const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled.p`
  font-size: 14px;
  color: #fff;
  margin-bottom: 20px;
`;

const SideBar = () => {
  const menus = [
    { name: "서비스 관리", path: "/" },
    { name: "팝업관리", path: "/popup" },
    { name: "버튼 관리", path: "/buttonMng" },
  ];
  return (
    <Side>
      <MenuHead></MenuHead>
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink
              to={menu.path}
              key={index}
              activeStyle={{ color: "black" }}
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
