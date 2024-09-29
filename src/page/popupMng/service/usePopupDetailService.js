import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useAxios } from '../../../hooks/useAxios'

export const usePopupDetailService = () => {
  const [loading, setLoading] = useState(false)
  const [isUpload, setIsUpload] = useState(false)
  const [popupState, setPopupState] = useState('Y')
  const [formValues, setFormValues] = useState(null)

  // 이미지 데이터(대표이미지, 추가이미지)
  const [mainImageFile, setMainImageFile] = useState('') // 대표 이미지 파일
  const [mainImage, setMainImage] = useState('') // 대표 이미지
  const [someMainImage, setSomeMainImage] = useState('')
  const [mainImageUploaded, setMainImageUploaded] = useState(false)

  const [additionalImageFile, setAdditionalImageFile] = useState([]) // 추가 이미지 파일
  const [additionalImages, setAdditionalImages] = useState([]) // 추가 이미지
  const [additionalImagesUploaded, setAdditionalImagesUploaded] =
    useState(false)

  // 대표 이미지 url 요청
  const {
    fetchData: storeMainImgGetApi,
    loading: storeMainImgGetLoading,
    data: storeMainImgGetData,
    error: storeMainImgGetError,
  } = useAxios()

  // 추가 이미지 url 요청
  const {
    fetchData: storeAddImgGetApi,
    loading: storeAddImgGetLoading,
    data: storeAddImgGetData,
    error: storeImgGetError,
  } = useAxios()

  // 팝업 등록
  const {
    fetchData: storeSaveApi,
    loading: saveLoading,
    data: storeFilterData,
    error: error2,
  } = useAxios()

  const [popupFormData, setPopupFormData] = useState({
    adminId: 1,
    name: '',
    category: '',
    startDate: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
    endDate: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
    // startDate: dayjs().format('YYYY-MM-DDT00:00:00'),
    // endDate: dayjs().format('YYYY-MM-DDT00:00:00'),
    stat: '',
    point: {
      longitude: '123',
      latitude: '123',
    },
    // address: {
    //   address: '',
    //   addressDetail: '',
    //   region: '',
    // },
    description: '', // 상세 설명?
    detailDescription: '',
    mapUrl: '', // 네이버 지도
    representImgUrl: mainImage, // 대표 이미지 1장
    images: additionalImages, // 이미지 배열 9장
    keywords: '',
  })

  // 대표 이미지 핸들러
  const handleMainImageChange = async (e) => {
    e.preventDefault()

    // 👉 변경
    const file = e.target.files[0]
    console.log('대표이미지 핸들러', file)
    if (file) {
      const reader = new FileReader()
      console.log('대표이미지 reader', reader)

      reader.onloadend = () => {
        setMainImage(reader.result)
        // setSomeMainImage(reader.result) // 미리보기 이미지 설정
        setMainImageFile(file) // 파일 객체 저장
        storeMainImgGetApi('/image', 'GET', null, { imageName: file.name })
      }
      reader.readAsDataURL(file)
    }
  }

  // 추가 이미지 핸들러
  const handleAdditionalImagesChange = (e) => {
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

  // 추가 이미지 삭제 핸들러
  const handleDeleteImage = (e, index) => {
    e.preventDefault()
    setAdditionalImages((prevImages) =>
      prevImages.filter((_, i) => i !== index),
    )
  }

  // 추가 이미지 수정 핸들러
  const handleEditImage = (e, index) => {
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

  // AWS s3 이미지 업로드
  const uploadToS3 = async (s3Url, file) => {
    console.log('##S3_Url: ', s3Url)
    console.log('##S3_file', file)
    try {
      await fetch(s3Url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })
    } catch (error) {
      console.error('[Error uploading to S3]', error)
      throw error
    }
  }
  // 이미지 get 요청 응답값 셋팅
  useEffect(() => {
    const uploadImageToS3 = async (file, preSingedUrl) => {
      try {
        await uploadToS3(preSingedUrl, file)
        console.log('파일 업로드 완료!!!!!!!!!', file)
      } catch (error) {
        console.error('파일 업로드 중 오류!!!!!!!!!!', error)
      }
    }

    // 대표 이미지 처리
    if (storeMainImgGetData && mainImageFile) {
      const { preSingedUrl, imageSaveUrl } = storeMainImgGetData.data

      // // 대표 이미지가 이미 업로드된 상태가 아닌 경우에만 업로드
      if (!mainImageUploaded) {
        // DB 데이터 상태 업데이트
        setMainImageUploaded(true) // 업로드 상태 업데이트
        setMainImage(imageSaveUrl)
      }
      // 팝업등록때 같이 추가
      if (isUpload) {
        // setMainImage(imageSaveUrl) // DB저장X 화면ㅇ
        console.log('대표이미지', imageSaveUrl)
        // uploadImageToS3(mainImageFile, preSingedUrl)
      }
    }
    // 추가 이미지 처리
    if (storeAddImgGetData && additionalImageFile) {
      const { preSingedUrl, imageSaveUrl } = storeAddImgGetData.data

      // 추가 이미지 업로드 시 중복 방지
      additionalImageFile.forEach(async (file) => {
        if (!additionalImagesUploaded) {
          setAdditionalImagesUploaded(true)
          setAdditionalImages((prev) => [...prev, { imgUrl: imageSaveUrl }]) // DB저장
        }
        // 팝업등록때 같이 추가
        if (isUpload) {
          console.log('추가이미지', imageSaveUrl)
          uploadImageToS3(file, preSingedUrl)
        }
      })
    }
  }, [storeMainImgGetData, storeAddImgGetData, isUpload])

  // 팝업 등록 성공시 리로드
  useEffect(() => {
    if (storeFilterData?.success) {
      // window.location.reload("/")
    }
  }, [storeFilterData])

  return {
    popupFormData, // 폼 데이터
    setPopupFormData,
    storeSaveApi, // 최종 등록 api
    storeFilterData, // 팝업 등록 성공 데이터
    // onFinish, // 최종 등록, 수정 : 제출 함수
    isUpload,
    setIsUpload,
    uploadToS3, // s3 이미지 업로드
    handleMainImageChange, // 대표 이미지 핸들러
    handleAdditionalImagesChange, // 추가 이미지 핸들러
    handleEditImage,
    handleDeleteImage,
    popupState, // 라디오
    setPopupState,
    someMainImage,
    mainImage,
    setMainImage,
    additionalImages,
    setAdditionalImages,
    loading,
    setLoading,
  }
}
