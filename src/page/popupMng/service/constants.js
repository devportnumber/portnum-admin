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
