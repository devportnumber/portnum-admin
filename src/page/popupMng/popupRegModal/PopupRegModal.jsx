import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Flex, Form, Radio, Upload } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import ImageCard from '../imageCard/ImageCard'

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
const PopupRegModal = ({
  isModalOpen,
  setIsModalOpen,
  tableRecord,
  setTableRecord,
}) => {
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const [mode, setMode] = useState('create')
  const {
    popupFormData, // 폼 데이터
    setPopupFormData,
    storeSaveApi, // 최종 등록 api
    storeFilterData, // 팝업 등록 성공 데이터
    // onFinish, // 최종 등록, 수정 : 제출 함수
    isUpload,
    setIsUpload,
    handleMainImageChange, // 대표 이미지 핸들러
    handleAdditionalImagesChange, // 추가 이미지 핸들러
    handleDeleteImage,
    handleEditImage,
    popupState, // 라디오
    setPopupState,
    someMainImage,
    mainImage,
    setMainImage,
    additionalImages,
    setAdditionalImages,
    setLoading,
    loading,
  } = usePopupDetailService()
  const navigate = useNavigate()
  const adminId = localStorage.getItem('adminId') || null

  // ✅ API 팝업등록 버튼 클릭
  const onFinish = (values) => {
    console.log('등록 대표이미지 ', mainImage)
    console.log('등록 추가이미지 ', additionalImages)
    try {
      // const filteredImages = additionalImages.map(({ uid, ...rest }) => rest) // uid 제거
      const savePopupFormData = {
        ...values,
        adminId: parseInt(adminId),
        popupId: mode === 'edit' ? tableRecord?.popupId : null,
        representImgUrl: mainImage, // 대표 이미지 1장
        images: additionalImages, // 이미지 배열 9장
        keywords: values.keywords?.split(','),
        startDate: dayjs(values.startDate).format('YYYY-MM-DDTHH:mm:ss'),
        endDate: dayjs(values.endDate).format('YYYY-MM-DDTHH:mm:ss'),
        address: {
          address: values.address, // address 객체를 그대로 사용
          addressDetail: values.addressDetail, // addressDetail을 따로 사용
        },
      }

      setIsUpload(true) // 업로드 상태 변경
      console.log('####', savePopupFormData)

      if (mode === 'create') {
        // storeSaveApi('/popup', 'POST', savePopupFormData, null)
      }
      if (mode === 'edit') {
        // storeSaveApi('/popup', 'PATCH', savePopupFormData, null)
      }
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
  const populateForm = (record) => {
    form.setFieldsValue({
      name: record.name,
      category: record.category,
      startDate: dayjs(record.startDate),
      endDate: dayjs(record.endDate),
      stat: record.stat,
      address: record.address?.address,
      addressDetail: record.address?.addressDetail,
      keywords: record.keywords?.join(', '),
      mapUrl: record.mapUrl,
      valid: record.valid,
      description: record.description,
      detailDescription: record.detailDescription,
    })

    setMainImage(record.representImgUrl)
    const formattedImages =
      record.images?.map((image) => ({
        popupId: record.popupId,
        imgId: image.imgId,
        name: image.imgUrl.split('/').pop(),
        status: 'done',
        url: image.imgUrl,
      })) || []
    setAdditionalImages(formattedImages)
    setMode('edit')
  }

  const resetForm = () => {
    form.resetFields()
    setPopupFormData({})
    setMainImage(null)
    setAdditionalImages([])
    setIsUpload(false)
    setMode('create')
    setTableRecord(null) // 상세 정보 초기화 !!!
  }

  // 모달 닫을시 다 초기화
  const onClose = () => {
    resetForm()
    setIsModalOpen(false)
  }

  // 모달 열고 닫기
  useEffect(() => {
    if (isModalOpen) {
      if (tableRecord) {
        populateForm(tableRecord)
        setMode('edit')
      } else {
        resetForm()
        setMode('create')
      }
    }
  }, [isModalOpen, tableRecord])

  // 메인 이미지 수정
  const handleImageEdit = (type) => {
    console.log('type', type)
  }

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
              rules={[{ required: false, message: '컨텐츠 명을 입력하세요!' }]}
            >
              <Input />
            </Form.Item>
            <Flex gap="small" align="center">
              {/* <h4 className="infoTit">기간</h4> */}
              <Form.Item
                name="startDate"
                label="컨텐츠 노출 기간"
                rules={[
                  { required: false, message: '날짜 범위를 선택하세요!' },
                ]}
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
          <ImageCard
            someMainImage={someMainImage}
            mainImage={mainImage}
            setMainImage={setMainImage}
            additionalImages={additionalImages}
            setAdditionalImages={setAdditionalImages}
            handleMainImageChange={handleMainImageChange}
            handleAdditionalImagesChange={handleAdditionalImagesChange}
            handleDeleteImage={handleDeleteImage}
            handleEditImage={handleEditImage}
          />
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
              { required: true, message: '컨텐츠 노출 여부를 선택하세요!' },
            ]}
          >
            <Radio.Group
              options={plainOptions}
              onChange={(value) => setPopupState(value)}
              value={popupState}
            />
          </Form.Item>
        </FormWrap>
        <BtnWrap>
          <Button
            btnText={'취소'}
            htmlType="submit"
            width={'120px'}
            cancel
            onClick={onClose}
          />
          <Form.Item>
            <Button
              btnText={mode === 'create' ? '등록' : '수정'}
              htmlType="submit"
              width={'120px'}
            />
          </Form.Item>
        </BtnWrap>
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

const BtnWrap = styled.div`
  width: 248px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin: 0 auto;
`
