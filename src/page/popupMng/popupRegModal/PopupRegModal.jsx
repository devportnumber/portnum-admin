import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Flex, Form, Radio, Upload } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  Address,
  Button,
  DatePicker,
  Input,
  SelectOption,
  SubmitModal,
  ToastEditor,
} from '../../../components/index'
import * as constantsData from '../service/constants'
import { usePopupDetailService } from '../service/usePopupDetailService'

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
  const {
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
    setLoading,
    loading,
  } = usePopupDetailService()

  // ✅ API 팝업등록
  const onFinish = (values) => {
    try {
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
      setIsUpload(true)
      storeSaveApi('/popup', 'POST', savePopupFormData, null)
      console.log('팝업 등록 완료:', savePopupFormData)
      console.log('#최등록#isUpload', isUpload)
      // 이미지 업로드
      setLoading(false)
      setIsModalOpen(false)
    } catch (error) {
      console.error('팝업 등록 중 오류 발생:', error)
      setLoading(false)
    }
  }

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
      form.setFieldValue('keywords', tableRecord.keywords?.join(', '))
      form.setFieldValue('mapUrl', tableRecord.mapUrl)
      form.setFieldValue('valid', tableRecord.valid)
      form.setFieldValue('description', tableRecord.description)
      form.setFieldValue('detailDescription', tableRecord.detailDescription)
      form.setFieldValue('representImgUrl', tableRecord.representImgUrl)
      form.setFieldValue('images', tableRecord.detailDescription)

      setMainImage(tableRecord?.representImgUrl)
      setAdditionalImages(tableRecord?.images)
    }
  }, [tableRecord])

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

  // 모달 닫을시 다 초기화
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
              onChange={(value) => setPopupState(value)}
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
