import React from "react";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import { Pages } from "../Types";
import Dashboard from "../Pages/User/Dashboard";
import Viewproduct from "../Pages/ViewProduct";
import NotFoundPage from "../Pages/404";
import AddProduct from "../Pages/User/AddProduct";

export const Routes: Pages[] = [
  {
    component: <Home />,
    path: "/",
    isAuthenticated: false,
  },
  {
    component: <Login />,
    path: "/login",
    isAuthenticated: false,
  },
  {
    component: <Register />,
    path: "/register",
    isAuthenticated: false,
  },
  {
    component: <Dashboard />,
    path: "/profile/:id",
    isAuthenticated: true,
  },
  {
    component: <Viewproduct />,
    path: "/product/:id",
    isAuthenticated: false,
  },
  {
    component: <AddProduct />,
    path: "/edit/:id",
    isAuthenticated: true,
  },
  {
    component: <AddProduct />,
    path: "/add",
    isAuthenticated: true,
  },
  {
    component: <NotFoundPage />,
    path: "*",
    isAuthenticated: false,
  },
];
