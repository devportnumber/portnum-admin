import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useAxios } from '../../../hooks/useAxios'
export const usePopupDetailService = () => {
  const [loading, setLoading] = useState(false)
  const [isUpload, setIsUpload] = useState(false)
  const [popupState, setPopupState] = useState('Y')
  const [formValues, setFormValues] = useState(null)

  // 이미지 데이터(대표이미지, 추가이미지)
  const [mainImageFile, setMainImageFile] = useState('') // 대표 이미지
  const [mainImage, setMainImage] = useState('') // 대표 이미지
  const [mainImageUploaded, setMainImageUploaded] = useState(false)

  const [additionalImageFile, setAdditionalImageFile] = useState([]) // 추가 이미지
  const [additionalImages, setAdditionalImages] = useState([]) // 추가 이미지
  const [additionalImagesUploaded, setAdditionalImagesUploaded] =
    useState(false)

  // 이미지 url 요청
  const {
    fetchData: storeMainImgGetApi,
    loading: storeMainImgGetLoading,
    data: storeMainImgGetData,
    error: storeMainImgGetError,
  } = useAxios()

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
    startDate: dayjs().format('YYYY-MM-DDT00:00:00'),
    endDate: dayjs().format('YYYY-MM-DDT00:00:00'),
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
    keywords: ['테스트', '테스트1', '테스트2'],
  })

  // 대표 이미지 핸들러
  const handleMainImageChange = async ({ file }) => {
    // // API 호출 트리거
    // storeImgGetApi('/image', 'GET', null, { imageName: file.name })
    // // 상태에 파일 저장
    // setMainImageFile(file)
    // // 업로드 상태 초기화
    // setMainImageUploaded(false)

    if (file.status === 'uploading') {
      console.log('#대표이미지 핸들러', file)
      // API 호출 트리거
      storeMainImgGetApi('/image', 'GET', null, { imageName: file.name })
      // 상태에 파일 저장
      setMainImageFile(file)
      // 업로드 상태 초기화
    } else if (file.status === 'removed') {
      setMainImage('')
    } else if (file.status === 'done') {
      setMainImageFile(file)

      // setMainImageFile(file)
    }
    setMainImageUploaded(false)
  }

  // 추가 이미지 핸들러
  const handleAdditionalImagesChange = ({ file, fileList }) => {
    console.log('추가 파일 리스트', fileList)

    // setAdditionalImageFile(fileList)
    // fileList.forEach((fileItem) => {
    //   storeImgGetApi('/image', 'GET', null, { imageName: fileItem.name })
    //   setAdditionalImagesUploaded(false)
    // })

    if (file.status === 'uploading') {
      setAdditionalImageFile(fileList)
      fileList.forEach((fileItem) => {
        storeAddImgGetApi('/image', 'GET', null, { imageName: fileItem.name })
        setAdditionalImagesUploaded(false)
      })
    } else if (file.status === 'removed') {
      // setAdditionalImageFile((prev) =>
      //   prev.filter((img) => img.imgUrl !== file.url),
      // )
    } else if (file.status === 'done') {
      setAdditionalImageFile(fileList)
    }
  }

  // AWS s3 이미지 업로드
  const uploadToS3 = async (s3Url, file) => {
    console.log('##S3_Url: ', s3Url)
    console.log('##S3_file', file)
    try {
      await fetch(s3Url, {
        method: 'PUT',
        body: file.originFileObj,
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

      console.log('')

      // 대표 이미지가 이미 업로드된 상태가 아닌 경우에만 업로드
      if (!mainImageUploaded) {
        console.log('#대표이미지 이펙트', preSingedUrl)
        setMainImage(imageSaveUrl) // DB 데이터 상태 업데이트

        setMainImageUploaded(true) // 업로드 상태 업데이트
      }
      console.log('#대표# isUpload', isUpload)
      if (isUpload) {
        uploadImageToS3(mainImageFile, preSingedUrl)
      }
    }

    // 추가 이미지 처리
    if (storeAddImgGetData && additionalImageFile) {
      const { preSingedUrl, imageSaveUrl } = storeAddImgGetData.data

      // 추가 이미지 업로드 시 중복 방지
      additionalImageFile.forEach(async (file) => {
        if (!additionalImagesUploaded) {
          console.log('###추가이미지', file)
          setAdditionalImages((prev) => [...prev, { imgUrl: imageSaveUrl }])
          setAdditionalImagesUploaded(true)
        }
        console.log('#추가#isUpload', isUpload)
        if (isUpload) {
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
    popupState, // 라디오
    setPopupState,
    mainImage,
    setMainImage,
    additionalImages,
    setAdditionalImages,
    loading,
    setLoading,
  }
}
