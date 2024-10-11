import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Upload, message, Radio, Form, Flex } from 'antd'

import { useAxios } from '../../hooks/useAxios.jsx'
import { Input, Button } from '../../components/index.js'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.js'

// 아이디 찾기
const FindLongIdPage = () => {
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const navigate = useNavigate()
  const adminId = parseInt(localStorage.getItem('adminId')) || null

  const [findLoginIdForm, setFindLoginIdForm] = useState({
    name: '',
    email: '',
  })

  const {
    fetchData: findLoginIdApi,
    data: findLoginIdData,
    error: findLoginIdError,
  } = useAxios()

  // 아이디 찾기 제출 함수
  const handleSubmit = (values) => {
    findLoginIdApi('/lost/loginId', 'POST', values, null)
  }

  useEffect(() => {
    console.log('findLoginIdData', findLoginIdData)
    if (findLoginIdData?.success === true) {
      alert(`아이디: ${findLoginIdData.data}`)
      navigate('/login')
    } else if (findLoginIdData?.success === false) {
      alert('아이디 찾기 실패 되었습니다.')
      return
    }
  }, [findLoginIdData])

  return (
    <FindIdForm
      form={form}
      name="lostId"
      onFinish={handleSubmit}
      initialValues={findLoginIdForm}
      onValuesChange={(changedValues, allValues) => {
        // changedValues: 변경된 필드의 이름과 값
        // allValues: 현재 폼의 모든 값
        setFindLoginIdForm({ ...findLoginIdForm, ...changedValues })
      }}
    >
      <h2 className="title"> 아이디 찾기</h2>
      <Form.Item
        label="이름"
        name="name"
        layout="vertical"
        rules={[{ required: true, message: '아이디를 입력해주세요!' }]}
      >
        <Input placeholder="이름을 입력해주세요" />
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
        btnText="아이디 찾기"
        htmlType={'submit'}
        // onClick={handleSubmit}
      />
    </FindIdForm>
  )
}

export default FindLongIdPage

const FindIdForm = styled(Form)`
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
