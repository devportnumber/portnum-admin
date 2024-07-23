import React, { useState, useEffect } from 'react'
import { useAxios } from '../../../hooks/useAxios'

// 팝업관리 서비스 로직
export const usePopupMngService = () => {
  const { fetchData, loading, data: storeListData, error } = useAxios()
  const [reqPopupData, setReqPopupData] = useState({})

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
    fetchData('/list', 'GET', null, null)
    console.log('storeListData', storeListData)
  }, [])

  return {
    storeListData,
    onFinish,
    reqPopupData,
  }
}
