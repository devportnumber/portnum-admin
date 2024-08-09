import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  BoxShadow,
  Button,
  ConfirmModal,
  Input,
  RangeDatePicker,
  SelectOption,
  TableList,
} from '../../components/index'
import { useAxios } from '../../hooks/useAxios'
import PopupRegModal from './popupRegModal/PopupRegModal'
import { usePopupMngService } from './service/usePopupMngService'
import * as constantsData from './service/constants'

const PopupMngPage = () => {
  const {
    storeListData,
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
  } = usePopupMngService()
  const [selectedFilterItems, setSelectedFilterItems] = useState([])
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [isModalOpenSubmit, setIsModalOpenSubmit] = useState(false)
  const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false)

  const { data: storeList, loading, error, fetchData } = useAxios()
  const [storeListState, setStoreListState] = useState()

  // 카테고리 드롭다운
  const CATEGORY_ITEMS = [
    {
      value: 'all',
      label: '전체',
    },
    {
      value: 'exhibition',
      label: '전시회',
    },
  ]

  // 상태 드롭다운
  const STATE_ITEMS = [
    {
      value: 'all',
      label: '전체',
    },
    {
      value: 'Y',
      label: '노출',
    },
    {
      value: 'N',
      label: '비노출',
    },
  ]
  const handleFilterChange = (e) => {
    // console.log("선택", e);
  }
  const handleTableRowClick = (record) => {
    // console.log('모달 클릭', record)
    setIsModalOpenSubmit(true)
    setSelectedRecord(record)
  }

  // api 연결
  useEffect(() => {
    if (storeListData) {
      setStoreListState(storeListData)
      console.log('storeListData', storeListData)
    }
  }, [storeListData])

  return (
    <div>
      <BoxShadow>
        <Row gutter={[10, 0]}>
          <Col span={8}>
            <SelectOption
              selectTitle={'카테고리'}
              selectItems={CATEGORY_ITEMS}
              onChange={handleCategoryChange}
            />
          </Col>
          <Col span={8}>
            <SelectOption
              selectTitle={'상태'}
              selectItems={STATE_ITEMS}
              onChange={handleStateChange}
            />
          </Col>
          <Col span={8}>
            <Input inputTitle={'팝업명'} onChange={handleNameChange} />
          </Col>
        </Row>
        <Row gutter={[20, 0]} align={'bottom'}>
          <Col span={24}>
            <RangeDatePicker
              isRangeBtn
              fromDate={startDate}
              toDate={endDate}
              setFromDate={setStartDate}
              setToDate={setEndDate}
            />
          </Col>
          {/* <Col span={8}>
            <DateButtons
              filterItems={FILTER_ITEMS}
              selectedFilterItems={selectedFilterItems}
              handleFilterChange={handleFilterChange}
            />
          </Col> */}
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
        rowKey={(record) => record.storeId}
        columns={constantsData.popupColumns}
        dataSource={storeListState}
        onRow={(record) => handleTableRowClick(record)}
        setCheckItem={setCheckItem}
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
