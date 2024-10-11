import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Upload, message, Radio, Form, Flex } from 'antd'

import { useAxios } from '../../hooks/useAxios.jsx'
import { Input, Button } from '../../components/index.js'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.js'

// 비밀번호 재설정 페이지
const FindResetPwdPage = () => {
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const navigate = useNavigate()
  const adminId = parseInt(localStorage.getItem('adminId')) || null

  const [resetPwdForm, setResetPwdForm] = useState({
    adminId: parseInt(adminId),
    newPassword: '',
    // oldPassword: '',
  })

  const {
    fetchData: resetPwdApi,
    data: resetPwdData,
    error: resetPwdError,
  } = useAxios()

  // 비밀번호 재설정 제출 함수
  const handleSubmit = () => {
    const { confirmNewPassword, ...requestData } = resetPwdForm
    resetPwdApi('/password', 'PATCH', requestData, null)
  }

  useEffect(() => {
    console.log('resetPwdData', resetPwdData)
    if (resetPwdData?.data === true) {
      alert('비밀번호가 재설정 되었습니다.')
      navigate('/')
    } else if (resetPwdData?.data === false) {
      alert('비밀번호가 재설정 실패 되었습니다.')
    }
  }, [resetPwdData])

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
    <RestPwdForm
      form={form}
      name="lostPwd"
      onFinish={handleSubmit}
      initialValues={resetPwdForm}
      onValuesChange={(changedValues, allValues) => {
        // changedValues: 변경된 필드의 이름과 값
        // allValues: 현재 폼의 모든 값
        setResetPwdForm({ ...resetPwdForm, ...changedValues })
      }}
    >
      <h2 className="title"> 비밀번호 재설정</h2>
      <Form.Item
        label="비밀번호"
        name="newPassword"
        layout="vertical"
        rules={[
          { required: true, message: '비밀번호 확인란을 입력해주세요.' },
          {
            min: 8,
            message: '비밀번호는 최소 8자 이상이어야 합니다!',
          },
          {
            max: 20,
            message: '비밀번호는 최대 20자 이하여야 합니다!',
          },
          {
            pattern:
              /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/,
            message:
              '비밀번호는 영문, 숫자, 특수문자를 포함한 8~20자리여야 합니다.',
          },
          {
            validator: (_, value) => {
              if (value && value === form.getFieldValue('email')) {
                return Promise.reject(
                  '아이디와 같은 비밀번호는 사용하실 수 없습니다.',
                )
              }
              return Promise.resolve()
            },
          },
        ]}
        help="영문, 숫자, 특수문자를 포함한 8~20자리의 비밀번호를 입력해 주세요.
아이디와 같은 비밀번호는 사용하실 수 없습니다."
      >
        <Input type="password" placeholder="비밀번호를 입력해주세요" />
      </Form.Item>
      <Form.Item
        label="비밀번호 확인"
        name="confirmNewPassword"
        layout="vertical"
        rules={[
          { required: true, message: '비밀번호를 확인해주세요!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'))
            },
          }),
        ]}
      >
        <Input type="password" placeholder="비밀번호를 다시 입력해주세요" />
      </Form.Item>
      <Button
        btnText="비밀번호 재설정"
        htmlType={'submit'}
        // onClick={handleSubmit}
      />
    </RestPwdForm>
  )
}

export default FindResetPwdPage

const RestPwdForm = styled(Form)`
  width: 432px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
