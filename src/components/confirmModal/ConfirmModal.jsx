import React, { useState } from 'react'
import { Button, Modal } from 'antd'

const ConfirmModal = ({
  title,
  isModalOpen,
  setIsModalOpen,
  contents,
  onOk,
}) => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    onOk()
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{contents}</p>
      </Modal>
    </>
  )
}

export default ConfirmModal
