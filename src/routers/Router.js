import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// routes
// import { userRoutes, authRoutes } from "./allRoutes";
import PopupMngPage from '../page/popupMng/PopupMngPage'
import LoginPage from '../page/login/LoginPage'

// components
// import { MainLayout, ComponentLoading } from "../components/";

const routes = [
  {
    path: '/',
    component: <PopupMngPage />,
  },
]

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
  // 인증되지 않은 사용자용 다른 라우트 추가
]

const useAuth = () => {
  // return localStorage.getItem('true') === 'true'
}

const Router = ({ isAuthenticated }) => {
  // const isAuthenticated = useAuth()
  return (
    <Routes>
      {/* {routes.map((route, idx) => (
        <Route path={route.path} element={route.component} key={idx} />
      ))} */}
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
