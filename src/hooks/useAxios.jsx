import { useState, useEffect } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

export const useAxios = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const refreshToken = localStorage.getItem('refresh')
  const [isReissuing, setIsReissuing] = useState(false)

  //  API 토큰 재생성
  const reissueToken = async () => {
    console.log('2. 토큰 재요청 api')
    console.log('2.token 토큰 재요청 api', token)
    console.log('2.refreshToken  토큰 재요청 api', refreshToken)
    try {
      const response = await axios.patch(
        'http://localhost:8080/auth/reissue',
        {},
        {
          headers: {
            Authorization: `${token}`,
            Refresh: refreshToken,
          },
        },
      )
      console.log('3. 토큰 재요청응답', response)
      const newToken = response.headers['authorization']
      console.log('4. 토큰 재요청 newToken', newToken)
      // 재발급된 새로운 토큰 저장
      if (newToken) {
        setToken(newToken)
        localStorage.setItem('token', newToken)
      }
      return newToken
    } catch (error) {
      console.error('Token reissue failed:', error)
    }
  }

  // api 요청 공통 로직
  const fetchData = async (
    url,
    method,
    requestBody,
    params,
    newAccessToken,
  ) => {
    try {
      setLoading(true)
      console.log('@@@@token@@@@', token)
      const response = await axios({
        method: method,
        // url: 'https://portnumber.site/admin' + url,
        url: 'http://localhost:8080/admin' + url,
        data: requestBody,
        params: params,
        headers: {
          'Content-Type': 'application/json', // JSON으로 전달
          Authorization: `${token}`, // JWT 토큰을 헤더에 추가 Bearer
        },
      })

      console.log('## 공통response', response)
      if (response.data) {
        setData(response?.data)
        setLoading(false)
      }
      if (response.data.code === 30030) {
        alert('토큰 재발급!')
        console.log('1. 토큰 재발급 요청')
        try {
          // 재발급 요청
          await reissueToken()
          // const newAccessToken = await reissueToken()
          // if (newAccessToken) {
          //   // 재발급 후 원래 요청을 새로운 토큰으로 재시도
          //   // return fetchData(url, method, requestBody, params)
          // }
        } catch (reissueError) {
          console.error('Token reissue failed', reissueError)
          setError(reissueError)
          setLoading(false)
        }
      }
    } catch (error) {
      console.log('error', error)

      setError(error)
      setLoading(false)
    }
  }

  return { data, loading, error, fetchData }
}
