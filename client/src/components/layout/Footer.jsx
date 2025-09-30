import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <div className='bg-dark text-center text-white p-2'>
      <h2>All Rights Reserved @Copy Varun </h2>
      <p className='bg-dark text-center mt-3 '>
        <Link className='Link' to="/about">About</Link>|
        <Link className='Link' to="/contact">Contact</Link>|
        <Link className='Link' to="/policy">Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footer