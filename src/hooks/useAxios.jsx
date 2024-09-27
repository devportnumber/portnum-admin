import { useState, useCallback, useRef } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

export const useAxios = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const refreshToken = localStorage.getItem('refresh')
  const isReissuingRef = useRef(false)
  const requestQueue = useRef([])

  const reissueToken = async () => {
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
          if (response.data.code === 30030) {
            // Token needs to be refreshed
            if (!isReissuingRef.current) {
              isReissuingRef.current = true
              const newToken = await reissueToken()
              isReissuingRef.current = false

              if (newToken) {
                // Retry the request with the new token
                return fetchData(url, method, requestBody, params, newToken)
              } else {
                throw new Error('Failed to reissue token')
              }
            } else {
              // If already reissuing, add to queue
              requestQueue.current.push({ url, method, requestBody, params })
            }
          } else {
            // Normal successful response
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
