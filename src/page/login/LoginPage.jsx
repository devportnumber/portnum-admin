import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Upload, message, Radio, Form, Flex } from 'antd'

import { Input, Button } from '../../components/index.js'

const LoginPage = () => {
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 기존 로그인 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        (value) => {
          // setIsButtonEnabled(true)
        },
        () => {
          // setIsButtonEnabled(false)
        },
      )
  }, [form, values])

  return (
    <Wrap>
      <FormWrap form={form} onSubmit={handleSubmit}>
        <Form.Item
          name="email"
          label="이메일"
          // rules={[{ required: true, message: '컨텐츠 명을 입력하세요!' }]}
        >
          <Input value={email} placeholder="email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="비밀번호"
          // rules={[{ required: true, message: '컨텐츠 명을 입력하세요!' }]}
        >
          <Input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            required
          />
        </Form.Item>
        <Button btnText="로그인" htmlType={'submit'} />
      </FormWrap>
    </Wrap>
  )
}

export default LoginPage

const FormWrap = styled(Form)`
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const Wrap = styled.section`
  margin-top: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
