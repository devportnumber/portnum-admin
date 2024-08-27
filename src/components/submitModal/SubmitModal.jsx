import React, { useState } from 'react'
import { Button } from '../../components/index'
import { Flex, Modal, ConfigProvider } from 'antd'

const SubmitModal = ({
  title,
  isModalOpen,
  setIsModalOpen,
  children,
  handleSubmit,
  handleClose,
  isButton,
}) => {
  const handleOk = () => {
    if (handleSubmit) {
      handleSubmit()
    }
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    if (handleClose) {
      handleClose()
    }
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
        footer={
          isButton
            ? [
                <Flex gap={'small'} justify={'center'}>
                  <Button
                    btnText="취소"
                    key="back"
                    onClick={handleCancel}
                    cancel
                  />

                  <Button btnText="등록" key="submit" onClick={handleOk} />
                </Flex>,
              ]
            : null
        }
      >
        {children}
      </Modal>
    </ConfigProvider>
  )
}

export default SubmitModal
