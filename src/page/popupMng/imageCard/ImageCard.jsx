import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import EditIcon from '../../../assets/icon/icon-edit.svg'
import DeleteIcon from '../../../assets/icon/icon-delete.svg'

const ImageUploader = ({
  mainImage,
  setMainImage,
  additionalImages,
  setAdditionalImages,
  onEdit,
  onDelete,
}) => {
  //   const [mainImageSrc, setMainImageSrc] = useState('') // 대표 이미지 상태
  //   const [additionalImages, setAdditionalImages] = useState([]) // 추가 이미지 배열 상태

  const mainFileInputRef = useRef(null) // 대표 이미지 파일 input 참조
  const additionalFileInputRef = useRef(null) // 추가 이미지 파일 input 참조

  console.log('>>mainImage', mainImage)
  console.log('>>additionalImages', additionalImages)

  // 대표 이미지 변경 핸들러
  const handleMainImageChange = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMainImage(reader.result) // 미리보기 이미지 설정
      }
      reader.readAsDataURL(file)
    }
  }

  // 추가 이미지 변경 핸들러
  const handleAdditionalImageChange = (e) => {
    e.preventDefault()
    const files = Array.from(e.target.files)
    const newImages = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          resolve(reader.result)
        }
        reader.readAsDataURL(file)
      })
    })

    // Promise.all(newImages).then((results) => {
    //   setAdditionalImages((prevImages) => [...prevImages, ...results]) // 기존 추가 이미지에 새 이미지 추가
    // })
    Promise.all(newImages).then((results) => {
      setAdditionalImages((prevImages) => {
        const currentCount = prevImages.length
        const newCount = currentCount + results.length

        // 현재 이미지 수와 새로 추가할 이미지 수를 비교하여 9장을 초과하지 않도록 필터링
        if (newCount > 9) {
          alert('추가할 수 있는 이미지는 최대 9장입니다.')
          return [...prevImages, ...results.slice(0, 9 - currentCount)] // 9장이 되지 않도록 슬라이스
        }

        return [...prevImages, ...results] // 9장이 안 넘으면 모두 추가
      })
    })
  }

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

  // 추가 이미지 삭제 핸들러
  const handleDeleteAdditionalImage = (e, index) => {
    e.preventDefault()
    setAdditionalImages((prevImages) =>
      prevImages.filter((_, i) => i !== index),
    )
  }

  const handleEdit = (e, index) => {
    e.preventDefault()
    console.log('index', index)

    const editFileInput = document.createElement('input')
    editFileInput.type = 'file'
    editFileInput.accept = 'image/*'

    editFileInput.onchange = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setAdditionalImages((prevImages) => {
            const newImages = [...prevImages]
            newImages[index] = reader.result
            return newImages
          })
        }
        reader.readAsDataURL(file)
      }
    }

    editFileInput.click()
  }
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
              <BackgroundImage src={mainImage} alt="대표 이미지" />
              <CardActions>
                <EditButton onClick={onEdit}>
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
                <EditButton onClick={(e) => handleEdit(e, index)}>
                  <img src={EditIcon} alt="수정 아이콘" />
                  수정
                </EditButton>
                <DeleteButton
                  onClick={(e) => handleDeleteAdditionalImage(e, index)}
                >
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
          onChange={handleAdditionalImageChange}
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
