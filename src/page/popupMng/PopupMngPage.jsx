import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Input,
  BoxShadow,
  TableList,
  SelectOption,
  RangeDatePicker,
  Button,
  DateButtons,
  ConfirmModal,
} from '../../components/index'
import { Row, Col } from 'antd'
import PopupRegModal from './popupRegModal/PopupRegModal'
import { useAxios } from '../../hooks/useAxios'

const PopupMngPage = () => {
  const [selectedFilterItems, setSelectedFilterItems] = useState([])
  const [isModalOpenSubmit, setIsModalOpenSubmit] = useState(false)
  const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false)

  const { fetchData, loading, data: storeList, error } = useAxios()

  // 날짜 선택 버튼
  const FILTER_ITEMS = [
    { id: 1, label: '당월', reqData: '' },
    { id: 2, label: '1주일', reqData: 'Y' },
    { id: 3, label: '1개월', reqData: 'N' },
    { id: 4, label: '2개월', reqData: 'D' },
  ]

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

  useEffect(() => {
    fetchData('GET', `/list`, null, null)
    console.log('storeList', storeList)
  }, [])

  return (
    <div>
      <BoxShadow>
        <Row gutter={[10, 0]}>
          <Col span={8}>
            <SelectOption
              selectTitle={'카테고리'}
              selectItems={CATEGORY_ITEMS}
            />
          </Col>
          <Col span={8}>
            <SelectOption selectTitle={'상태'} selectItems={STATE_ITEMS} />
          </Col>
          <Col span={8}>
            <Input inputTitle={'팝업명'} />
          </Col>
        </Row>
        <Row gutter={[20, 0]} align={'bottom'}>
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
            <Button btnText={'조회'} />
          </Col>
        </Row>
      </ButtonWrap>
      <TableList />
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
