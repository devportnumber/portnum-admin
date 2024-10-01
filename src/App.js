import React, { useState, useEffect } from 'react'
import Router from './routers/Router'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import SideBar from './components/sideBar/SideBar'
import { useAuth, AuthProvider } from './context/AuthContext'

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  // const token = localStorage.getItem('token')

  // useEffect(() => {
  //   if (token) {
  //     setIsAuthenticated(true)
  //   } else {
  //     setIsAuthenticated(false)
  //   }
  // }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AuthenticatedApp />
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

function AuthenticatedApp() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      {isAuthenticated ? (
        <>
          <Header />
          <LayoutWrapper>
            <LayoutMain>
              <SideBar />
              <MainContent>
                <Router />
              </MainContent>
            </LayoutMain>
          </LayoutWrapper>
        </>
      ) : (
        <>
          <Header isAuth={true} />
          <Wrap>
            <Router />
          </Wrap>
        </>
      )}
    </>
  )
}

export default App
const LayoutWrapper = styled.section`
  min-height: 100vh;
`
const LayoutMain = styled.div`
  display: flex;
`

const MainContent = styled.div`
  min-height: 100vh;
  flex-grow: 1;
  padding: 38px 52px 20px;
  background-color: #f3f7fa;
`
const Wrap = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
