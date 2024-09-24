import React from 'react'
import styled from 'styled-components'
import { SearchOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button as Btn, ConfigProvider } from 'antd'

const Button = ({
  btnName,
  onClick,
  btnText,
  btnType,
  iconMode,
  disabled,
  htmlType,
  ref,
  cancel,
  dupChk,
  width,
}) => {
  // 버튼에 아이콘이 포함한 경우 props로 전달
  const isIconMode = (mode) => {
    switch (mode) {
      case 'search':
        return <SearchOutlined />
      case 'plus':
        return <PlusOutlined />
      case 'delete':
        return <DeleteOutlined />

      default:
        return null
    }
  }

  return (
    <SearchBtnWrap>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: '8px',
            colorPrimary: dupChk ? '#c0c0c0' : cancel ? '#fff' : '#000', // dupChk가 true면 빨간색, 아니면 기본색
            colorTextLightSolid: dupChk ? '#fff' : cancel ? '#000' : '#fff', // dupChk일 때 텍스트 색도 변경
          },
        }}
      >
        <Btn
          className={btnName}
          type={btnType ? btnType : 'primary'}
          icon={isIconMode(iconMode)}
          onClick={onClick}
          disabled={disabled}
          htmlType={htmlType}
          style={{ width: width }}
          // shape="round"
        >
          {btnText}
        </Btn>
      </ConfigProvider>
    </SearchBtnWrap>
  )
}

export default Button

const SearchBtnWrap = styled.div`
  /* width: 100%; */
  .ant-btn {
    width: 100%;
  }
`
