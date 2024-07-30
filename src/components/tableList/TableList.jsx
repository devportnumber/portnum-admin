import React, { useState } from 'react'
import styled from 'styled-components'
import { ConfigProvider, Divider, Radio, Table } from 'antd'

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(
//       `selectedRowKeys: ${selectedRowKeys}`,
//       'selectedRows: ',
//       selectedRows,
//     )
//   },
//   getCheckboxProps: (record) => ({
//     // disabled: record.name === "Disabled User",
//     // // Column configuration not to be checked
//     // name: record.name,
//   }),
// }
const TableList = ({
  columns,
  dataSource,
  onRow,
  rowKey,
  onSelectionChange,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys)
    onSelectionChange(newSelectedRowKeys, selectedRows)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
            type: 'checkbox',
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
