// AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react'
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(!!token)
    }
  }, [])

  const login = (token, refresh, nickName) => {
    localStorage.setItem('token', token)
    localStorage.setItem('refresh', refresh)
    localStorage.setItem('nickName', nickName)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// export const useAuth = () => useContext(AuthContext)
export const useAuth = () => {
  const context = useContext(AuthContext)
  console.log('context', context)
  if (!context) {
    throw new Error('ERROR : useAuth must be used within an AuthProvider')
  }
  return context
}
