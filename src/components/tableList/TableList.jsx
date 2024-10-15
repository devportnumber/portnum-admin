import React, { useState } from 'react'
import styled from 'styled-components'
import { ConfigProvider, Divider, Radio, Table } from 'antd'

const TableList = ({ columns, dataSource, onRow, rowKey, setCheckItem }) => {
  const [selectionType, setSelectionType] = useState('checkbox')
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const selectRowsArr = selectedRows.map((x) => x.popupId)

      console.log('selectRowsArr', selectRowsArr)
      setCheckItem(selectRowsArr)
    },
    getCheckboxProps: (record) => ({
      // disabled: record.name === "Disabled User",
      // // Column configuration not to be checked
      // name: record.name,
    }),
  }
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
          rowKey={rowKey}
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          onRow={(record, rowIndex) => {
            // if (isrowclick) {
            return {
              onClick: (event) => {
                // console.log('record-' + JSON.stringify(record))
                // console.log('rowIndex-' + rowIndex)
                // console.log('event', event) // 임시 -> 상세페이지로 이동
                onRow(record)
              },
            }
            // }
          }}
        />
      </ConfigProvider>
    </Wrap>
  )
}

export default TableList

const Wrap = styled.section`
  /* display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; */
  margin-bottom: 20px;
  /* .ant-spin-nested-loading {
    border: 1px solid #dbdbdb;
  } */
  table {
    /* border: 1px solid #000; */
    box-shadow: 0px 2px 6px 0px #0000001a;
    box-shadow: 0px 0px 0px 1px #00000005;
  }
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
`
