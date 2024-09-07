import React, { useState, useEffect } from 'react'
import {
  Button,
  SubmitModal,
  Input,
  DatePicker,
  RangeDatePicker,
  SelectOption,
  Address,
  ToastEditor,
} from '../../../components/index'
import { Upload, message, Radio, Form, Flex } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import styled, { createGlobalStyle } from 'styled-components'
import { useAxios } from '../../../hooks/useAxios'
import * as constantsData from '../service/constants'
import dayjs from 'dayjs'

const plainOptions = [
  {
    label: '노출',
    value: 'Y',
  },
  {
    label: '비노출',
    value: 'N',
  },
]

// 팝업 등록 모달
const PopupRegModal = ({ isModalOpen, setIsModalOpen, tableRecord }) => {
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)

  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState(null)
  const [popupState, setPopupState] = useState('Y')
  const [editorTextData, setEditorTextData] = useState('')

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
    fetchData: storeImgGetApi,
    loading: storeImgGetLoading,
    data: storeImgGetData,
    error: storeImgGetError,
  } = useAxios()

  const {
    fetchData: storeImgPostApi,
    loading: storeImgPostLoading,
    data: storeImgPostData,
    error: storeImgPostError,
  } = useAxios()

  // 팝업 등록
  const {
    fetchData: storeSaveApi,
    loading: saveLoading,
    data: storeFilterData,
    error: error2,
  } = useAxios()

  // 상세 설정
  useEffect(() => {
    if (tableRecord) {
      form.setFieldValue('name', tableRecord.name)
      form.setFieldValue('category', tableRecord.category)
      form.setFieldValue('startDate', tableRecord.startDate)
      form.setFieldValue('endDate', tableRecord.endDate)
      form.setFieldValue('stat', tableRecord.stat)
      form.setFieldValue('address', tableRecord.address?.address)
      form.setFieldValue('addressDetail', tableRecord.address?.addressDetail)
      form.setFieldValue('keywords', tableRecord.keywords.join(', '))
      form.setFieldValue('mapUrl', tableRecord.mapUrl)
      form.setFieldValue('valid', tableRecord.valid)
      form.setFieldValue('description', tableRecord.description)
      form.setFieldValue('detailDescription', tableRecord.detailDescription)
      form.setFieldValue('representImgUrl', tableRecord.representImgUrl)
      form.setFieldValue('images', tableRecord.detailDescription)

      setMainImage(tableRecord?.representImgUrl)
    }
  }, [tableRecord])

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
    // API 호출 트리거
    storeImgGetApi('/image', 'GET', null, { imageName: file.name })
    // 상태에 파일 저장
    setMainImageFile(file)
    // 업로드 상태 초기화
    setMainImageUploaded(false)
  }

  // 추가 이미지 핸들러
  const handleAdditionalImagesChange = ({ file, fileList }) => {
    console.log('추가 파일 리스트', fileList)

    setAdditionalImageFile(fileList)
    fileList.forEach((fileItem) => {
      storeImgGetApi('/image', 'GET', null, { imageName: fileItem.name })
      setAdditionalImagesUploaded(false)
    })
  }

  const handleFileStatus = async () => {
    // 대표 이미지 파일 처리
    if (mainImageFile) {
      // 대표 이미지가 'done' 상태이면 수정 API 호출
      if (mainImageFile.status === 'done') {
        await storeSaveApi(
          '/popup',
          'PUT',
          { representImgUrl: mainImage },
          null,
        )
      }
      // 대표 이미지가 'removed' 상태이면 삭제 API 호출
      else if (mainImageFile.status === 'removed') {
        await storeSaveApi(
          '/popup',
          'DELETE',
          { representImgUrl: mainImage },
          null,
        )
      }
    }

    // 추가 이미지 파일 처리
    additionalImageFile.forEach(async (file) => {
      if (file.status === 'done') {
        // 추가 이미지가 'done' 상태이면 등록 API 호출
        await storeSaveApi('/popup/image', 'POST', { imgUrl: file.url }, null)
      } else if (file.status === 'removed') {
        // 추가 이미지가 'removed' 상태이면 삭제 API 호출
        await storeSaveApi('/popup/image', 'DELETE', { imgUrl: file.url }, null)
      }
    })
  }

  // s3 이미지 업로드
  const uploadToS3 = async (s3Url, file) => {
    console.log('s3Url', s3Url)
    console.log('file', file)
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
        console.log('파일 업로드 완료!!!!!!!!!')
      } catch (error) {
        console.error('파일 업로드 중 오류!!!!!!!!!!', error)
      }
    }

    // 대표 이미지 처리
    if (storeImgGetData && mainImageFile) {
      const { preSingedUrl, imageSaveUrl } = storeImgGetData.data

      // 대표 이미지가 이미 업로드된 상태가 아닌 경우에만 업로드
      if (!mainImageUploaded) {
        console.log('#대표이미지 이펙트', preSingedUrl)
        // uploadImageToS3(mainImageFile, preSingedUrl)
        setMainImage(imageSaveUrl) // 상태 업데이트
        setMainImageUploaded(true) // 업로드 상태 업데이트
      }
    }

    // 추가 이미지 처리
    if (storeImgGetData && additionalImageFile) {
      const { preSingedUrl, imageSaveUrl } = storeImgGetData.data

      // 추가 이미지 업로드 시 중복 방지
      additionalImageFile.forEach(async (file) => {
        if (!additionalImagesUploaded) {
          console.log('###추가이미지', file)
          // await uploadImageToS3(file, preSingedUrl)
          setAdditionalImages((prev) => [...prev, { imgUrl: imageSaveUrl }])
          setAdditionalImagesUploaded(true)
        }
      })
    }
  }, [storeImgGetData])

  // 이미지 업로드 버튼
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  )

  const onPopupStateChange = ({ target: { value } }) => {
    setPopupState(value)
  }

  // ✅ API 팝업등록
  const onFinish = async (values) => {
    const filteredImages = additionalImages.map(({ uid, ...rest }) => rest) // uid 제거
    const savePopupFormData = {
      ...popupFormData,
      // description: editorTextData,
      representImgUrl: mainImage, // 대표 이미지 1장
      images: filteredImages, // 이미지 배열 9장
      address: {
        address: values.address, // address 객체를 그대로 사용
        addressDetail: values.addressDetail, // addressDetail을 따로 사용
      },
    }
    // console.log('팝업 등록: savePopupFormData:', savePopupFormData)
    // setPopupFormData(savePopupFormData)
    // storeSaveApi('/popup', 'POST', savePopupFormData, null)

    try {
      // 파일 상태에 따른 분기 처리
      // await handleFileStatus()

      // 최종 등록 API 호출
      console.log('팝업 등록 완료:', savePopupFormData)
      // await storeSaveApi('/popup', 'POST', savePopupFormData, null)
    } catch (error) {
      console.error('팝업 등록 중 오류 발생:', error)
    }
  }

  const onClose = () => {
    form.resetFields()
  }

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        (value) => {
          // setIsButtonEnabled(true)
        },
        () => {
          // setIsButtonEnabled(false)
        },
      )
  }, [form, values])

  return (
    <SubmitModal
      title={'컨텐츠 등록'}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      handleSubmit={onFinish}
      handleClose={onClose}
    >
      <Form
        form={form}
        initialValues={popupFormData}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={(changedValues, allValues) => {
          setPopupFormData({ ...popupFormData, ...changedValues })
        }}
      >
        <FormWrap>
          <FormInfo>
            <Form.Item
              name="name"
              label="컨텐츠 명"
              // rules={[{ required: true, message: '컨텐츠 명을 입력하세요!' }]}
            >
              <Input />
            </Form.Item>
            <Flex gap="small" align="center">
              {/* <h4 className="infoTit">기간</h4> */}
              <Form.Item
                name="startDate"
                label="컨텐츠 노출 기간"
                rules={[{ required: true, message: '날짜 범위를 선택하세요!' }]}
              >
                <DatePicker
                  value={popupFormData.startDate}
                  placeholder="YY.MM.DD"
                  onChange={(e) =>
                    setPopupFormData((prevData) => ({
                      ...prevData,
                      startDate: dayjs(e).format('YY.MM.DD'),
                    }))
                  }
                />
              </Form.Item>
              ~{' '}
              <Form.Item
                name="endDate"
                label=" "
                // rules={[{ required: true, message: '날짜 범위를 선택하세요!' }]}
              >
                <DatePicker
                  value={popupFormData.endDate}
                  placeholder="YY.MM.DD"
                  onChange={(e) =>
                    setPopupFormData((prevData) => ({
                      ...prevData,
                      endDate: dayjs(e).format('YY.MM.DD'),
                    }))
                  }
                />
              </Form.Item>
            </Flex>
            <Form.Item
              // name={['address', 'address']}
              name="address"
              label="주소 등록"
              rules={[{ required: false, message: '주소를 입력하세요!' }]}
            >
              <Address />
            </Form.Item>
            <Form.Item
              // name={['address', 'addressDetail']}
              name={'addressDetail'}
              label="상세 주소"
              rules={[{ required: false, message: '상세 주소를 입력하세요!' }]}
            >
              <Input placeholder="상세주소 입력" />
            </Form.Item>
            <Form.Item
              name="keywords"
              label="키워드 등록(,로 구분)"
              rules={[{ required: false, message: '키워드를 입력하세요!' }]}
            >
              <Input placeholder="키워드를 입력하세요." />
            </Form.Item>
            <Form.Item
              name="category"
              label="카테고리"
              rules={[{ required: false, message: '카테고리를 선택하세요!' }]}
            >
              <SelectOption
                selectItems={constantsData.CATEGORY_ITEMS}
                value={tableRecord?.category}
              />
            </Form.Item>
          </FormInfo>
          <Form.Item
            name="representImgUrl"
            label="대표 이미지"
            rules={[
              { required: false, message: '대표 이미지를 업로드하세요!' },
            ]}
          >
            <Upload
              // name="file"
              // className="avatar-uploader"
              // beforeUpload={()=>}
              fileList={mainImage ? [{ url: mainImage, uid: '-1' }] : []}
              // fileList={[{ url: mainImage, uid: '-1' }]}
              listType="picture-card"
              maxCount={1}
              onChange={handleMainImageChange}
            >
              {mainImage ? (
                <img
                  src={mainImage}
                  alt="대표 이미지"
                  style={{ width: '100%' }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="images"
            label="추가 이미지"
            rules={[
              { required: false, message: '추가 이미지를 업로드하세요!' },
            ]}
          >
            <Upload
              listType="picture-card"
              multiple
              fileList={additionalImages}
              onChange={handleAdditionalImagesChange}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            name="description"
            label="기본 설명"
            rules={[{ required: false, message: '기본 설명을 입력하세요!' }]}
          >
            <Input placeholder="최대 100Byte 가능" />
          </Form.Item>
          <Form.Item
            name="detailDescription"
            label="상세 설명"
            rules={[{ required: false, message: '상세 설명을 입력하세요!' }]}
          >
            <ToastEditor value={tableRecord?.detailDescription} />
          </Form.Item>
          <Form.Item
            name="stat"
            label="컨텐츠 노출 여부"
            rules={[
              { required: false, message: '컨텐츠 노출 여부를 선택하세요!' },
            ]}
          >
            <Radio.Group
              options={plainOptions}
              onChange={onPopupStateChange}
              value={popupState}
            />
          </Form.Item>
        </FormWrap>
        <Form.Item>
          <Button btnText={tableRecord ? '수정' : '등록'} htmlType="submit" />
        </Form.Item>
      </Form>
    </SubmitModal>
  )
}

export default PopupRegModal

const FormWrap = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fefefe;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 32px;
  border-radius: 8px;
  margin: 24px 0px 28px;
  .infoTit {
    font-size: 14px;
    color: #000;
    margin-bottom: 10px;
  }
`

const FormUpload = styled.div`
  display: flex;
  gap: 30px;
  .uploadBox {
    display: flex;
    flex-direction: column;
  }
`

const FormInfo = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 20px;
  background: #fefefe;
`
