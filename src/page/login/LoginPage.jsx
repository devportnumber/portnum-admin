import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Upload, message, Radio, Form, Flex } from 'antd'
import { useAxios } from '../../hooks/useAxios.jsx'
import { Input, Button } from '../../components/index.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const [loginForm, setLoginForm] = useState({
    email: 'hello2@gmail.com',
    password: 'port8000!',
  })
  const navigate = useNavigate()

  const {
    fetchData: loginApi,
    loading: loginLoading,
    data: loginlData,
    error: loginError,
  } = useAxios()

  const login = async () => {
    try {
      const response = await axios.post(
        'https://portnumber.site/auth/login',
        loginForm,
      )
      console.log('response', response)
      navigate('/', { replace: true })
      const newToken = response.headers['authorization']
      localStorage.setItem('token', newToken)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  // 기존 로그인 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault()
    await login()
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
      <FormWrap
        form={form}
        onSubmit={handleSubmit}
        initialValues={loginForm}
        onValuesChange={(changedValues, allValues) => {
          // changedValues: 변경된 필드의 이름과 값
          // allValues: 현재 폼의 모든 값
          setLoginForm({ ...loginForm, ...changedValues })
        }}
      >
        <Form.Item
          name="email"
          label="이메일"
          // rules={[{ required: true, message: '컨텐츠 명을 입력하세요!' }]}
        >
          <Input placeholder="email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="비밀번호"
          // rules={[{ required: true, message: '컨텐츠 명을 입력하세요!' }]}
        >
          <Input type="password" placeholder="Password" required />
        </Form.Item>
        <Button btnText="로그인" htmlType={'submit'} onClick={handleSubmit} />
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
