const columns1 = [
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

// 더미 데이터
const data = [
  {
    key: '1',
    test1: 'PO01',
    test2: '패션',
    test3: '우디',
    test4: 'YYYY.MM.DD ~ YYYY.MM.DD',
    test5: 'YYYY.MM.DD',
    test6: '노출',
  },
  {
    key: '2',
    test1: 'PO02',
    test2: '푸드',
    test3: '제이슨',
    test4: 'YYYY.MM.DD ~ YYYY.MM.DD',
    test5: 'YYYY.MM.DD',
    test6: '비 노출',
  },
  {
    key: '3',
    test1: 'PO03',
    test2: '전시',
    test3: '레리',
    test4: 'YYYY.MM.DD ~ YYYY.MM.DD',
    test5: 'YYYY.MM.DD',
    test6: '기간종료',
  },
  {
    key: '4',
    test1: 'PO04',
    test2: '패션',
    test3: '다니엘',
    test4: 'YYYY.MM.DD ~ YYYY.MM.DD',
    test5: 'YYYY.MM.DD',
    test6: '노출',
  },
]
