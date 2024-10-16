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

  const setDates = (start, end, buttonName) => {
    setFromDate(start)
    setToDate(end)
    setActiveButton(buttonName)
    if (onChange) {
      onChange(start, end)
    }
  }

  // 당월
  const currentMonth = () => {
    const startOfMonth = dayjs().startOf('month')
    setDates(startOfMonth, today, 'currentMonth')
  }

  // 1주일
  const currentWeekMonth = () => {
    const weekAgo = dayjs().subtract(1, 'week')
    setDates(weekAgo, today, 'currentWeekMonth')
  }

  // 1개월
  const currentOneMonth = () => {
    const oneMonthAgo = dayjs().subtract(1, 'month')
    setDates(oneMonthAgo, today, 'currentOneMonth')
  }

  // 2개월
  const currentTwoMonth = () => {
    const twoMonthsAgo = dayjs().subtract(2, 'month')
    setDates(twoMonthsAgo, today, 'currentTwoMonth')
  }

  // 날짜 값이 수동으로 변경되면 activeButton을 초기화
  useEffect(() => {
    const today = dayjs()
    if (fromDate && toDate) {
      if (
        fromDate.isSame(today.startOf('month'), 'day') &&
        toDate.isSame(today, 'day')
      ) {
        setActiveButton('currentMonth')
      } else if (
        fromDate.isSame(today.subtract(1, 'week'), 'day') &&
        toDate.isSame(today, 'day')
      ) {
        setActiveButton('currentWeekMonth')
      } else if (
        fromDate.isSame(today.subtract(1, 'month'), 'day') &&
        toDate.isSame(today, 'day')
      ) {
        setActiveButton('currentOneMonth')
      } else if (
        fromDate.isSame(today.subtract(2, 'month'), 'day') &&
        toDate.isSame(today, 'day')
      ) {
        setActiveButton('currentTwoMonth')
      } else {
        setActiveButton('')
      }
    }
  }, [fromDate, toDate])

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
  background-color: ${({ active }) => (active ? `#E0E0E0 ` : '#fff')};

  .btnTxt {
    font-size: 15px;
    color: #00000099;
  }
`
