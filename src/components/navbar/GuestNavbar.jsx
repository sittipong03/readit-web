import React from 'react'

function GuestNavbar() {
  return (
        <nav className='flex flex-row justify-between gap-5'>
            <button className='text-[#7E765D] font-bold text-xl'>Log in</button>
            <button className='px-5 py-2 rounded-2xl font-bold text-[#ffffff] bg-[#fd9a00]'>Join Readit</button>
        </nav>
  )
}

export default GuestNavbar