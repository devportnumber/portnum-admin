import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Upload, message, Radio, Form, Flex } from 'antd'

import { useAxios } from '../../hooks/useAxios.jsx'
import { Input, Button } from '../../components/index.js'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.js'

const FindPwdPage = () => {
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const navigate = useNavigate()

  const [findPwdForm, setFindPwdForm] = useState({
    nickName: '',
    email: '',
  })

  const {
    fetchData: findPwdApi,
    data: findPwdData,
    error: findPwdError,
  } = useAxios()

  // 비밀번호 찾기 제출 함수
  const handleSubmit = (values) => {
    findPwdApi('/lost/password', 'POST', values, null)
  }

  useEffect(() => {
    console.log('findPwdData', findPwdData)
    if (findPwdData?.data === true) {
      alert('입력하신 메일로 임시 비밀번호를 발송했습니다.')
      navigate('/login')
    } else if (findPwdData?.data === false) {
      alert('존재하지 않는 회원 정보입니다.')
    }
  }, [findPwdData])

  // const handleFindPwd = async () => {
  //   try {
  //     const response = await axios.post(
  //       'http://localhost:8080/admin/lost/password',
  //       findPwdForm,
  //     )
  //     console.log('비번찾기response', response)
  //     if (response?.data === true) {
  //       alert('입력하신 메일로 임시 비밀번호를 발송했습니다.')
  //     } else {
  //       alert('존재하지 않는 회원 정보입니다.')
  //     }
  //   } catch (error) {
  //     console.error('Find Password failed:', error)
  //   }
  // }

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
    <PwdForm
      form={form}
      name="lostPwd"
      onFinish={handleSubmit}
      initialValues={findPwdForm}
      onValuesChange={(changedValues, allValues) => {
        // changedValues: 변경된 필드의 이름과 값
        // allValues: 현재 폼의 모든 값
        setFindPwdForm({ ...findPwdForm, ...changedValues })
      }}
    >
      <h2 className="title"> 비밀번호 찾기</h2>
      <Form.Item
        label="닉네임"
        name="nickName"
        layout="vertical"
        rules={[{ required: true, message: '닉네임을 입력해주세요!' }]}
      >
        <Input placeholder="닉네임을 입력해주세요" />
      </Form.Item>
      <Form.Item
        label="가입시 이메일"
        name="email"
        layout="vertical"
        rules={[
          { required: true, message: '이메일을 입력해주세요!' },
          {
            type: 'email',
            message: '적합하지 않은 이메일 형식입니다. 다시 입력해주세요',
          },
        ]}
      >
        <Input placeholder="ex)portnumber@" />
      </Form.Item>
      <Button
        btnText="비밀번호 찾기"
        htmlType={'submit'}
        // onClick={handleSubmit}
      />
    </PwdForm>
  )
}

export default FindPwdPage

const PwdForm = styled(Form)`
  width: 432px;
  margin-top: 285px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .ant-form-item {
    width: 100%;
    height: 60px;
  }
  .title {
    font-size: 24px;
    color: #000;
    margin-bottom: 20px;
    font-weight: 600;
  }
  button {
    margin-top: 20px;
  }
`
