import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from "react-router-dom"
import Home from "./home/Home"
import Product from './product/Product'
import ProductDetail from './components/produnctdetail'
import Admindashboard from './admindashboard/admindashboard'

function App() {

  return (
    <>
   <Routes>
    <Route  path="/"  element={<Home/>} />
       <Route  path="/product"  element={<Product/>} />
       <Route path="/product/:id" element={<ProductDetail />} />
       <Route  path="/admindashboard"  element={<Admindashboard/>} />
   </Routes>


    </>
  )
}

export default App
