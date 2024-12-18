import React, { useState, useEffect } from 'react'
import { useAxios } from '../../../hooks/useAxios'
import { createGlobalStyle } from 'styled-components'

import dayjs from 'dayjs'
import 'dayjs/locale/ko' // 한국어 설정
import locale from 'antd/lib/locale/ko_KR'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.locale('ko')

// 팝업관리 서비스 로직
export const usePopupMngService = () => {
  // 팝업 조회
  const {
    fetchData: storeFilterGetApi,
    loading3,
    data: storeFilterGetData,
    error: error3,
  } = useAxios()

  // 팝업 삭제
  const {
    fetchData: storeDelApi,
    loading4,
    data: storeDelData,
    error: error4,
  } = useAxios()

  const adminId = localStorage.getItem('adminId') || null
  const nickName = localStorage.getItem('nickName') || null
  const [storeListState, setStoreListState] = useState()
  const [reqPopupData, setReqPopupData] = useState({})

  // dayjs() 오늘날짜 기준
  const [startDate, setStartDate] = useState(dayjs())
  const [endDate, setEndDate] = useState(dayjs())

  const [currentPage, setCurrentPage] = useState(1)
  const [allcount, setAllcount] = useState()

  const [reqFilter, setReqFilter] = useState({
    name: null, // 팝업명
    category: null, // 카테고리
    startDate: null, // 시작 날짜
    endDate: null, // 종료 날짜
    stat: null,
    page: currentPage,
  })
  const [requestFilter, setRequestFilter] = useState(reqFilter)
  const [checkItem, setCheckItem] = useState([])

  // filter 1. 카테고리 드롭다운
  const handleCategoryChange = (value) => {
    // console.log('카테고리 value', value)
    if (value === 'all') {
      setReqFilter({ ...reqFilter, category: null })
    } else {
      setReqFilter({ ...reqFilter, category: value })
    }
  }
  // filter 2. 팝업 상태 : 노출 or 비노출
  const handleStateChange = (value) => {
    // console.log('상태 value', value)
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

  // 필터 초기화
  const handleResetFilterClick = () => {
    setStartDate(dayjs())
    setEndDate(dayjs())
    const updateReq = {
      name: null, // 팝업명
      category: null, // 카테고리
      startDate: dayjs().format('YYYY-MM-DDT00:00:00'), // 시작 날짜
      endDate: dayjs().format('YYYY-MM-DDT00:00:00'), // 종료 날짜
      stat: null,
      page: 1,
    }
    setRequestFilter(updateReq) // 필터 값을 상태에 반영
    setReqFilter(updateReq) // reqFilter도 초기화
  }

  // API: 팝업 필터 조회
  const handleFilterClick = () => {
    const updateReq = {
      name: reqFilter.name, // 팝업명
      category: reqFilter.category, // 카테고리
      startDate: dayjs(startDate).format('YYYY-MM-DDT00:00:00'), // 시작 날짜
      endDate: dayjs(endDate).format('YYYY-MM-DDT00:00:00'), // 종료 날짜
      stat: reqFilter.stat,
      page: 1,
    }
    setRequestFilter(updateReq)
    console.log('###팝업필터조회 요청값###', updateReq)
  }

  // API: 팝업 삭제
  const handleDeleteClick = () => {
    storeDelApi(
      '/popup',
      'DELETE',
      { adminId: adminId, popupIds: checkItem },
      null,
    )
    console.log('checkItem', checkItem)
    console.log('checkItem', { adminId: adminId, popupIds: checkItem })
  }

  // API 모달창 팝업등록 제출
  const onFinish = (values) => {
    console.log('Received values:', values)
    // fetchData('/update', 'POST', reqPopupData, null)
  }

  // API 필터 조회
  useEffect(() => {
    storeFilterGetApi(`/popup/api/${nickName}`, 'GET', null, requestFilter)
  }, [requestFilter, storeDelData])

  useEffect(() => {
    if (storeFilterGetData) {
      console.log('storeFilterGetData', storeFilterGetData)
      setAllcount(storeFilterGetData?.data?.totalElements)
      setStoreListState(storeFilterGetData?.data?.data)
      // console.log('>>>storeFilterPostData', storeFilterGetData)
    }
  }, [storeFilterGetData])

  useEffect(() => {
    // 현재 페이지 번호를 필터에 추가
    const updatedRequestFilter = { ...requestFilter, page: currentPage }
    console.log('currentPage 변경으로 필터 조회:', updatedRequestFilter)

    // API 호출
    storeFilterGetApi(
      `/popup/api/${nickName}`,
      'GET',
      null,
      updatedRequestFilter,
    )
  }, [currentPage])

  // useEffect(() => {
  //   if (storeDelData === 'success') {
  //     // storeFilterGetApi('/popup/api/1', 'GET', null, requestFilter)
  //     setCurrentPage(1)
  //   }
  // }, [storeDelData])

  return {
    reqFilter,
    storeListState,
    onFinish,
    reqPopupData,
    handleResetFilterClick,
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
    allcount,
  }
}
