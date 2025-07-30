import React from 'react'

function GuestNavbar() {
  return (
        <nav className='flex flex-row justify-between'>
            <button className='text-[#7E765D] font-bold text-xl'>Login</button>
            <button className='px-5 py-2 bg-amber-500 rounded-2xl font-bold text-white'>Join Readit</button>
        </nav>
  )
}

export default GuestNavbar