import React, { lazy, Suspense } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const Home = lazy(() => import("./pages/Home.jsx"));
const Layout = lazy(() => import("./Layout.jsx"));
const Shop = lazy(() => import("./pages/Shop.jsx"));
const Men = lazy(() => import("./pages/Men.jsx"));
const Women = lazy(() => import("./pages/Women.jsx"));
const Outerwear = lazy(() => import("./pages/Outerwear.jsx"));
const Login = lazy(() => import("./components/Login/Login.jsx"));
const Signup = lazy(() => import("./components/SignUp/SignUp.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const DashboardMain = lazy(() => import("./components/Dashboard/DashboardMain/DashboardMain.jsx"));
const DashboardOrders = lazy(() => import("./components/Dashboard/DashboardOrders/DashboardOrders.jsx"));
const DashboardAccountDetails = lazy(() => import("./components/Dashboard/DashboardAccountDetails/DashboardAccountDetails.jsx"));
const DashboardPasswordChange = lazy(() => import("./components/Dashboard/DashboardPasswordChange/DashboardPasswordChange.jsx"));
const DashboardFavorites = lazy(() => import("./components/Dashboard/DashboardFavorites/DashboardFavorites.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback={<div>Loading layout...</div>}>
          <Layout />
        </Suspense>
      }
    >
      <Route
        index
        element={
          <Suspense fallback={<div>Loading home...</div>}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="shop"
        element={
          <Suspense fallback={<div>Loading home...</div>}>
            <Shop />
          </Suspense>
        }
      />
      <Route
        path="men"
        element={
          <Suspense fallback={<div>Loading home...</div>}>
            <Men />
          </Suspense>
        }
      />
      <Route
        path="women"
        element={
          <Suspense fallback={<div>Loading home...</div>}>
            <Women />
          </Suspense>
        }
      />
      <Route
        path="outerwear"
        element={
          <Suspense fallback={<div>Loading home...</div>}>
            <Outerwear />
          </Suspense>
        }
      />
      <Route
        path="login"
        element={
          <Suspense fallback={<div>Loading home...</div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="signup"
        element={
          <Suspense fallback={<div>Loading home...</div>}>
            <Signup />
          </Suspense>
        }
      />
      <Route
        path="cart"
        element={
          <Suspense fallback={<div>Loading home...</div>}>
            <Cart />
          </Suspense>
        }
      />
      <Route
        path="product/:id"
        element={
          <Suspense fallback={<div>Loading home...</div>}>
            <Product />
          </Suspense>
        }
      />
      <Route
        path="order/:id"
        element={
          <Suspense fallback={<div>Loading home...</div>}>
            <CheckoutPage />
          </Suspense>
        }
      />
      <Route
        path="dashboard"
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
          path="favorites"
          element={
            <Suspense fallback={<div>Loading home...</div>}>
              <DashboardFavorites />
            </Suspense>
          }
        />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
