export const popupColumns = [
  {
    title: 'no',
    dataIndex: 'name',
    render: (text, _, i) => {
      return <p>{i + 1}</p>
    },
  },
  {
    title: '팝업코드',
    dataIndex: 'storeId',
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
  },
  {
    title: '등록일시',
    dataIndex: 'startDate',
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
    value: 'exhibition',
    label: '전시회',
  },
  {
    value: 'goods',
    label: '굿즈',
  },
]
