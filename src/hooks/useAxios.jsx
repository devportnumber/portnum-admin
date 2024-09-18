import { useState, useEffect } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

export const useAxios = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [token, setToken] = useState('')

  const login = async () => {
    try {
      const response = await axios.post('https://portnumber.site/auth/login', {
        email: 'testwebin9@naver.com',
        password: '12345678',
      })
      const newToken = response.headers['authorization']
      if (newToken) {
        setToken(newToken.replace('Bearer ', ''))
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  // useEffect(() => {
  //   login()
  // }, [])

  const fetchData = async (url, method, requestBody, params) => {
    // 임시 작업 토큰
    try {
      const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoiUk9MRV9VU0VSIiwic3ViIjoiaGVsbG8yQGdtYWlsLmNvbSIsImV4cCI6MTcyNTk2Nzk4NSwiaWF0IjoxNzI1OTY2MTg1fQ.uNqL0ZLy6z-sHN7_U5S5Y47L0cSuI5Mjniwy9HE1GOA'
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

      console.log(response)

      setData(response?.data)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  return { data, loading, error, fetchData }
}
