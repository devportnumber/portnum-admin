import React from "react";
import { Routes, Route } from "react-router-dom";

// routes
// import { userRoutes, authRoutes } from "./allRoutes";
import PopupMngPage from "../page/popupMng/PopupMngPage";

// components
// import { MainLayout, ComponentLoading } from "../components/";

const routes = [
  {
    path: "/",
    component: <PopupMngPage />,
  },
];

const Router = () => {
  return (
    <Routes>
      {routes.map((route, idx) => (
        <Route path={route.path} element={route.component} key={idx} />
      ))}
    </Routes>
  );
};

export default Router;
