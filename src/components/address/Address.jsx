import React, { useState } from 'react'
import DaumPostcode from 'react-daum-postcode'
import styled from 'styled-components'
import { Input, SubmitModal } from '../index'
const { kakao } = window

const Address = ({ value, onChange, setPoint }) => {
  const [isModalOpen, setIsModalOpen] = useState(false) // 모달창 컴포넌트 props로 전달

  const getAddressCoords = (address) => {
    let geocoder = new kakao.maps.services.Geocoder()
    return new Promise((resolve, reject) => {
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].x, result[0].y)
          setPoint({
            longitude: Number(coords?.La),
            latitude: Number(coords?.Ma),
          })
          console.log('coords', coords)
          resolve(coords)
        } else {
          reject(status)
        }
      })
    })
  }

  const handleComplete = (data) => {
    console.log('address', data)
    const fullAddress = data?.address // 주소를 받아옴
    onChange(fullAddress)
    getAddressCoords(fullAddress)
    setIsModalOpen(false)
  }
  return (
    <AddressWrap>
      <div onClick={() => setIsModalOpen(true)}>
        <Input
          // inputTitle={'주소'}
          placeholder={'주소찾기'}
          value={value}
          isReadOnly // 입력을 못하게 설정
          // onChange={onChange}
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
