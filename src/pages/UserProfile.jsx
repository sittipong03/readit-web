import React, { useState } from 'react'
import { PersonwithNothing } from '../icons/Index'
import { Button } from '@/components/ui/button'

function UserProfile() {

  const [loadingAI, setLoadingAI] = useState(false);


  return (
    <>
      <div className="bg-paper-elevation-6 text-text-primary flex min-h-[700px] justify-center">
        <div className='w-full max-w-lg'>
          <div className="flex gap-10 p-10">
            {/* left column */}
            <div className="flex w-full max-w-[480px] flex-col gap-6 border">
              <div className='w-full max-w-[480px] '>

              </div>
            </div>
            <div className="flex flex-col w-full max-w-[660px] gap-6 ">
              <div className="flex w-full max-w-[660px] h-[204px] gap-2 ">
                <div className='flex flex-col border w-full rounded-lg bg-tertiary-selected  border-tertiary-outlinedBorder max-w-[322px] h-full max-h-[204px] '>

                  <div className='subtitle-2'>
                    <div className='text-tertiary-darker'>
                      Daily book
                    </div>
                    <div className='text-tertiary-darker'>
                      recommendations
                    </div>
                  </div>

                  <div className='body-2'>
                    <div>
                      Allow our AI to recommend books
                    </div>
                    <div>
                      tailored just for you.
                    </div>
                    <Button
                      variant={loadingAI ? "contained" : "contained"}
                      color="tertiary"
                      size="medium"
                      disabled={loadingAI ? true : false}
                    >
                      <i className="fa-solid fa-shuffle"></i>
                      {loadingAI ? "Thinking..." : "Surprise Me"}
                    </Button>
                  </div>


                </div>
                <div className='flex flex-col border w-full rounded-lg bg-secondary-selected gap-15 border-secondary-outlinedBorder max-w-[322px] h-full max-h-[204px]'>

                </div>
              </div>
            </div>
            {/* right colume */}
            <div className=''>

            </div>
          </div>
          {/* <div className="w-2/5"></div>
        <div className="flex flex-col w-3/5">
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
        </div> */}
        </div>
      </div>
    </>
  )
}

export default UserProfile