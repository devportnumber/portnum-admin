import React, { useState } from 'react'
import {
  Button,
  SubmitModal,
  Input,
  RangeDatePicker,
  SelectOption,
  Address,
} from '../../../components/index'
import { Upload, message, Radio, Form } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { usePopupMngService } from '../service/usePopupMngService'

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
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

const PopupRegModal = ({ isModalOpen, setIsModalOpen }) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [value1, setValue1] = useState('Apple')
  const [address, setAddress] = useState(null)

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
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

  const onChange1 = ({ target: { value } }) => {
    console.log('radio1 checked', value)
    setValue1(value)
  }

  const onFinish = (values) => {
    console.log('Received values:', values)
  }

  return (
    <SubmitModal
      title={'컨텐츠 등록'}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      handleSubmit={onFinish}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <FormWrap>
          <FormInfo>
            <Form.Item
              name="contentName"
              label="컨텐츠 명"
              rules={[{ required: true, message: '컨텐츠 명을 입력하세요!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="dateRange"
              label="컨텐츠 노출 기간"
              rules={[{ required: true, message: '날짜 범위를 선택하세요!' }]}
            >
              <RangeDatePicker />
            </Form.Item>
            <Form.Item
              name="address"
              label="주소 등록"
              rules={[{ required: true, message: '주소를 입력하세요!' }]}
            >
              <Address address={address} setAddress={setAddress} />
            </Form.Item>
            <Form.Item
              name="detailAddress"
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
              <SelectOption />
            </Form.Item>
          </FormInfo>
          <FormUpload>
            <Form.Item
              label="대표 이미지"
              rules={[
                { required: true, message: '대표 이미지를 업로드하세요!' },
              ]}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: '100%',
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              label="추가 이미지"
              rules={[
                { required: true, message: '추가 이미지를 업로드하세요!' },
              ]}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: '100%',
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </FormUpload>
          <Form.Item
            name="description"
            label="기본 설명"
            rules={[{ required: true, message: '기본 설명을 입력하세요!' }]}
          >
            <Input placeholder="최대 100Byte 가능" />
          </Form.Item>
          <Form.Item
            name="details"
            label="상세 설명"
            rules={[{ required: true, message: '상세 설명을 입력하세요!' }]}
          >
            <Input placeholder="최대 100Byte 가능" />
          </Form.Item>
          <Form.Item
            name="exposure"
            label="컨텐츠 노출 여부"
            rules={[
              { required: true, message: '컨텐츠 노출 여부를 선택하세요!' },
            ]}
          >
            <Radio.Group
              options={plainOptions}
              onChange={onChange1}
              value={value1}
            />
          </Form.Item>
        </FormWrap>
        {/* <Form.Item>
          <Button btnText={'등록'} htmlType="submit" />
        </Form.Item> */}
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
