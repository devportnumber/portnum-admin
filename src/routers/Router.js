import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// routes
import { userRoutes, authRoutes } from "./allRoutes";
import ProtectedRoute from "./ProtectedRoute";

// components
import { MainLayout, ComponentLoading } from "../components";

const routes = [
  // { path: '/dashboard', component: <LazyDashBoardPage /> },
];

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<ComponentLoading />}>
        <Routes>
          {routes.map((route, idx) => (
            <Route path={route.path} element={route.component} key={idx} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
