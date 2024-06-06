import React from "react";
import Navbar from "../View/Navbar/Navbar";
import Footer from "../Footer/Footer";

interface LayoutProps{
  children: React.ReactNode
}

export default function LandingPage({children} : LayoutProps){
  return(
    <React.Fragment>
      <Navbar/>
      {children}
      <Footer/>
    </React.Fragment>
  )
}