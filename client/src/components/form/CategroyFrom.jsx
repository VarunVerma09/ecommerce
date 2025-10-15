import React, { useState } from 'react'

function CategroyFrom({handleSubmit,value,setValue}) {
  return (
    <div className='fixed'>
       <form onSubmit={handleSubmit}> 
  <div className="mb-3">
    <input type="text" className="form-control" placeholder='Enter New Category' value={value} onChange={(e)=>{setValue(e.target.value)}} />
  </div>
 
  <button type="submit" className="btn btn-dark">Add Category</button>
</form>

    </div>
  )
}

export default CategroyFrom