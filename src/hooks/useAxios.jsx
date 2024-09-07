import { useState } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

export const useAxios = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async (url, method, requestBody, params) => {
    // 임시 작업 토큰
    try {
      const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoiUk9MRV9VU0VSIiwic3ViIjoidGVzdFdlYmluQG5hdmVyLmNvbSIsImV4cCI6MTcyNTY5NzA2OCwiaWF0IjoxNzI1Njk1MjY4fQ.50zoG6eEQHTIDBiAaxwbkyF7-UUI-TZF5Nan2EYy8Pc'
      setLoading(true)
      const response = await axios({
        method: method,
        url: 'https://portnumber.site/admin' + url,
        // url: 'http://localhost:8080/admin' + url,
        data: requestBody,
        params: params,
        headers: {
          'Content-Type': 'application/json', // JSON으로 전달
          Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
        },
      })

      setData(response?.data)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  return { data, loading, error, fetchData }
}
