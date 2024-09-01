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

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

// 이미지 파일만 허용하도록 설정

const beforeUpload = (file) => {
  // 파일 크기 제한 등 사전 검사를 여기서 할 수 있음 (예: 파일 크기 체크)
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('JPG/PNG 파일만 업로드할 수 있습니다.')
    return Upload.LIST_IGNORE // 업로드 취소
  }

  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('이미지 크기는 2MB 이하로 제한됩니다.')
    return Upload.LIST_IGNORE
  }

  return true
}
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
  const [mainImage, setMainImage] = useState('') // 대표 이미지
  const [additionalImages, setAdditionalImages] = useState([]) // 추가 이미지

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

  useEffect(() => {
    if (tableRecord) {
      form.setFieldValue('name', tableRecord.name)
      form.setFieldValue('category', tableRecord.category)
      form.setFieldValue('startDate', tableRecord.startDate)
      form.setFieldValue('endDate', tableRecord.endDate)
      form.setFieldValue('stat', tableRecord.stat)
      form.setFieldValue('address', tableRecord.address?.address)
      form.setFieldValue('addressDetail', tableRecord.address?.addressDetail)
      form.setFieldValue('mapUrl', tableRecord.mapUrl)
      form.setFieldValue('valid', tableRecord.valid)
      form.setFieldValue('description', tableRecord.description)
      form.setFieldValue('detailDescription', tableRecord.detailDescription)
    }
  }, [tableRecord])

  const [popupFormData, setPopupFormData] = useState({
    adminId: 1,
    name: '',
    category: '',
    startDate: dayjs().format('YYYY-MM-DDT00:00:00'),
    endDate: dayjs().format('YYYY-MM-DDT00:00:00'),
    stat: '',
    neighborhood: '',
    longitude: '', // 경도
    latitude: '', // 위도
    mapUrl: '', // 네이버 지도
    address: '',
    addressDetail: '',
    description: editorTextData, // 상세 설명?
    representImgUrl: mainImage, // 대표 이미지 1장
    images: additionalImages, // 이미지 배열 9장
  })

  const handleRepresentChange = async ({ file }) => {
    console.log('파일', file)
    // 1. 백엔드에 GET 요청으로 preSignedUrl을 받아옴
    // storeImgGetApi('/image', 'GET', null, { imageName: file.name })
    // if (file.status === 'uploading') {
    //   setLoading(true)
    //   return
    // }

    // if (file.status === 'done') {
    //   try {
    //     setLoading(false)
    //     message.success('이미지 업로드에 성공했습니다.')
    //   } catch (error) {
    //     setLoading(false)
    //     message.error('이미지 업로드에 실패했습니다.')
    //   }
    // }
  }

  const handleMainImageChange = ({ file }) => {
    setMainImage(file)
  }

  const handleAdditionalImagesChange = ({ fileList }) => {
    console.log('파일 리스트', fileList)
    setAdditionalImages(fileList.slice(0, 9)) // 최대 9개만 추가 가능하게 설정
  }

  const handleUpload = () => {
    // 파일 목록을 처리하여 서버에 전송
    // console.log('대표 이미지 URL:', imageUrl)
    // console.log('추가 이미지 목록:', imageList)
  }

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
    console.log('radio1 checked', value)
    setPopupState(value)
  }

  // API 팝업등록
  const onFinish = (values) => {
    const savePopupFormData = {
      ...popupFormData,
      // description: editorTextData,
    }
    console.log('등록: savePopupFormData:', savePopupFormData)
    setPopupFormData(savePopupFormData)
    // storeSaveApi('/popup', 'POST', savePopupFormData, null)
    // console.log('Received values:', popupFormData)
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

  useEffect(() => {
    console.log('storeImgGetData', storeImgGetData)
    if (storeImgGetData) {
      const { preSignedUrl, imageSaveUrl } = storeImgGetData.data
      // 2. 받은 preSignedUrl로 S3에 이미지 업로드
      storeImgPostApi('/image', 'POST', null, null)
    }
  }, [storeImgGetData])

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
              name="address"
              label="주소 등록"
              rules={[{ required: true, message: '주소를 입력하세요!' }]}
            >
              <Address />
            </Form.Item>
            <Form.Item
              name="addressDetail"
              label="상세 주소"
              rules={[{ required: true, message: '상세 주소를 입력하세요!' }]}
            >
              <Input placeholder="상세주소 입력" />
            </Form.Item>
            <Form.Item
              name="keywords"
              label="키워드 등록(,로 구분)"
              rules={[{ required: true, message: '키워드를 입력하세요!' }]}
            >
              <Input placeholder="키워드를 입력하세요." />
            </Form.Item>
            <Form.Item
              name="category"
              label="카테고리"
              rules={[{ required: true, message: '카테고리를 선택하세요!' }]}
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
            rules={[{ required: true, message: '대표 이미지를 업로드하세요!' }]}
          >
            <Upload
              // name="file"
              // className="avatar-uploader"
              // beforeUpload={beforeUpload}
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
            rules={[{ required: true, message: '추가 이미지를 업로드하세요!' }]}
          >
            <Upload
              // name="file"
              // className="avatar-uploader"
              // multiple
              // beforeUpload={beforeUpload}
              // fileList={imageList}
              // onChange={handleAdditionalChange}
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
            rules={[{ required: true, message: '기본 설명을 입력하세요!' }]}
          >
            <Input placeholder="최대 100Byte 가능" />
          </Form.Item>
          <Form.Item
            name="detailDescription"
            label="상세 설명"
            rules={[{ required: true, message: '상세 설명을 입력하세요!' }]}
          >
            <ToastEditor />
          </Form.Item>
          <Form.Item
            name="stat"
            label="컨텐츠 노출 여부"
            rules={[
              { required: true, message: '컨텐츠 노출 여부를 선택하세요!' },
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
