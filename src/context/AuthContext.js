// AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react'
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // 로딩 상태 추가

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(!!token)
    }
    setIsLoading(false)
  }, [])

  const login = (token, refresh, nickName, adminId) => {
    localStorage.setItem('token', token)
    localStorage.setItem('refresh', refresh)
    localStorage.setItem('nickName', nickName)
    localStorage.setItem('adminId', adminId)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.clear()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

// export const useAuth = () => useContext(AuthContext)
export const useAuth = () => {
  const context = useContext(AuthContext)
  // console.log('context', context)
  if (!context) {
    throw new Error('ERROR : useAuth must be used within an AuthProvider')
  }
  return context
}
