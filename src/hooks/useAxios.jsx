import { useState, useEffect } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

export const useAxios = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const refreshToken = localStorage.getItem('refresh')

  //  API 토큰 재생성
  const reissueToken = async () => {
    console.log('2. 토큰 재요청 api')
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
      // const newToken = response.headers['authorization']
      // if (newToken) {
      //   setToken(newToken)
      //   localStorage.setItem('token', newToken)
      // }
    } catch (error) {
      console.error('Token reissue failed:', error)
    }
  }

  // api 요청 공통 로직
  const fetchData = async (url, method, requestBody, params) => {
    try {
      setLoading(true)
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
      if (response.data.code === 30020) {
        console.log('1. 토큰 재발급 요청')
        alert('토큰 재발급!')
        try {
          await reissueToken()
          //       Retry the original request with the new token
          // return fetchData(url, method, requestBody, params)
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
