import React from 'react'
import Navbar from '../components/navbar'
import BrandIntro from '../components/brandintro'
// import {  useSelector } from 'react-redux'

function Home (){
  console.log(JSON.stringify(import.meta.env))
  return (
    <>
         <Navbar/>
     <BrandIntro/>
    </>
  )
}

export default Home