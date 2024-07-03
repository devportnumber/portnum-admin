import Router from "./routers/Router";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import SideBar from "./components/sideBar/SideBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <LayoutWrapper>
          <LayoutMain>
            <SideBar />
            <MainContent>
              <Router />
            </MainContent>
          </LayoutMain>
        </LayoutWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
const LayoutWrapper = styled.section`
  min-height: 100vh;
`;
const LayoutMain = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  min-height: 100vh;
  flex-grow: 1;
  padding: 20px;
  background-color: #f3f7fa;
`;
