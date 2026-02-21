import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import Header from './components/Header'
import { Routes, Route, Navigate } from 'react-router'
import Products from './components/Products'
import About from './components/About'
import Contact from './components/Contact'
import ProductDetails from './components/products/ProductDetails'
import Cart from './components/Cart'
import { Toaster } from 'react-hot-toast'
import CategoryDetail from './components/categories/CategoryDetail'
import ProductsLayout from './components/products/ProductsLayout'
import Login from './components/users/Login'
import SignUp from './components/users/SignUp'
import Profile from './components/users/Profile'
import { auth } from "./firebase/firebase"
import Footer from './components/Footer'
import Blogs from './components/Blogs'
import BlogDetail from './components/blogs/BlogDetail'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/common/ScrollToTop'
import Checkout from './components/Checkout'
import OrderSuccess from './components/OrderSuccess'
import { useAuth } from "./components/context/AuthContext"; // or however you're handling auth
import MyOrders from './components/users/MyOrders'

function App() {

  const { user } = useAuth();

  return (
    <>
      <Toaster position="top-right" />
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productID" element={<ProductDetails />} />
        <Route path="/products" element={<ProductsLayout />}>
          <Route index element={<Products />} />
          <Route
            path="category/:categoryName"
            element={<CategoryDetail />}
          />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />

        <Route path="blogs/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
