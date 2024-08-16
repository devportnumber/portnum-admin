import React from 'react'
import styled from 'styled-components'
import { Input as Inputs } from 'antd'

const Input = ({ value, inputTitle, placeholder, isReadOnly, onChange }) => {
  const handleChange = (e) => {
    const { value } = e.target
    onChange(value)
  }

  return (
    <div>
      {inputTitle && <InputTitle>{inputTitle}</InputTitle>}
      <Inputs
        style={{
          width: '100%',
        }}
        value={value}
        placeholder={placeholder}
        readOnly={isReadOnly}
        onChange={onChange ? handleChange : onChange}
      />
    </div>
  )
}

export default Input

const InputTitle = styled.h4`
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
`
