import React, { useState, useEffect } from 'react'
import { useAxios } from '../../../hooks/useAxios'
import dayjs from 'dayjs'
// 팝업관리 서비스 로직
export const usePopupMngService = () => {
  // 팝업
  const {
    fetchData: storeGetApi,
    _,
    data: storeListData,
    error: error1,
  } = useAxios()

  // 팝업 등록
  const {
    fetchData: storeSaveApi,
    loading2,
    data: storeFilterData,
    error: error2,
  } = useAxios()

  // 팝업 조회
  const {
    fetchData: storeFilterPostApi,
    loading3,
    data: storeFilterPostData,
    error: error3,
  } = useAxios()

  // 팝업 삭제
  const {
    fetchData: storeDelApi,
    loading4,
    data: storeDelData,
    error: error4,
  } = useAxios()
  const [storeListState, setStoreListState] = useState()
  const [reqPopupData, setReqPopupData] = useState({})

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)

  const [reqFilter, setReqFilter] = useState({
    name: null, // 팝업명
    category: null, // 카테고리
    startDate: null, // 시작 날짜
    endDate: null, // 종료 날짜
    stat: null,
  })
  const [requestFilter, setRequestFilter] = useState(reqFilter)
  const [checkItem, setCheckItem] = useState([])

  // filter 1. 카테고리 드롭다운
  const handleCategoryChange = (value) => {
    console.log('카테고리 value', value)
    if (value === 'all') {
      setReqFilter({ ...reqFilter, category: null })
    } else {
      setReqFilter({ ...reqFilter, category: value })
    }
  }
  // filter 2. 팝업 상태 : 노출 or 비노출
  const handleStateChange = (value) => {
    console.log('상태 value', value)
    if (value === 'all') {
      setReqFilter({ ...reqFilter, stat: null })
    } else {
      setReqFilter({ ...reqFilter, stat: value })
    }
  }

  // filter 3. 팝업명 : 입력 값
  const handleNameChange = (value) => {
    setReqFilter({ ...reqFilter, name: value })
  }

  // API: 팝업 필터 조회
  const handleFilterClick = () => {
    // setReqFilter((prevState) => ({
    //   ...prevState,
    //   startDate: startDate ? startDate : null,
    //   endDate: endDate ? endDate : null,
    // }))
    const updateReq = {
      name: reqFilter.name, // 팝업명
      category: reqFilter.category, // 카테고리
      startDate: startDate, // 시작 날짜
      endDate: endDate, // 종료 날짜
      stat: reqFilter.stat,
    }
    setRequestFilter(updateReq)
    // storePostApi('/list/filter', 'POST', reqFilter, null)
    // console.log('service-startDate', startDate)
    // console.log('service-endDate', endDate)
    // console.log('reqFilter', reqFilter)
  }

  // API: 팝업 삭제
  const handleDeleteClick = () => {
    storeDelApi('/del', 'POST', checkItem, null)
    console.log('checkItem', checkItem)
  }

  // API 모달창 팝업등록 제출
  const onFinish = (values) => {
    console.log('Received values:', values)
    // fetchData('/update', 'POST', reqPopupData, null)
  }

  // API 펄터 조회
  useEffect(() => {
    storeFilterPostApi('/list/filter', 'POST', requestFilter, null)
  }, [requestFilter])

  useEffect(() => {
    if (storeFilterPostData) {
      setStoreListState(storeFilterPostData)
      console.log('>>>storeFilterPostData', storeFilterPostData)
    }
  }, [storeFilterPostData])
  useEffect(() => {
    if (storeDelData === 'success') {
      storeFilterPostApi('/list/filter', 'POST', requestFilter, null)
      setCurrentPage(1)
    }
  }, [storeDelData])

  return {
    storeListState,
    onFinish,
    reqPopupData,
    handleFilterClick,
    handleCategoryChange,
    handleStateChange,
    handleNameChange,
    handleDeleteClick,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setCheckItem,
    currentPage,
    setCurrentPage,
  }
}
