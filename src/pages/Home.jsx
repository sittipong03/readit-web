import React from 'react'
import { Person } from '../icons/Index'

function Home() {
  return (
    <div className='p-80 flex flex-col justify-center items-center text-5xl font-bold bg-[#1A1815]'>
      <Person className="w-50 mb-15"/>
      <h1 className='mb-3 text-white'>Discover Your Next <br/> Great Read. Instantly</h1>
      <p className='text-xl mb-5 text-white'>Describe your ideal read. Our AI will do the rest</p>
      <button className='text-lg p-5 rounded-3xl bg-[#b369b8] text-white'>Magically find your books</button>
    </div>
  )
}

export default Home