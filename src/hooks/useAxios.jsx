import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

axios.defaults.withCredentials = true

export const useAxios = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const refreshToken = localStorage.getItem('refresh')
  const isReissuingRef = useRef(false)
  const requestQueue = useRef([])

  const reissueToken = async () => {
    try {
      const response = await axios.patch(
        'https://portnumber.site/auth/reissue',
        {},
        {
          headers: {
            Authorization: `${token}`,
            Refresh: refreshToken,
          },
        },
      )
      const newToken = response.headers['authorization']
      if (newToken) {
        setToken(newToken)
        localStorage.setItem('token', newToken)
      }
      return newToken
    } catch (error) {
      console.error('Token reissue failed:', error)
      return null
    }
  }

  const processQueue = async (newToken) => {
    const queue = requestQueue.current
    requestQueue.current = []
    for (const request of queue) {
      await fetchData(
        request.url,
        request.method,
        request.requestBody,
        request.params,
        newToken,
      )
    }
  }

  const fetchData = useCallback(
    async (url, method, requestBody, params, newAccessToken = token) => {
      try {
        setLoading(true)
        const response = await axios({
          method: method,
          url: 'http://localhost:8080/admin' + url,
          data: requestBody,
          params: params,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${newAccessToken}`,
          },
        })

        if (response.data) {
          // 리프레시 토큰 만료
          if (response.data.code === 30033) {
            alert('다시 로그인 해주세요.')
            localStorage.clear()
            window.location.replace('/login')
          }
          // 액세스 토큰 만료
          if (response.data.code === 30030) {
            if (!isReissuingRef.current) {
              isReissuingRef.current = true
              const newToken = await reissueToken()
              isReissuingRef.current = false

              if (newToken) {
                return fetchData(url, method, requestBody, params, newToken)
              } else {
                alert('다시 로그인 해주세요.')
                localStorage.clear()
                window.location.replace('/login')
                throw new Error('Failed to reissue token')
              }
            } else {
              requestQueue.current.push({ url, method, requestBody, params })
            }
          } else {
            // 성공시 응답 데이터 저장
            setData(response.data)
          }
        }
        setLoading(false)
      } catch (error) {
        console.log('error', error)
        setError(error)
        setLoading(false)
      }
    },
    [token],
  )

  return { data, loading, error, fetchData }
}
