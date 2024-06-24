import React, { useState } from "react";
import {
  Input,
  BoxShadow,
  TableList,
  SelectOption,
  RangeDatePicker,
  Button,
  DateButtons,
  ConfirmModal,
} from "../../components/index";
import { Row, Col } from "antd";
import PopupRegModal from "./popupRegModal/PopupRegModal";

const PopupMngPage = () => {
  const [selectedFilterItems, setSelectedFilterItems] = useState([]);
  const [isModalOpenSubmit, setIsModalOpenSubmit] = useState(false);
  const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);

  const FILTER_ITEMS = [
    { id: 1, label: "당월", reqData: "" },
    { id: 2, label: "1주일", reqData: "Y" },
    { id: 3, label: "1개월", reqData: "N" },
    { id: 4, label: "2개월", reqData: "D" },
  ];

  const handleFilterChange = (e) => {
    console.log("선택", e);
  };

  return (
    <div>
      <BoxShadow>
        <Row gutter={[10, 0]}>
          <Col span={8}>
            <SelectOption selectTitle={"카테고리"} />
          </Col>
          <Col span={8}>
            <SelectOption selectTitle={"상태"} />
          </Col>
          <Col span={8}>
            <Input inputTitle={"팝업명"} />
          </Col>
        </Row>
        <Row gutter={[20, 0]} align={"bottom"}>
          <Col span={12}>
            <RangeDatePicker />
          </Col>
          <Col span={8}>
            <DateButtons
              filterItems={FILTER_ITEMS}
              selectedFilterItems={selectedFilterItems}
              handleFilterChange={handleFilterChange}
            />
          </Col>
        </Row>
        <Row justify={"space-between"}>
          <Col>
            <Button
              btnText={"팝업등록"}
              onClick={() => setIsModalOpenSubmit(true)}
            />
            <PopupRegModal
              isModalOpen={isModalOpenSubmit}
              setIsModalOpen={setIsModalOpenSubmit}
            />
          </Col>
          <Col>
            <Button btnText={"조회"} />
          </Col>
        </Row>
      </BoxShadow>
      <TableList />
      <Button
        btnText={"삭제"}
        cancel
        onClick={() => setIsModalOpenConfirm(true)}
      />
      <ConfirmModal
        title={"삭제 알림"}
        isModalOpen={isModalOpenConfirm}
        setIsModalOpen={setIsModalOpenConfirm}
        contents={"데이터를 삭제하시겠습니까?"}
      />
    </div>
  );
};

export default PopupMngPage;
