import React, { useState, useEffect } from 'react'
import { useAxios } from '../../../hooks/useAxios'
import dayjs from 'dayjs'
// 팝업관리 서비스 로직
export const usePopupMngService = () => {
  // 팔ㅂ
  const {
    fetchData: storeGetApi,
    _,
    data: storeListData,
    error: error1,
  } = useAxios()

  // 팝업 등록
  const {
    fetchData: storePostApi,
    loading,
    data: storeFilterData,
    error: error2,
  } = useAxios()

  const [reqPopupData, setReqPopupData] = useState({})

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const [reqFilter, setReqFilter] = useState({
    name: '', // 팝업명
    category: '', // 카테고리
    startDate: startDate, // 시작 날짜
    endDate: endDate, // 종료 날짜
    stat: '',
  })
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
    // storePostApi('/list/filter', 'POST', reqFilter, null)
    console.log('reqFilter', reqFilter)
  }

  // API: 팝업 삭제
  const handleDeleteClick = () => {
    storePostApi('/del', 'POST', checkItem, null)
    console.log('checkItem', checkItem)
  }

  // 모달창 팝업등록 제출
  const onFinish = (values) => {
    console.log('Received values:', values)

    const test = {
      name: 'test',
      category: 'test',
      startDate: 'test',
      endDate: 'test',
      stat: 'test',
      neighborhood: 'test',
      longitude: 'test',
      latitude: 'test',
      address: 'test',
      addressDetail: 'test',
      description: 'test',
      mapUrl: 'test',
      startTime: 'test',
      endTime: 'test',
      valid: 't',
    }
    // fetchData('/update', 'POST', reqPopupData, null)
  }
  useEffect(() => {
    storeGetApi('/list', 'GET', null, null)
    console.log('storeListData', storeListData)
  }, [])

  return {
    storeListData,
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
  }
}
