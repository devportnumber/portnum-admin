import React from "react";
import {
  Button,
  SubmitModal,
  Input,
  RangeDatePicker,
  SelectOption,
} from "../../../components/index";
import styled from "styled-components";

const PopupRegModal = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <SubmitModal
      title={"컨텐츠 등록"}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <FormWrap>
        <Input inputTitle={"컨텐츠 명"} />
        <Input inputTitle={"주소 등록"} />
        <Input placeholder={"상세주소 입력"} />
        <RangeDatePicker />
        <SelectOption selectTitle={"카테고리"} />
        {/* <Input placeholder={"키워드 등록 (,로 구분"} /> */}
      </FormWrap>
    </SubmitModal>
  );
};

export default PopupRegModal;

const FormWrap = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
