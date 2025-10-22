import React from 'react'
import useCategory from '../hook/useCategory'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router'

function AllCategory() {
    
    const categories = useCategory()
  return (
   <Layout>
    <div>
        <div class="row p-5">
            {categories?.map((c)=>(
 <div class="col-sm-3 g-3 " key={c._id}>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title text-uppercase mb-3">{c.name}</h5>
        
        <Link to={`/category/${c.slug}`} class="btn btn-primary">Check Products</Link>
      </div>
    </div>
  </div>
            ))}
 
 
</div>
    </div>
   </Layout>
  )
}

export default AllCategory