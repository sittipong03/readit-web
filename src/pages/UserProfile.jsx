import React from 'react'
import { PersonwithNothing } from '../icons/Index'

function UserProfile() {
  return (
    <>
      <div className="flex p-16">
        <div className="w-2/5"></div>
        <div className="w-3/5 flex flex-col">
          <div className="grid grid-cols-6 gap-4">
            <div className="p-6 border rounded-2xl col-start-2 col-end-4 bg-[#A44EE4] opacity-[50%]">
              <h1 className='text-2xl mb-4 text-[#491570] font-bold'>Daily book recommendations</h1>
              <p className='mb-4'>Allow out AI to recommend books tailored just for you</p>
              <button className='p-4 border rounded-2xl'>Suprise Me</button>
            </div>
            <div className="p-6 border rounded-2xl col-start-4 col-end-6 bg-[#7E765D] opacity-[20%]">
              <h1 className='text-2xl mb-4 text-[#655E48] font-bold'>Find a book to review</h1>
              <p className='mb-4'>Share your insights, earn your share</p>
              <button className='p-4 rounded-2xl text-white font-bold bg-[#7E765D]'>Browse a book</button>
            </div>
          </div>
          <div className="">
            <div className="flex justify-around">
              <h1>Activities</h1>
              <select name="" id="">
                <option value="">Newest</option>
                <option value="">Oldest</option>
              </select>
            </div>
            <div>
              <PersonwithNothing className="w-30"/>
              <h1>Nothing here</h1>
              <p>Follow someone to see their activities</p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default UserProfile