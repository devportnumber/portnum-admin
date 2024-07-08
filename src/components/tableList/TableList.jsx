import React, { useState } from "react";
import styled from "styled-components";
import { ConfigProvider, Divider, Radio, Table } from "antd";

const columns = [
  {
    title: "no",
    dataIndex: "name",
    render: (text, _, i) => {
      return <p>{i + 1}</p>;
    },
  },
  {
    title: "팝업코드",
    dataIndex: "test1",
  },
  {
    title: "태그명",
    dataIndex: "test2",
  },
  {
    title: "팝업명",
    dataIndex: "test3",
  },
  {
    title: "팝업기간",
    dataIndex: "test4",
  },
  {
    title: "등록일시",
    dataIndex: "test5",
  },
  {
    title: "상태",
    dataIndex: "test6",
  },
];
const data = [
  {
    key: "1",
    test1: "PO01",
    test2: "패션",
    test3: "우디",
    test4: "YYYY.MM.DD ~ YYYY.MM.DD",
    test5: "YYYY.MM.DD",
    test6: "노출",
  },
  {
    key: "2",
    test1: "PO02",
    test2: "푸드",
    test3: "제이슨",
    test4: "YYYY.MM.DD ~ YYYY.MM.DD",
    test5: "YYYY.MM.DD",
    test6: "비 노출",
  },
  {
    key: "3",
    test1: "PO03",
    test2: "전시",
    test3: "레리",
    test4: "YYYY.MM.DD ~ YYYY.MM.DD",
    test5: "YYYY.MM.DD",
    test6: "기간종료",
  },
  {
    key: "4",
    test1: "PO04",
    test2: "패션",
    test3: "다니엘",
    test4: "YYYY.MM.DD ~ YYYY.MM.DD",
    test5: "YYYY.MM.DD",
    test6: "노출",
  },
];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    // disabled: record.name === "Disabled User",
    // // Column configuration not to be checked
    // name: record.name,
  }),
};
const TableList = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  return (
    <Wrap>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              // borderColor: "#dbdbdb;",
            },
          },
        }}
      >
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </ConfigProvider>
    </Wrap>
  );
};

export default TableList;

const Wrap = styled.section`
  /* display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; */
  margin-bottom: 20px;
  /* .ant-spin-nested-loading {
    border: 1px solid #dbdbdb;
  } */
  .ant-checkbox-inner {
    border-radius: 50%; /* 체크박스를 동그랗게 만듭니다. */
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #5d5fef; /* 체크된 상태의 배경색을 원하는 색상으로 설정합니다. */
    border-color: #5d5fef; /* 체크된 상태의 테두리 색상도 동일하게 설정할 수 있습니다. */
  }
  .ant-table-thead > tr > th {
    text-align: center;
  }
  .ant-table-tbody > tr > td {
    text-align: center;
  }
`;
