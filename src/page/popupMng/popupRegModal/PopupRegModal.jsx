import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Flex, Form, Radio, Upload, Modal } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
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
  const [mode, setMode] = useState('create')
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
  const navigate = useNavigate()

  // ✅ API 팝업등록
  const onFinish = (values) => {
    try {
      const filteredImages = additionalImages.map(({ uid, ...rest }) => rest) // uid 제거
      const savePopupFormData = {
        ...values,
        adminId: mode === 'edit' ? 1 : null,
        popupId: mode === 'edit' ? tableRecord?.popupId : null,
        representImgUrl: mainImage, // 대표 이미지 1장
        images: filteredImages, // 이미지 배열 9장
        keywords: values.keywords.split(','),
        address: {
          address: values.address, // address 객체를 그대로 사용
          addressDetail: values.addressDetail, // addressDetail을 따로 사용
        },
      }
      console.log('####', savePopupFormData)
      setIsUpload(true)
      if (mode === 'create') {
        storeSaveApi('/popup', 'POST', savePopupFormData, null)
      }
      if (mode === 'edit') {
        storeSaveApi('/popup', 'PATCH', savePopupFormData, null)
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
  // useEffect(() => {
  //   if (isModalOpen) {
  //     if (tableRecord) {
  //       setMode('edit')
  //       populateForm(tableRecord)
  //     } else {
  //       setMode('create')
  //       resetForm()
  //     }
  //   }
  // }, [tableRecord, isModalOpen])

  useEffect(() => {
    if (isModalOpen) {
      if (tableRecord) {
        setMode('edit')
        populateForm(tableRecord)
      } else {
        resetForm()
      }
    } else {
      resetForm()
    }
  }, [isModalOpen, tableRecord])

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
        uid: image.imgId,
        name: image.imgUrl.split('/').pop(),
        status: 'done',
        url: image.imgUrl,
      })) || []
    setAdditionalImages(formattedImages)
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

      setMainImage(tableRecord?.representImgUrl)
      // setAdditionalImages(tableRecord?.images)

      // 추가 이미지 설정
      const formattedImages = tableRecord.images.map((image) => ({
        uid: image.imgId, // 고유한 uid
        name: image.imgUrl.split('/').pop(), // 파일 이름
        status: 'done', // 상태
        url: image.imgUrl, // 이미지 URL
      }))
      setAdditionalImages(formattedImages)
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
  const resetForm = () => {
    // form.resetFields()
    // setPopupFormData({})
    // setMainImage(null)
    // setAdditionalImages([])
    // setIsUpload(false)
    form.resetFields()
    setPopupFormData({})
    setMainImage(null)
    setAdditionalImages([])
    setIsUpload(false)
    setMode('create')
    setPopupState(undefined)
  }

  // 모달 닫을시 다 초기화
  const onClose = () => {
    resetForm()
    setIsModalOpen(false)
  }

  const handleImageEdit = (type) => {
    Modal.confirm({
      title: '이미지 수정',
      content: '현재 이미지를 삭제하고 새 이미지를 업로드하시겠습니까?',
      onOk: () => {
        if (type === 'main') {
          setMainImage(null)
        } else {
          setAdditionalImages([])
        }
      },
    })
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
              rules={[{ required: true, message: '컨텐츠 명을 입력하세요!' }]}
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
              rules={[{ required: true, message: '주소를 입력하세요!' }]}
            >
              <Address />
            </Form.Item>
            <Form.Item
              // name={['address', 'addressDetail']}
              name={'addressDetail'}
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
            value={mainImage}
            rules={[{ required: true, message: '대표 이미지를 업로드하세요!' }]}
          >
            <Upload
              name="file"
              fileList={mainImage ? [{ url: mainImage, uid: '-1' }] : []}
              // fileList={[{ url: mainImage, uid: '-1' }]}
              listType="picture-card"
              maxCount={1}
              onChange={handleMainImageChange}
            >
              {mainImage ? (
                <Button
                  btnText={'수정'}
                  onClick={() => handleImageEdit('main')}
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
              name="file"
              listType="picture-card"
              multiple
              fileList={additionalImages}
              maxCount={9}
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
