import React from 'react'
import styled from 'styled-components'
import { Input as Inputs } from 'antd'

const Input = ({
  value,
  inputTitle,
  placeholder,
  isReadOnly,
  onChange,
  type,
  addonAfter,
  pwd,
}) => {
  const handleChange = (e) => {
    const { value } = e.target
    onChange(value)
  }

  return (
    <div>
      {inputTitle && <InputTitle>{inputTitle}</InputTitle>}
      {pwd ? (
        <Inputs.Password
          style={{
            width: '100%',
          }}
          value={value}
          type={type}
          placeholder={placeholder}
          readOnly={isReadOnly}
          onChange={onChange ? handleChange : onChange}
        />
      ) : (
        <Inputs
          style={{
            width: '100%',
          }}
          value={value}
          type={type}
          placeholder={placeholder}
          readOnly={isReadOnly}
          onChange={onChange ? handleChange : onChange}
          addonAfter={addonAfter}
        />
      )}
    </div>
  )
}

export default Input

const InputTitle = styled.h4`
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
`
