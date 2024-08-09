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
  const today = dayjs().format('YY.MM.DD')
  const [dateRange, setDateRange] = useState([fromDate, toDate])
  const [activeButton, setActiveButton] = useState('')

  // 당월
  const currentMonth = () => {
    const startOfMonth = dayjs().startOf('month').format('YY.MM.DD')
    setFromDate(startOfMonth)
    setToDate(today)
    setDateRange([dayjs(startOfMonth, 'YY.MM.DD'), dayjs(today, 'YY.MM.DD')])
    setActiveButton('currentMonth')
  }

  // 1주일
  const currentWeekMonth = () => {
    const weekAgo = dayjs().subtract(1, 'week').format('YY.MM.DD')
    setFromDate(weekAgo)
    setToDate(today)
    setDateRange([dayjs(weekAgo, 'YY.MM.DD'), dayjs(today, 'YY.MM.DD')])
    setActiveButton('currentWeekMonth')
  }

  // 1개월
  const currentOneMonth = () => {
    const oneMonthAgo = dayjs().subtract(1, 'month').format('YY.MM.DD')
    setFromDate(oneMonthAgo)
    setToDate(today)
    setDateRange([dayjs(oneMonthAgo, 'YY.MM.DD'), dayjs(today, 'YY.MM.DD')])
    setActiveButton('currentOneMonth')
  }

  // 2개월
  const currentTwoMonth = () => {
    const twoMonthsAgo = dayjs().subtract(2, 'month').format('YY.MM.DD')
    setFromDate(twoMonthsAgo)
    setToDate(today)
    setDateRange([dayjs(twoMonthsAgo, 'YY.MM.DD'), dayjs(today, 'YY.MM.DD')])
    setActiveButton('currentTwoMonth')
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
      const fromDate = dates[0].format('YY.MM.DD')
      const toDate = dates[1].format('YY.MM.DD')
      console.log('fromDate', dates[0].format('YY.MM.DD'))
      console.log('toDate', dates[1].format('YY.MM.DD'))
      setFromDate(fromDate)
      setToDate(toDate)
      setDateRange(dates)
    } else {
      setFromDate(null)
      setToDate(null)
      setDateRange([null, null])
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
              <DateBtn
                type="button"
                onClick={currentMonth}
                active={activeButton === 'currentMonth' ? 'true' : undefined}
              >
                <p className="btnTxt">당월</p>
              </DateBtn>
              <DateBtn
                type="button"
                onClick={currentWeekMonth}
                active={
                  activeButton === 'currentWeekMonth' ? 'true' : undefined
                }
              >
                <p className="btnTxt">1주일</p>
              </DateBtn>
              <DateBtn
                type="button"
                onClick={currentOneMonth}
                active={activeButton === 'currentOneMonth' ? 'true' : undefined}
              >
                <p className="btnTxt">1개월</p>
              </DateBtn>
              <DateBtn
                type="button"
                onClick={currentTwoMonth}
                active={activeButton === 'currentTwoMonth' ? 'true' : undefined}
              >
                <p className="btnTxt">2개월</p>
              </DateBtn>
            </FilterWrap>
          </Col>
        </>
      ) : (
        <Col span={24}>
          <RangePicker
            style={{
              width: '100%',
            }}
            onChange={handleDateChange}
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
const DateBtn = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #00000099;
  background-color: ${({ active }) =>
    active ? `#E0E0E0 ` : '#fff'}; /* 활성화 상태에 따라 배경색 변경 */

  .btnTxt {
    font-size: 15px;
    color: #00000099;
  }
`
