import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import LOGO_IMG from '../../assets/logo/portnumber_logo1.svg'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const [logout, setLogout] = useState(false)
  const nickName = localStorage.getItem('nickName')

  // 로그아웃
  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('token')
      const refreshToken = localStorage.getItem('refresh')

      const response = await axios.patch(
        'http://localhost:8080/auth/logout',
        null, // 데이터가 없으므로 null
        {
          headers: {
            Authorization: accessToken, // 액세스 토큰
            Refresh: refreshToken, // 리프레시 토큰
          },
        },
      )

      // 로그아웃 성공 시 로컬 스토리지에서 토큰 제거
      // localStorage.removeItem('token')
      // localStorage.removeItem('refresh')
      setLogout(true)
      // localStorage.clear()

      console.log('로그아웃', response)

      // // 로그인 페이지로 이동
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  useEffect(() => {
    if (logout) {
      // navigate('/login')
      localStorage.clear()
      window.location.replace('/login')
    }
  }, [logout])

  return (
    <Wrap>
      <div>
        <button type="button" onClick={() => navigate('/')}>
          <img src={LOGO_IMG} alt="로고 이미지" />
        </button>
      </div>
      <RightBox>
        {/* 로그인시 입장 닉네임으로 변경 */}
        <h4>
          <span className="boldTxt">{nickName}</span>님 환영합니다.
        </h4>
        <LogoutBtn type="button" onClick={handleLogout}>
          로그아웃
        </LogoutBtn>
      </RightBox>
      {/* <h1 className="headerTit">PORT’S NUMBER Tab Tab Tab</h1> */}
    </Wrap>
  )
}

export default Header

const Wrap = styled.header`
  padding: 0px 56px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  .headerTit {
  }
`

const RightBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  .boldTxt {
    font-size: 16px;
    font-weight: 700;
  }
`

const LogoutBtn = styled.button`
  width: 81px;
  height: 40px;
  background: #eeeeee;
  color: #3f3f3f;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
`
