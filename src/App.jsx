import { useState } from 'react'
import './App.css'

import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './page/Login'
import Home from './page/Home'
import UserLayout from './components/UserLayout '
import AdminLayout from './components/AdminLayout'
import Dashboard from './components/admin/Dashboard'
import AdminProtectedRoute from './components/admin/AdminProtectedRoute'
import Products from './components/admin/products/Products'
import ProductForm from './components/admin/products/ProductForm'
import Categories from './components/admin/categories/Categories'
import CategoryForm from './components/admin/categories/CategoryForm'
import Shop from './page/Shop'
import Profile from './page/Profile'
import Cart from './page/Cart'
import ProductDetails from './page/ProductDetails'
import Coupons from './components/admin/coupons/Coupons'
import CouponForm from './components/admin/coupons/CouponForm'
import Settings from './components/admin/Settings'
import OrderList from './components/admin/OrderList'
import OrderSuccess from './page/OrderSuccess'

function App() {


  return (
    <>


      <Routes>

        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order-success" element={<OrderSuccess />} />

        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="product-form" element={<ProductForm />} />
            <Route path="categories" element={<Categories />} />
            <Route path="category-form" element={<CategoryForm />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="coupon-form" element={<CouponForm />} />
            <Route path="settings" element={<Settings />} />
            <Route path="orders" element={<OrderList />} />


          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </>
  )
}

export default App
