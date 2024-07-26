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
    dataIndex: 'valid',
  },
]

// 카테고리 드롭다운: : 베이커리, 카페, 패션, 굿즈, 바, 레스토랑, 전시
export const CATEGORY_ITEMS = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'goods',
    label: '굿즈',
  },
  {
    value: 'exhibition',
    label: '전시회',
  },
  {
    value: 'fashion',
    label: '패션',
  },
  {
    value: 'cafe',
    label: '카페',
  },
  {
    value: 'bakery',
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
