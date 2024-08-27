import React from 'react'
import styled from 'styled-components'
import { Select, Space } from 'antd'

const SelectOption = ({ selectTitle, selectItems, onChange }) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`)
    if (onChange) {
      onChange(value) // onChange 콜백 호출
    }
  }
  return (
    <div>
      <SelectTitle>{selectTitle}</SelectTitle>
      <Select
        defaultValue={'전체'}
        style={{
          width: '100%',
        }}
        onChange={onChange}
        options={selectItems}
      />
    </div>
  )
}

export default SelectOption

const SelectTitle = styled.h4`
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
`
