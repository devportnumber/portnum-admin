import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useAxios } from '../../../hooks/useAxios'

export const usePopupDetailService = () => {
  const adminId = parseInt(localStorage.getItem('adminId')) || null
  const [loading, setLoading] = useState(false)
  const [isUpload, setIsUpload] = useState(false)
  const [popupState, setPopupState] = useState('Y')
  const [formValues, setFormValues] = useState(null)

  // 이미지 데이터(대표이미지)
  const [mainImageFile, setMainImageFile] = useState('') // 대표 이미지 파일
  const [mainImage, setMainImage] = useState('') // 대표 이미지(Request)
  const [someMainImage, setSomeMainImage] = useState('')
  const [mainImageUploaded, setMainImageUploaded] = useState(false)

  //이미지 데이터(추가이미지)
  const [additionalImageFile, setAdditionalImageFile] = useState([]) // 추가 이미지 파일
  const [additionalImages, setAdditionalImages] = useState([]) // 추가 이미지(Request)
  const [someAdditionalImages, setSomeAdditionalImages] = useState([])
  const [additionalImagesUploaded, setAdditionalImagesUploaded] =
    useState(false)

  // 수정시 추가이미지
  const [modifyImages, setModifyImages] = useState({
    addImages: additionalImages, // 추가 이미지
    updateImages: [], // 수정 이미지
    removeImages: [], // 삭제 이미지(imgId만 전달)
  })

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

  // 추가 이미지 추가 POST
  const {
    fetchData: storeAddImgPostApi,
    loading: storeAddImgPostLoading,
    data: storeAddImgPostData,
    error: storeImgPostError,
  } = useAxios()

  // 추가 이미지 수정 PATCH
  const {
    fetchData: storeAddImgPatchApi,
    loading: storeAddImgPatchLoading,
    data: storeAddImgPatchData,
    error: storeImgPatchError,
  } = useAxios()

  // 추가 이미지 삭제 Delete
  const {
    fetchData: storeAddImgDeleteApi,
    loading: storeAddImgDeleteLoading,
    data: storeAddImgDeleteData,
    error: storeImgDeleteError,
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
    stat: '',
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

    const file = e.target.files[0]
    console.log('대표이미지 핸들러', file)
    if (file) {
      const reader = new FileReader()
      console.log('대표이미지 reader', reader)

      reader.onloadend = () => {
        // setMainImage(reader.result)
        setSomeMainImage(reader.result) // 미리보기 이미지 설정
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
    setAdditionalImageFile(files)

    const newImages = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          resolve(reader.result)
          // setAdditionalImages(reader.result)
          storeAddImgGetApi('/image', 'GET', null, { imageName: file.name })
        }
        reader.readAsDataURL(file)
      })
    })

    console.log('newImages', newImages)

    Promise.all(newImages).then((results) => {
      console.log('추가 results', results)

      setSomeAdditionalImages((prevImages) => [...prevImages, ...results])
      // setAdditionalImages((prevImages) => [...prevImages, ...results])
    })
  }

  // 추가 이미지 삭제 핸들러
  const handleDeleteImage = (e, index, imageSrc) => {
    console.log('## 추가 이미지 삭제imageSrc', imageSrc)
    e.preventDefault()
    setSomeAdditionalImages((prevImages) =>
      prevImages.filter((_, i) => i !== index),
    )

    if (imageSrc.imgId && imageSrc.status === 'done') {
      setModifyImages((prevState) => ({
        ...prevState,
        removeImages: [...prevState.removeImages, imageSrc.imgId],
      }))
    }
  }

  // 추가 이미지 수정 핸들러
  const handleEditImage = (e, index, imageSrc) => {
    e.preventDefault()
    console.log('$수정index', index)
    console.log('$수정imageSrc', imageSrc)

    const editFileInput = document.createElement('input')
    editFileInput.type = 'file'
    editFileInput.accept = 'image/*'

    editFileInput.onchange = (event) => {
      const file = event.target.files[0]

      if (file) {
        console.log('수정파일', file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setSomeAdditionalImages((prevImages) => {
            const newImages = [...prevImages]
            newImages[index] = reader.result
            return newImages
          })
        }
        storeAddImgGetApi('/image', 'GET', null, { imageName: file.name })
        reader.readAsDataURL(file)
      }
    }

    editFileInput.click()
  }

  // ✅ AWS s3 이미지 업로드
  const uploadToS3 = async (s3Url, file) => {
    // console.log('##S3_Url: ', s3Url)
    // console.log('##S3_file', file)
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
  // ✅ 이미지 aws url => GET 요청 응답값 셋팅
  useEffect(() => {
    const uploadImageToS3 = async (file, preSingedUrl) => {
      try {
        await uploadToS3(preSingedUrl, file)
        console.log('Success: 파일 업로드 완료!!!!!!!!!', file)
      } catch (error) {
        console.error('Error: 파일 업로드 중 오류!!!!!!!!!!', error)
      }
    }

    // 1️⃣ 대표 이미지 처리
    if (storeMainImgGetData && mainImageFile) {
      const { preSingedUrl, imageSaveUrl } = storeMainImgGetData.data

      // // 대표 이미지가 이미 업로드된 상태가 아닌 경우에만 업로드
      if (!mainImageUploaded) {
        // DB 데이터 상태 업데이트
        setMainImageUploaded(true) // 업로드 상태 업데이트
        setMainImage(imageSaveUrl)
      }
      // 팝업 등록때 같이 추가
      if (isUpload) {
        uploadImageToS3(mainImageFile, preSingedUrl)
      }
    }
    // 2️⃣ 추가 이미지 처리
    if (storeAddImgGetData && additionalImageFile) {
      const { preSingedUrl, imageSaveUrl } = storeAddImgGetData.data

      // 추가 이미지 업로드 시 중복 방지
      additionalImageFile.forEach(async (file) => {
        if (!additionalImagesUploaded) {
          setAdditionalImagesUploaded(true)
          setAdditionalImages((prev) => [...prev, { imgUrl: imageSaveUrl }]) // DB저장

          // 수정 데이터
          setModifyImages((prevState) => ({
            ...prevState,
            addImages: [...prevState.addImages, { imgUrl: imageSaveUrl }],
          }))
        }
        // 팝업등록때 같이 추가
        if (isUpload) {
          uploadImageToS3(file, preSingedUrl)
        }
      })
    }

    // 수정 이미지 처리
    // if (storeAddImgGetData) {
    //   const { preSingedUrl, imageSaveUrl } = storeAddImgGetData.data
    //   setModifyImages((prevState) => ({
    //     ...prevState,
    //     updateImages: [
    //       ...prevState.updateImages,
    //       { imgId: prevState.imgId, imgUrl: imageSaveUrl },
    //     ],
    //   }))
    //   if (isUpload) {
    //     // uploadImageToS3(additionalImageFile, preSingedUrl)
    //   }
    // }
  }, [storeMainImgGetData, storeAddImgGetData, isUpload])

  // 팝업 등록 성공시 리로드
  useEffect(() => {
    if (storeFilterData?.success) {
      // window.location.reload('/')
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
    setSomeMainImage,
    mainImage,
    setMainImage,
    someAdditionalImages,
    setSomeAdditionalImages,
    additionalImages,
    setAdditionalImages,
    loading,
    setLoading,
    modifyImages,
  }
}
