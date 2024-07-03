import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const SideBar = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: "serviceMng",
      label: "서비스관리",
      // icon: <SettingOutlined />,
      children: [
        {
          key: "1",
          label: "팝업관리",
          path: "/",
        },
        {
          key: "2",
          label: "버튼관리",
          path: "/buttonMng",
        },
      ],
    },
  ];
  const menus = [
    { name: "팝업관리", path: "/" },
    { name: "버튼관리", path: "/buttonMng" },
  ];
  const onClick = (e) => {
    console.log("e", e);
    // const path = items.find((item) => item.key === key)?.path;
    // if (path) {
    //   navigate(path);
    // }
  };
  return (
    <Side>
      <MenuHead>관리자</MenuHead>
      <Menu
        onClick={onClick}
        style={{
          width: 220,
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["serviceMng"]}
        mode="inline"
        items={items}
      />
      {/* <MenuHead>관리자</MenuHead> */}
      {/* <Menu>
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
      </Menu> */}
    </Side>
  );
};

export default SideBar;

const Side = styled.div`
  /* height: 100%; */
  /* background: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 256px;
  height: 100vh;
  border-right: 1px solid #d9d9d9; */
`;

const MenuHead = styled.h4`
  /* width: 100%;
  height: 100px; */
  padding: 32px 18px 10px;
  font-size: 16px;
  font-weight: 700;
  color: #000;
  text-align: left;
`;
// const Menu = styled.div`
//   margin-top: 30px;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// `;

const SidebarItem = styled.p`
  padding: 15px 20px;
  font-size: 14px;
  color: #000;
  &:hover {
    background-color: #cccccc;
    color: white;
  }
`;
