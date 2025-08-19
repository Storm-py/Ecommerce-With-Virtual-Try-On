import React, {Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import store from "./store/store.js";
// import DashboardMain from "./components/Dashboard/DashboardMain/DashboardMain.jsx";
// import DashboardOrders from "./components/Dashboard/DashboardOrders/DashboardOrders.jsx";
// import DashboardAccountDetails from "./components/Dashboard/DashboardAccountDetails/DashboardAccountDetails.jsx";
// import DashboardPasswordChange from "./components/Dashboard/DashboardPasswordChange/DashboardPasswordChange.jsx";

// const Home = lazy(() => import("./pages/Home.jsx"));


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        }
      />

      <Route
        path="register"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Signup />
          </Suspense>
        }
      />

      <Route
        path="login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
