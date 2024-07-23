import React, { useState } from 'react'
import { Button } from '../../components/index'
import { Flex, Modal, ConfigProvider } from 'antd'

const SubmitModal = ({
  title,
  isModalOpen,
  setIsModalOpen,
  children,
  handleSubmit,
}) => {
  const handleOk = () => {
    setIsModalOpen(false)
    if (handleSubmit) {
      handleSubmit()
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            titleFontSize: 18,
            titleLineHeight: 2,
          },
        },
      }}
    >
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1300}
        footer={[
          <Flex gap={'small'} justify={'center'}>
            <Button btnText="취소" key="back" onClick={handleCancel} cancel />

            <Button btnText="등록" key="submit" onClick={handleOk} />
          </Flex>,
        ]}
      >
        {children}
      </Modal>
    </ConfigProvider>
  )
}

export default SubmitModal
