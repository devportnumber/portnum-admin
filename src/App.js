import Router from "./routers/Router";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/sideBar/SideBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LayoutWrapper>
          <SideBar />
          <MainContent>
            <Router />
          </MainContent>
        </LayoutWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;

const LayoutWrapper = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #f3f7fa;
`;
