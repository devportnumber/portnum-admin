import React, { useState } from "react";
import { Button, Modal } from "antd";

const ConfirmModal = ({ title, isModalOpen, setIsModalOpen, contents }) => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    alert("확인");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    alert("취소");
    setIsModalOpen(false);
  };
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
  );
};

export default ConfirmModal;
