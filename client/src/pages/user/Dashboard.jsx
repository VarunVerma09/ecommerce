import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'


function Dashboard() {
  return (
       <Layout>
    <div className="container-fluid g-0">
        <div className="row">
            
            <div className="col-md-2">
                <UserMenu/>
            </div>
            <div className="col-md-10">slkjhhkl</div>

        </div>
    </div>
    </Layout>
  )
}

export default Dashboard