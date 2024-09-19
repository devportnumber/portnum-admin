import React from 'react'
import styled from 'styled-components'
import LOGO_IMG from '../../assets/logo/brand-logo.svg'
const Header = () => {
  return (
    <Wrap>
      <div>
        <img src={LOGO_IMG} alt="로고 이미지" />
      </div>
      <RightBox>
        {/* 로그인시 입장 닉네임으로 변경 */}
        <h4>
          <span className="boldTxt">어드민(ID)</span>님 환영합니다.
        </h4>
        <LogoutBtn>로그아웃</LogoutBtn>
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
