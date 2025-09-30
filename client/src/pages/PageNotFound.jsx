import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router'

function PageNotFound() {
  return (
   <Layout>
      <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="text-muted mb-4">
          Oops! The page you are looking for doesn’t exist.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    </Layout>
  )
}

export default PageNotFound