import React from 'react'
import styled from 'styled-components'
import colors from '../../styles/colors'
import { DatePicker as DatePick, ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/ko' //한국어 설정
import locale from 'antd/lib/locale/ko_KR'
dayjs.locale('ko')

const DatePicker = ({ value, placeholder, onChange, dateTit, required }) => {
  // const disabledDate = (current) => {
  //   return current && current > dayjs().endOf('day')
  // }

  return (
    <DatetWrap>
      <h4 className="dateTit">
        {dateTit} {required && <span className="requiredTxt">*</span>}
      </h4>
      <ConfigProvider locale={locale}>
        <DatePick
          format="YY.MM.DD"
          value={value ? dayjs(value) : null}
          // disabledDate={disabledDate} // 미래날짜 선택 막기
          placeholder={placeholder}
          onChange={onChange}
        />
      </ConfigProvider>
    </DatetWrap>
  )
}

export default DatePicker

const DatetWrap = styled.div`
  width: 100%;
  .dateTit {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .ant-picker {
    width: 100%;
  }
`
