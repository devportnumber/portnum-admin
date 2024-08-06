import React, { useState } from 'react'
import styled from 'styled-components'
import { DatePicker, Space, Row, Col } from 'antd'
import DateButtons from '../dateButtons/DateButtons'
import dayjs from 'dayjs'
const { RangePicker } = DatePicker

const RangeDatePicker = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  title,
  isRangeBtn,
}) => {
  const [selectedFilterItems, setSelectedFilterItems] = useState([])
  const today = dayjs().format('YYYYMMDD')
  const [dateRange, setDateRange] = useState([fromDate, toDate])
  // 당월
  const currentMonth = () => {
    const startOfMonth = dayjs().startOf('month').format('YYYYMMDD')
    setFromDate(startOfMonth)
    setToDate(today)
  }

  const currentThreeMonth = () => {
    const threeMonthsAgo = dayjs()
      .subtract(3, 'month')
      .startOf('month')
      .format('YYYYMMDD')
    setFromDate(threeMonthsAgo)
    setToDate(today)
  }

  const currentSixMonth = () => {
    const sixMonthsAgo = dayjs()
      .subtract(6, 'month')
      .startOf('month')
      .format('YYYYMMDD')
    setFromDate(sixMonthsAgo)
    setToDate(today)
  }
  // 날짜 선택 버튼
  const FILTER_ITEMS = [
    { id: 1, label: '당월', reqData: '' },
    { id: 2, label: '1주일', reqData: 'Y' },
    { id: 3, label: '1개월', reqData: 'N' },
    { id: 4, label: '2개월', reqData: 'D' },
  ]

  const handleDateChange = (dates, dateStrings) => {
    console.log('dates', dates)
    if (dates) {
      const fromDate = dates[0].format('YYYYMMDD')
      const toDate = dates[1].format('YYYYMMDD')
      setFromDate(fromDate)
      setToDate(toDate)
    } else {
      setFromDate(null)
      setToDate(null)
    }
  }

  return (
    <Row gutter={[16, 0]} align={'bottom'}>
      {isRangeBtn ? (
        <>
          <Col span={12}>
            <DateTitle>기간</DateTitle>
            <RangePicker
              style={{
                width: '100%',
              }}
              onChange={handleDateChange}
              value={dateRange}
            />
          </Col>

          <Col span={12}>
            <FilterWrap>
              {title && <h4 className="filterTit">{title}</h4>}
              <DayBtn>
                <p className="btnTxt" onClick={currentMonth}>
                  당월
                </p>
              </DayBtn>
              <DayBtn>
                <p className="btnTxt" onClick={currentThreeMonth}>
                  1주일
                </p>
              </DayBtn>
              <DayBtn>
                <p className="btnTxt" onClick={currentThreeMonth}>
                  1개월
                </p>
              </DayBtn>
              <DayBtn>
                <p className="btnTxt" onClick={currentSixMonth}>
                  2개월
                </p>
              </DayBtn>
            </FilterWrap>
          </Col>
        </>
      ) : (
        <Col span={24}>
          <RangePicker
            style={{
              width: '100%',
            }}
            onChange={(dates) => {}}
          />
        </Col>
      )}
    </Row>
  )
}

export default RangeDatePicker

const DateWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`
const DateTitle = styled.h4`
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
`
const FilterWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 40px;
  .filterTit {
    font-size: 14px;
    color: #000;
    width: 100px;
  }
`
const DayBtn = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #00000099;

  .btnTxt {
    font-size: 15px;
    color: #00000099;
  }
`
