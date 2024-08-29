import { Col, Row, Flex } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  BoxShadow,
  Button,
  ConfirmModal,
  Input,
  RangeDatePicker,
  DatePicker,
  SelectOption,
  TableList,
  Pagination,
  DateButtons,
} from '../../components/index'
import { useAxios } from '../../hooks/useAxios'
import PopupRegModal from './popupRegModal/PopupRegModal'
import { usePopupMngService } from './service/usePopupMngService'
import * as constantsData from './service/constants'

const PopupMngPage = () => {
  const {
    storeListState,
    handleFilterClick,
    handleCategoryChange,
    handleStateChange,
    handleNameChange,
    handleDeleteClick,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setCheckItem,
    currentPage,
    setCurrentPage,
  } = usePopupMngService()
  const [selectedFilterItems, setSelectedFilterItems] = useState([])
  const [tableRecord, setTableRecord] = useState(null)
  const [isModalOpenSubmit, setIsModalOpenSubmit] = useState(false)
  const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false)

  const { data: storeList, loading, error, fetchData } = useAxios()

  // const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  // const paginateData = (data, currentPage, pageSize) => {
  //   const startIndex = (currentPage - 1) * pageSize // 시작 인덱스
  //   const endIndex = startIndex + pageSize // 끝 인덱스
  //   return data?.slice(startIndex, endIndex)
  // }
  // const currentData = paginateData(storeListState, currentPage, pageSize)

  const handleFilterChange = (e) => {
    // console.log("선택", e);
  }
  const handleTableRowClick = (record) => {
    // console.log('모달 클릭', record)
    setIsModalOpenSubmit(true)
    setTableRecord(record)
  }

  const LIST_NUMBER_COLUMN = [
    {
      title: 'No',
      dataIndex: 'number',
      key: 'number',
      render: (text, row, index) => {
        const startIndex = (currentPage - 1) * 10
        const count = startIndex + index + 1
        return <p>{count}</p>
      },
    },
  ]

  return (
    <div>
      <BoxShadow>
        <Row gutter={[10, 0]}>
          <Col span={8}>
            <SelectOption
              selectTitle={'카테고리'}
              selectItems={constantsData.CATEGORY_ITEMS}
              onChange={handleCategoryChange}
            />
          </Col>
          <Col span={8}>
            <SelectOption
              selectTitle={'상태'}
              selectItems={constantsData.STATE_ITEMS}
              onChange={handleStateChange}
            />
          </Col>
          <Col span={8}>
            <Input inputTitle={'팝업명'} onChange={handleNameChange} />
          </Col>
        </Row>
        <Row gutter={[10, 0]} align={'bottom'}>
          <Col span={14}>
            <p>기간</p>
            <Flex gap="small" align="center">
              <DatePicker
                value={startDate}
                placeholder="YYYY-MM-DD"
                onChange={(e) => setStartDate(e)}
              />
              ~
              <DatePicker
                value={endDate}
                placeholder="YYYY-MM-DD"
                onChange={(e) => setEndDate(e)}
              />
            </Flex>
          </Col>
          <Col span={8}>
            <DateButtons setFromDate={setStartDate} setToDate={setEndDate} />
          </Col>
        </Row>
      </BoxShadow>
      <ButtonWrap>
        <div>
          <Button
            btnText={'팝업등록'}
            onClick={() => setIsModalOpenSubmit(true)}
          />
          <PopupRegModal
            isModalOpen={isModalOpenSubmit}
            setIsModalOpen={setIsModalOpenSubmit}
            tableRecord={tableRecord}
          />
        </div>
        <Row gutter={[10, 10]}>
          <Col>
            <Button btnText={'초기화'} cancel />
          </Col>
          <Col>
            <Button btnText={'조회'} onClick={handleFilterClick} />
          </Col>
        </Row>
      </ButtonWrap>
      {/* 테이블 리스트 */}
      <TableList
        rowKey={(record) => record.popupId}
        columns={[...LIST_NUMBER_COLUMN, ...constantsData.popupColumns]}
        dataSource={storeListState}
        onRow={(record) => handleTableRowClick(record)}
        setCheckItem={setCheckItem}
      />
      <Pagination
        size={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={storeListState?.length}
      />
      <Button
        btnText={'선택 삭제'}
        cancel
        onClick={() => setIsModalOpenConfirm(true)}
      />
      <ConfirmModal
        title={'삭제 알림'}
        isModalOpen={isModalOpenConfirm}
        setIsModalOpen={setIsModalOpenConfirm}
        contents={'데이터를 삭제하시겠습니까?'}
        onOk={handleDeleteClick}
      />
    </div>
  )
}

export default PopupMngPage

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 55px;
`
