import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// routes
// import { userRoutes, authRoutes } from "./allRoutes";
import ServicePage from "../page/service/ServicePage";

// components
// import { MainLayout, ComponentLoading } from "../components/";

const routes = [{ path: "/", component: <ServicePage /> }];

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, idx) => (
          <Route path={route.path} element={route.component} key={idx} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
