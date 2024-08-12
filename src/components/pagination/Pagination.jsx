import React, { useState } from 'react'
import { Pagination as Paging } from 'antd'
import styled from 'styled-components'

const Pagination = ({ size, currentPage, setCurrentPage, total }) => {
  //페이지 이동 함수
  const onPageChange = (page) => {
    setCurrentPage(page)
  }
  return (
    <PaginationWrap>
      <Paging
        defaultPageSize={size}
        current={currentPage}
        total={total}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </PaginationWrap>
  )
}

export default Pagination

const PaginationWrap = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`
