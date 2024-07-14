import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, SubmitModal, ConfirmModal, Input } from '../index'
import DaumPostcode from 'react-daum-postcode'
import { Space } from 'antd'

const Address = ({ address, setAddress }) => {
  const [isModalOpen, setIsModalOpen] = useState(false) // 모달창 컴포넌트 props로 전달
  // const [address, setAddress] = useState(null)

  // useEffect(() => {
  //   if (address) {
  //     console.log('address-' + JSON.stringify(address))
  //   }
  // }, [address])

  const handleComplete = (data) => {
    setAddress(data?.address)
    setIsModalOpen(false)
    // console.log('address', data?.address)
    // // 시.도 저장
    // setQ1(data.sido)
    // // 구.군 저장
    // setQ3(
    //   data.sigungu.length > 3
    //     ? data.sigungu.split('').splice(0, 3).join('')
    //     : data.sigungu,
    // )

    // // 상세주소 앞 2단어 제외하고 저장 ('서울 강남구' 제외하고 저장)
    // let splitAddress = data.address.split(' ').splice(2).join(' ')

    // onToggleModal()
  }

  return (
    <AddressWrap>
      {/* <Button
        iconMode="search"
        //   btnText={address ? address : '주소찾기'}
        btnText={'주소찾기'}
      /> */}
      <div onClick={() => setIsModalOpen(true)}>
        <Input
          inputTitle={'주소'}
          placeholder={'주소찾기'}
          value={address}
          isReadOnly // 입력을 못하게 설정
          onChange={(e) => setAddress(e)}
        />
      </div>
      <SubmitModal
        title="주소 찾기"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <DaumPostcode
          onComplete={handleComplete} // 값을 선택할 경우 실행되는 이벤트
          autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
        />
      </SubmitModal>
    </AddressWrap>
  )
}

export default Address

const AddressWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
