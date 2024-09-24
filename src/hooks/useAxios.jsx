import { useState, useEffect } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

export const useAxios = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const reissueToken = async () => {
    console.log('토큰 재요청')
    try {
      const response = await axios.patch(
        'https://portnumber.site/auth/reissue',
        {},
        {
          headers: {
            Authorization: `${token}`, // Send the refresh token if needed
          },
        },
      )
      const newToken = response.headers['authorization']
      if (newToken) {
        setToken(newToken)
        localStorage.setItem('token', newToken)
      }
    } catch (error) {
      console.error('Token reissue failed:', error)
    }
  }

  // useEffect(() => {
  //   login()
  // }, [])

  const fetchData = async (
    url,
    method,
    requestBody,
    params,
    newToken,
    retryCount = 0,
  ) => {
    // 임시 작업 토큰
    // const token = localStorage.getItem('token')
    // const refresh = localStorage.getItem('refesh')
    try {
      console.log('++', token)
      setLoading(true)
      const response = await axios({
        method: method,
        url: 'https://portnumber.site/admin' + url,
        // url: 'http://localhost:8080/admin' + url,
        data: requestBody,
        params: params,
        headers: {
          'Content-Type': 'application/json', // JSON으로 전달
          Authorization: `${token}`, // JWT 토큰을 헤더에 추가 Bearer
        },
      })

      console.log(response)
      if (response.data) {
        setData(response?.data)
        setLoading(false)
      } else if (response.data.code === 30020 && retryCount < 3) {
        console.log('Attempting to reissue token and retry request')
        try {
          const newToken = await reissueToken()
          // Retry the original request with the new token
          return fetchData(
            url,
            method,
            requestBody,
            params,
            newToken,
            retryCount + 1,
          )
        } catch (reissueError) {
          console.error(
            'Token reissue failed, cannot retry request',
            reissueError,
          )
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
