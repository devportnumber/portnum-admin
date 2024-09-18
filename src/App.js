import React, { useState, useEffect } from 'react'
import Router from './routers/Router'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import SideBar from './components/sideBar/SideBar'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticated ? (
          <>
            <Header />
            <LayoutWrapper>
              <LayoutMain>
                <SideBar />
                <MainContent>
                  <Router isAuthenticated={isAuthenticated} />
                </MainContent>
              </LayoutMain>
            </LayoutWrapper>
          </>
        ) : (
          <Router isAuthenticated={isAuthenticated} />
        )}
      </BrowserRouter>
    </div>
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
