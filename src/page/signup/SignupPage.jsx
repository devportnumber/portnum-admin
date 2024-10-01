import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Upload, message, Radio, Form, Flex, Button as Buttons } from 'antd'
import { Input, Button } from '../../components/index'
import { useAxios } from '../../hooks/useAxios'

const SignupPage = () => {
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const navigate = useNavigate()

  const [signupForm, setSignupForm] = useState({
    email: '',
    nickName: '',
    name: '',
    password: '',
  })
  // 닉네임 중복 체크
  const {
    fetchData: nicknameChkApi,
    data: nicknameChkData,
    error: nicknameChkError,
  } = useAxios()

  // 이메일 중복 체크
  const {
    fetchData: emailChkApi,
    data: emailChkData,
    error: emailChkError,
  } = useAxios()

  // 회원가입
  const {
    fetchData: signupApi,
    data: signupData,
    error: signupError,
  } = useAxios()

  const [isNicknameChecked, setIsNicknameChecked] = useState(false)
  const [isEmailChecked, setIsEmailChecked] = useState(false)

  const [nicknameSuccessMessage, setNicknameSuccessMessage] = useState('')
  const [emailSuccessMessage, setEmailSuccessMessage] = useState('')

  // ✅ API 닉네임 중복 체크 GET
  const checkNickname = () => {
    const nickname = signupForm?.nickName
    console.log('nickname', nickname)
    nicknameChkApi('/valid/nickName', 'GET', null, { value: nickname })
  }

  // ✅ API 이메일 중복 체크 GET
  const checkEmail = () => {
    const email = signupForm?.email
    emailChkApi('/valid/email', 'GET', null, { value: email })
  }

  // ✅ API 회원가입 POST
  const onFinish = (values) => {
    console.log('Form values:', values)
    if (!isNicknameChecked) {
      alert('닉네임 중복 확인을 해주세요.')
      return
    }
    if (!isEmailChecked) {
      alert('이메일 중복 확인을 해주세요.')
      return
    }
    signupApi('/signup', 'POST', values, null)
  }

  useEffect(() => {
    if (signupData?.success === true) {
      alert('회원가입 성공 ')
      navigate('/login')
    } else if (signupData?.success === false && signupData.code === 30001) {
      alert('이미 존재하는 아이디 또는 닉네임입니다.')
      return
    } else {
      return
    }
  }, [signupData])

  // 닉네임 체크
  useEffect(() => {
    if (nicknameChkData?.data === true) {
      form.setFields([
        {
          name: 'nickName',
          errors: ['이미 사용중인 닉네임입니다.'],
        },
      ])
      setNicknameSuccessMessage('')
      setIsNicknameChecked(false)
      //   alert('닉네임 중복됩니다.')
    } else if (nicknameChkData?.data === false) {
      setIsNicknameChecked(true)
      setNicknameSuccessMessage('사용 가능한 닉네임입니다.')
      form.setFields([{ name: 'nickName', errors: [] }])
    }
  }, [nicknameChkData])

  useEffect(() => {
    if (emailChkData?.data === true) {
      form.setFields([
        {
          name: 'email',
          errors: ['이미 사용중인 이메일입니다.'],
        },
      ])
      setEmailSuccessMessage('')
      setIsEmailChecked(false)
    } else if (emailChkData?.data === false) {
      setIsEmailChecked(true)
      setEmailSuccessMessage('사용 가능한 이메일입니다.')
      form.setFields([{ name: 'email', errors: [] }])
    }
  }, [emailChkData])

  return (
    <SignupForm
      form={form}
      name="signup"
      layout="vertical"
      onFinish={onFinish}
      initialValues={signupForm}
      onValuesChange={(changedValues, allValues) => {
        setSignupForm({ ...signupForm, ...changedValues })
      }}
    >
      <h2 className="title">포트넘버 회원가입</h2>
      <Form.Item
        label="이름"
        name="name"
        rules={[
          { required: true, message: '이름을 입력해주세요!' },
          {
            min: 2,
            message: '이름은 최소 2글자 이상 입력해 주세요. (띄어쓰기 가능)',
          },
        ]}
        help="최소 2글자 이상(한글, 영어) 입력해 주세요. (띄어쓰기 가능)"
      >
        <Input placeholder="이름을 입력해주세요" />
      </Form.Item>
      <NickNameWrap>
        <Form.Item
          label="닉네임"
          name="nickName"
          help={
            // 처음에는 기본 도움말을 보여주고, 중복 체크 후 성공 또는 에러 메시지로 교체
            nicknameSuccessMessage ? (
              <span style={{ color: 'green' }}>{nicknameSuccessMessage}</span>
            ) : form.getFieldError('nickName').length > 0 ? (
              <span style={{ color: 'red' }}>
                {form.getFieldError('nickName')[0]}
              </span>
            ) : (
              <div className="ninknameHelp">
                <p>영문, 숫자 이외 특수문자는 입력할 수 없습니다.</p>
                <p>닉네임은 본인 페이지 주소로 활용됩니다.</p>
                <p>ex)portnumber.site/portnumber</p>
              </div>
            )
          }
          rules={[
            { required: true, message: '닉네임을 입력해주세요!' },
            //   {
            //     pattern: /^[a-zA-Z0-9]*$/,
            //     message:
            //       '닉네임은 영문, 숫자 이외의 특수문자는 입력할 수 없습니다.',
            //   },
          ]}
          // help={
          //   nicknameSuccessMessage ? (
          //     <span style={{ color: 'green' }}>{nicknameSuccessMessage}</span>
          //   ) : (
          //     <div className="ninknameHelp">
          //       <p>영문, 숫자 이외 특수문자는 입력할 수 없습니다.</p>
          //       <p>닉네임은 본인 페이지 주소로 활용됩니다.</p>
          //       <p> ex)portnumber.site/portnumber)</p>
          //     </div>
          //   )
          // }
          // help={
          //   <div className="ninknameHelp">
          //     <p>영문, 숫자 이외 특수문자는 입력할 수 없습니다.</p>
          //     <p>닉네임은 본인 페이지 주소로 활용됩니다.</p>
          //     <p> ex)portnumber.site/portnumber)</p>
          //   </div>
          // }
        >
          <Input placeholder="닉네임을 입력해주세요" />
        </Form.Item>
        <Button
          btnText="중복 확인"
          dupChk
          // width={'144px'}
          onClick={checkNickname}
          // onClick={handleSubmit}
        />
      </NickNameWrap>
      <EmailWrap>
        <Flex gap="small" align="center">
          <Form.Item
            label="이메일"
            name="email"
            rules={[
              { required: true, message: '이메일을 입력해주세요!' },
              {
                type: 'email',
                message: '적합하지 않은 이메일 형식입니다. 다시 입력해주세요',
              },
            ]}
            help={
              emailSuccessMessage ? (
                <span style={{ color: 'green' }}>{emailSuccessMessage}</span>
              ) : form.getFieldError('email').length > 0 ? (
                <span style={{ color: 'red' }}>
                  {form.getFieldError('email')[0]}
                </span>
              ) : (
                ''
              )
            }
          >
            <Input placeholder="이메일을 입력해주세요" />
          </Form.Item>
        </Flex>
        <Button btnText="중복 확인" dupChk onClick={checkEmail} />
      </EmailWrap>
      <Form.Item
        label="비밀번호"
        name="password"
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
        name="confirmPassword"
        rules={[
          { required: true, message: '비밀번호를 확인해주세요!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'))
            },
          }),
        ]}
      >
        <Input type="password" placeholder="비밀번호를 다시 입력해주세요" />
      </Form.Item>

      <Form.Item>
        <Button
          btnText="가입하기"
          htmlType={'submit'}
          // onClick={handleSubmit}
        />
      </Form.Item>
    </SignupForm>
  )
}

export default SignupPage

const SignupForm = styled(Form)`
  width: 432px;
  margin-top: 80px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .title {
    font-size: 24px;
    color: #000;
    margin-bottom: 20px;
    font-weight: 600;
  }
  .ant-form-item {
    width: 100%;
    /* margin: 0; */
  }
  .ant-form-item-explain {
    color: #4998e9;
    font-size: 11px;
    width: 100%;
  }
`

const NickNameWrap = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  /* flex-direction: row; */
  align-items: center;
  gap: 10px;
  .ant-btn {
    margin-bottom: 20px;
  }
`
const EmailWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-bottom: 20px; */
  .ant-form-item {
    width: 100%;
    margin: 0;
    margin-bottom: 8px;
  }
`
