import React from "react";
import styled from "styled-components";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button as Btn, ConfigProvider } from "antd";

const Button = ({
  btnName,
  onClick,
  btnText,
  btnType,
  iconMode,
  disabled,
  isSubmit,
  ref,
  cancel,
}) => {
  // 버튼에 아이콘이 포함한 경우 props로 전달
  const isIconMode = (mode) => {
    switch (mode) {
      case "search":
        return <SearchOutlined />;
      case "plus":
        return <PlusOutlined />;
      case "delete":
        return <DeleteOutlined />;

      default:
        return null;
    }
  };

  //submit 타입 설정
  const buttonType = isSubmit ? "submit" : "button";

  return (
    <SearchBtnWrap>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: "5px",
            colorPrimary: cancel ? "#FF2E2E" : "#4F5D75",
            colorTextLightSolid: "#fff",
          },
        }}
      >
        <Btn
          className={btnName}
          type={btnType ? btnType : "primary"}
          icon={isIconMode(iconMode)}
          // shape="round"
          onClick={onClick}
          disabled={disabled}
          htmlType={buttonType}
          // ref={ref}
        >
          {btnText}
        </Btn>
      </ConfigProvider>
    </SearchBtnWrap>
  );
};

export default Button;

const SearchBtnWrap = styled.div`
  /* width: 100%; */
`;
