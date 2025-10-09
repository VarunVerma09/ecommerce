import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'

function Home() {
const { auth, setAuth } = useAuth();
  return (
   <Layout>
    home
        {JSON.stringify(auth,null,4)}
    </Layout>
  )
}

export default Home