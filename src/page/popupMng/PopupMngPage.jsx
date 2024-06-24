import React, { useState } from "react";
import {
  Input,
  BoxShadow,
  TableList,
  SelectOption,
  RangeDatePicker,
  Button,
  DateButtons,
} from "../../components/index";
import { Row, Col } from "antd";

const PopupMngPage = () => {
  const [selectedFilterItems, setSelectedFilterItems] = useState([]);

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
            <Button btnText={"팝업등록"} />
          </Col>
          <Col>
            <Button btnText={"조회"} />
          </Col>
        </Row>
      </BoxShadow>
      <TableList />
      <Button btnText={"삭제"} cancel />
    </div>
  );
};

export default PopupMngPage;
