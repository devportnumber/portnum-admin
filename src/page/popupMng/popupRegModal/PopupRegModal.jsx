import React, { useState } from "react";
import {
  Button,
  SubmitModal,
  Input,
  RangeDatePicker,
  SelectOption,
} from "../../../components/index";
import { Upload, message, Radio } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const plainOptions = [
  {
    label: "노출",
    value: "Y",
  },
  {
    label: "비노출",
    value: "N",
  },
];

const PopupRegModal = ({ isModalOpen, setIsModalOpen }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [value1, setValue1] = useState("Apple");

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (url) => {
      //   setLoading(false);
      //   setImageUrl(url);
      // });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  );
  const onChange1 = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setValue1(value);
  };
  return (
    <SubmitModal
      title={"컨텐츠 등록"}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <FormWrap>
        <FormInfo>
          <Input inputTitle={"컨텐츠 명"} />
          <RangeDatePicker />
          <Input inputTitle={"주소 등록"} />
          <Input inputTitle={"상세 주소"} placeholder={"상세주소 입력"} />
          <Input
            inputTitle={"키워드 등록(,로 구분"}
            placeholder={"키워드를 입력하세요."}
          />
          <SelectOption selectTitle={"카테고리"} />
        </FormInfo>
        <FormUpload>
          <div className="uploadBox">
            <h4 className="infoTit">대표 이미지</h4>
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
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
          <div className="uploadBox">
            <h4 className="infoTit">추가 이미지</h4>
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
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
        </FormUpload>
        <Input inputTitle={"기본 설명"} placeholder={"최대 100Byte 가능"} />
        <Input inputTitle={"상세 설명"} placeholder={"최대 100Byte 가능"} />
        <div>
          <h4 className="infoTit">컨텐츠 노출 여부</h4>
          <Radio.Group
            options={plainOptions}
            onChange={onChange1}
            value={value1}
          />
        </div>
      </FormWrap>
    </SubmitModal>
  );
};

export default PopupRegModal;

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
`;
const FormUpload = styled.div`
  display: flex;
  gap: 30px;
  .uploadBox {
    display: flex;
    flex-direction: column;
  }
`;

const FormInfo = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 20px;
  background: #fefefe;
`;
