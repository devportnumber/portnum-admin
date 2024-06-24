import React from "react";
import { Button, SubmitModal } from "../../../components/index";
import styled from "styled-components";

const PopupRegModal = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <SubmitModal
      title={"컨텐츠 등록"}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <p>안</p>
    </SubmitModal>
  );
};

export default PopupRegModal;
