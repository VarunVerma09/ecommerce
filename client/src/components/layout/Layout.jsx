import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'

const Layout = ({children}) => {
  return (
   <div>
     <Helmet>
                <meta charSet="utf-8" />
                <title>E-Commerce App</title>
               
            </Helmet>
   <Header/>
   <main style={{minHeight:"37vw"}}>
   {children}
   </main>
   <Footer/>
   
   </div>
  )
}

export default Layout