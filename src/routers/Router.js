import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

// routes
// import { userRoutes, authRoutes } from "./allRoutes";
import PopupMngPage from '../page/popupMng/PopupMngPage'
import LoginPage from '../page/login/LoginPage'
import SignupPage from '../page/signup/SignupPage'
import { useAuth } from '../context/AuthContext'

// 인증된 사용자용 라우트 정의
const authenticatedRoutes = [
  {
    path: '/',
    component: <PopupMngPage />,
  },
  // 인증된 사용자용 다른 라우트 추가
]

// 인증되지 않은 사용자용 라우트 정의
const unauthenticatedRoutes = [
  {
    path: '/login',
    component: <LoginPage />,
  },
  {
    path: '/signup',
    component: <SignupPage />,
  },
]

const Router = () => {
  // const isAuthenticated = localStorage.getItem('token')
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // useEffect(() => {
  //   // 토큰이 없으면 로그인 페이지로 이동
  //   if (!isAuthenticated) {
  //     navigate('/login')
  //   }
  // }, [isAuthenticated])
  return (
    <Routes>
      {isAuthenticated
        ? authenticatedRoutes.map((route, idx) => (
            <Route path={route.path} element={route.component} key={idx} />
          ))
        : unauthenticatedRoutes.map((route, idx) => (
            <Route path={route.path} element={route.component} key={idx} />
          ))}
      {/* 인증되지 않은 사용자가 인증된 라우트에 접근 시 로그인 페이지로 리다이렉트 */}
      {!isAuthenticated && (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  )
}

export default Router
