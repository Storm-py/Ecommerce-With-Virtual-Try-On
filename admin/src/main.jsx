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
import DashboardMain from "./components/Dashboard/DashboardMain/DashboardMain.jsx";
import DashboardOrders from "./components/Dashboard/DashboardOrders/DashboardOrders.jsx";
import DashboardAccountDetails from "./components/Dashboard/DashboardAccountDetails/DashboardAccountDetails.jsx";
import DashboardPasswordChange from "./components/Dashboard/DashboardPasswordChange/DashboardPasswordChange.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import ProductList from "./pages/ProductList.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>

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
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading home...</div>}>
            <Dashboard />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<div>Loading home...</div>}>
              <DashboardMain />
            </Suspense>
          }
        />
        <Route
          path="orders"
          element={
            <Suspense fallback={<div>Loading home...</div>}>
              <DashboardOrders />
            </Suspense>
          }
        />
        <Route
          path="account-details"
          element={
            <Suspense fallback={<div>Loading home...</div>}>
              <DashboardAccountDetails />
            </Suspense>
          }
        />
        <Route
          path="change-password"
          element={
            <Suspense fallback={<div>Loading home...</div>}>
              <DashboardPasswordChange />
            </Suspense>
          }
        />
        <Route
          path="add-product"
          element={
            <Suspense fallback={<div>Loading home...</div>}>
              <AddProduct />
            </Suspense>
          }
        />
        <Route
          path="update-product"
          element={
            <Suspense fallback={<div>Loading home...</div>}>
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path="update-product/:id"
          element={
            <Suspense fallback={<div>Loading home...</div>}>
              <UpdateProduct />
            </Suspense>
          }
        />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
