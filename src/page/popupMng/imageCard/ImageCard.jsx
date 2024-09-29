import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import EditIcon from '../../../assets/icon/icon-edit.svg'
import DeleteIcon from '../../../assets/icon/icon-delete.svg'

const ImageUploader = ({
  someMainImage,
  mainImage,
  setMainImage,
  additionalImages,
  setAdditionalImages,
  handleMainImageChange,
  handleAdditionalImagesChange,
  handleDeleteImage,
  handleEditImage,
}) => {
  const mainFileInputRef = useRef(null) // 대표 이미지 파일 input 참조
  const additionalFileInputRef = useRef(null) // 추가 이미지 파일 input 참조

  // 대표 이미지 업로드 버튼 클릭 시 파일 선택 창을 여는 함수
  const handleMainUploadClick = (e) => {
    e.preventDefault()
    if (mainFileInputRef.current) {
      mainFileInputRef.current.click() // 숨겨진 input[type="file"] 클릭
    }
  }

  // 추가 이미지 업로드 버튼 클릭 시 파일 선택 창을 여는 함수
  const handleAdditionalUploadClick = (e) => {
    e.preventDefault()
    if (additionalFileInputRef.current) {
      additionalFileInputRef.current.click() // 숨겨진 input[type="file"] 클릭
    }
  }
  console.log('이거?', someMainImage)

  return (
    <Wrap>
      {/* 대표 이미지 업로드 버튼 */}
      <h4 className="title">대표이미지 </h4>
      <ImageWrapper>
        <UploadButton onClick={handleMainUploadClick}>
          <p>+</p>
        </UploadButton>
        {mainImage && (
          <CardContainer>
            <CalendarImage>
              <BackgroundImage
                src={mainImage ? mainImage : someMainImage}
                alt="대표 이미지"
              />
              <CardActions>
                <EditButton onClick={handleMainUploadClick}>
                  <img src={EditIcon} alt="수정 아이콘" />
                  수정
                </EditButton>
                <DeleteButton onClick={() => setMainImage('')}>
                  <img src={DeleteIcon} alt="삭제 아이콘" />
                  삭제
                </DeleteButton>
              </CardActions>
            </CalendarImage>
          </CardContainer>
        )}
        <input
          type="file"
          accept="image/*"
          ref={mainFileInputRef}
          onChange={handleMainImageChange}
          style={{ display: 'none' }}
        />
      </ImageWrapper>
      {/* 추가 이미지 업로드 버튼 */}
      <h4 className="title">추가 이미지 </h4>
      <ImageWrapper>
        <UploadButton onClick={handleAdditionalUploadClick}>
          <p>+</p>
        </UploadButton>
        {additionalImages.map((imageSrc, index) => (
          <CardContainer key={index}>
            <CalendarImage>
              <BackgroundImage
                src={imageSrc.url ? imageSrc.url : imageSrc}
                alt={`추가 이미지 ${index + 1}`}
              />
              <CardActions>
                <EditButton onClick={(e) => handleEditImage(e, index)}>
                  <img src={EditIcon} alt="수정 아이콘" />
                  수정
                </EditButton>
                <DeleteButton onClick={(e) => handleDeleteImage(e, index)}>
                  <img src={DeleteIcon} alt="삭제 아이콘" />
                  삭제
                </DeleteButton>
              </CardActions>
            </CalendarImage>
          </CardContainer>
        ))}
        <input
          type="file"
          accept="image/*"
          multiple // 여러 파일을 선택할 수 있도록 설정
          ref={additionalFileInputRef}
          onChange={handleAdditionalImagesChange}
          style={{ display: 'none' }}
        />
      </ImageWrapper>
    </Wrap>
  )
}

export default ImageUploader

// Styled Components 정의
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 20px;
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #000;
  }
`

const ImageWrapper = styled.div`
  /* display: flex;
  flex-direction: row;
  align-items: center; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
`
const UploadButton = styled.button`
  width: 200px;
  height: 200px;
  background-color: #e0e0e0;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  p {
    font-size: 40px;
    color: #00000066;
  }
`

const CardContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 8px;
  border: 1px solid #dbdbdb;
`

const CalendarImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`

const CardActions = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: #00000080;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

const EditButton = styled.button`
  color: #fff;
  font-size: 16px;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`

const DeleteButton = styled(EditButton)``
