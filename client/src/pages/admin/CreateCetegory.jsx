import React from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'

function CreateCetegory() {
  return (
     <Layout>
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-md-2 min-vh-100">
            <AdminMenu />
          </div>
          <div className="col-md-10 p-2 "></div>
          category
        </div>
      </div>
    </Layout>
  )
}

export default CreateCetegory