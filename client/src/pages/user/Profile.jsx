import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'

function Profile() {
    const {auth} = useAuth()
  return (
       <Layout>
    <div className="container-fluid g-0">
        <div className="row">
            
            <div className="col-md-2">
                <UserMenu/>
            </div>
            <div className="col-md-10">
            <div className="container ">
                <div className="row ">
                    <h1> Name : {auth?.user?.name}</h1>
                    <h1> Email : {auth?.user?.email}</h1>
                    <h1> Phone : {auth?.user?.phone}</h1>

                </div>
            </div>
            </div>

        </div>
    </div>
    </Layout>
  )
}

export default Profile