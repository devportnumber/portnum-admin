import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
const DateButtons = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  title,
  isRangeBtn,
  onChange,
}) => {
  const today = dayjs()
  const [activeButton, setActiveButton] = useState('')
  // 당월
  const currentMonth = () => {
    // const startOfMonth = dayjs().startOf('month').format('YY.MM.DD')
    const startOfMonth = dayjs().startOf('month')
    setFromDate(startOfMonth)
    setToDate(today)
    // setDateRange([dayjs(startOfMonth, 'YY.MM.DD'), dayjs(today, 'YY.MM.DD')])
    setActiveButton('currentMonth')
  }

  // 1주일
  const currentWeekMonth = () => {
    const weekAgo = dayjs().subtract(1, 'week')
    setFromDate(weekAgo)
    setToDate(today)
    // setDateRange([dayjs(weekAgo, 'YY.MM.DD'), dayjs(today, 'YY.MM.DD')])
    setActiveButton('currentWeekMonth')
  }

  // 1개월
  const currentOneMonth = () => {
    const oneMonthAgo = dayjs().subtract(1, 'month')
    setFromDate(oneMonthAgo)
    setToDate(today)
    // setDateRange([dayjs(oneMonthAgo, 'YY.MM.DD'), dayjs(today, 'YY.MM.DD')])
    setActiveButton('currentOneMonth')
  }

  // 2개월
  const currentTwoMonth = () => {
    const twoMonthsAgo = dayjs().subtract(2, 'month')
    setFromDate(twoMonthsAgo)
    setToDate(today)
    // setDateRange([dayjs(twoMonthsAgo, 'YY.MM.DD'), dayjs(today, 'YY.MM.DD')])
    setActiveButton('currentTwoMonth')
  }

  return (
    <Wrap>
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
        active={activeButton === 'currentWeekMonth' ? 'true' : undefined}
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
    </Wrap>
  )
}

export default DateButtons

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  /* width: 100%; */
`

const FilterTit = styled.h4`
  font-size: 14px;
  color: #000;
  width: 100px;
`

const FilterBox = styled.div`
  /* width: fit-content; */
  /* width: 300px; */
  width: 100%;
  height: 40px;
  display: flex;
  gap: 8px;
  /* background: transparent; */
  background: #fff;
  /* border: 1px solid #79747e; */
  /* border-radius: 20px; */
  overflow: hidden;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    text-align: center;
    font-size: 14px;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    color: #00000099;
    /* border-right: 1px solid #79747e; */
  }

  .item:last-child {
    /* border-right: none; */
  }

  .item.active {
    background-color: #e0e0e0;
    color: #000;
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
