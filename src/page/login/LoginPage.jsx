import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Upload, message, Radio, Form, Flex } from 'antd'

import { useAxios } from '../../hooks/useAxios.jsx'
import { Input, Button } from '../../components/index.js'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.js'

const LoginPage = () => {
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const [loginForm, setLoginForm] = useState({
    email: 'hello2@gmail.com',
    password: 'port8000!',
  })
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    fetchData: loginApi,
    loading: loginLoading,
    data: loginlData,
    error: loginError,
  } = useAxios()

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://portnumber.site/auth/login',
        loginForm,
      )
      console.log('response', response)
      // navigate('/', { replace: true })
      const newToken = response.headers['authorization']
      const newRefresh = response.headers['refresh']
      const newNickName = response?.data.data?.nickName
      // localStorage.setItem('token', newToken)
      login(newToken, newRefresh, newNickName)
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  // 기존 로그인 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin()
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
          // label="이메일"
          // rules={[{ required: true, message: '컨텐츠 명을 입력하세요!' }]}
        >
          <Input placeholder="email" />
        </Form.Item>
        <Form.Item
          name="password"
          // label="비밀번호"
          // rules={[{ required: true, message: '컨텐츠 명을 입력하세요!' }]}
        >
          <Input type="password" placeholder="Password" required />
        </Form.Item>
        <Button btnText="로그인" htmlType={'submit'} onClick={handleSubmit} />
        <LinkGroup>
          <LinkTxt to="/find-id">아이디 찾기</LinkTxt>
          <span>|</span>
          <LinkTxt to="/find-password"> 비밀번호 찾기 </LinkTxt>
          <span>|</span>
          <LinkTxt to="/signup">회원가입</LinkTxt>
        </LinkGroup>
      </FormWrap>
    </Wrap>
  )
}

export default LoginPage
const Wrap = styled.section`
  margin-top: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FormWrap = styled(Form)`
  /* width: 200px;
  height: 300px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  .ant-form-item-control-input-content {
    width: 353px;
    /* height: 60px; */
  }
`
const LinkGroup = styled.div`
  display: flex;
  gap: 20px;
  color: #828282d9;
`

const LinkTxt = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`
