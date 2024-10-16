import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export const popupColumns = [
  // {
  //   title: 'no',
  //   dataIndex: 'name',
  //   render: (text, _, i) => {
  //     return <p>{i + 1}</p>
  //   },
  // },
  {
    title: '팝업코드',
    dataIndex: 'popupId',
  },
  {
    title: '태그명',
    dataIndex: 'category',
    render: (data) => {
      return <p>{getLabelByValue(CATEGORY_ITEMS, data)}</p>
    },
  },
  {
    title: '팝업명',
    dataIndex: 'name',
  },
  {
    title: '팝업기간',
    dataIndex: 'endDate',
    render: (_, record) => {
      const endDate = record.endDate // 현재 행의 endDate를 가져옴
      const startDate = record.startDate // 현재 행의 endDate를 가져옴
      const formattedStartDate = dayjs(startDate).format('YYYY.MM.DD')
      const formattedEndDate = dayjs(endDate).format('YYYY.MM.DD')
      return <p>{`${formattedStartDate} ~ ${formattedEndDate}`}</p>
    },
  },
  {
    title: '등록일시',
    dataIndex: 'regdt',
    render: (data) => {
      return <p>{dayjs(data).format('YYYY.MM.DD')}</p>
    },
  },
  {
    title: '상태',
    dataIndex: 'stat',
    render: (data) => {
      return <p>{getLabelByValue(STATE_ITEMS, data)}</p>
    },
  },
]

export const CATEGORY_TYPE = {
  exhibition: '전시회',
  fashion: '패션',
  goods: '굿즈',
  test: '[테스트]',
}

// 카테고리 드롭다운
export const CATEGORY_ITEMS = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'EXHIBITION',
    label: '전시회',
  },
  {
    value: 'RESTAURANT',
    label: '레스토랑',
  },
  {
    value: 'BAR',
    label: '술집',
  },
  {
    value: 'GOODS',
    label: '굿즈',
  },
  {
    value: 'FASHION',
    label: '패션',
  },
  {
    value: 'CAFE',
    label: '카페',
  },
  {
    value: 'BAKERY',
    label: '베이커리',
  },
]

// 상태 드롭다운
export const STATE_ITEMS = [
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
// value를 받아 label을 반환하는 함수
function getLabelByValue(typeItem, value) {
  const item = typeItem.find((state) => state.value === value)
  return item ? item.label : '-' // 찾지 못했을 경우 value 그대로 반환
}
