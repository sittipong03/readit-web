import { Button } from '@/components/ui/button'
import { Correct } from '@/src/icons/Index'
import React from 'react'

function PaymentSuccessPage() {
  return (
    <div className='flex justify-center items-center w-full py-50 bg-success-lighter'>
      <div className="w-1/4">
        <div className="flex flex-col items-center">
          <Correct className="w-[72px] mb-5"/>
          <h1 className='h6 mb-5'>Payment successful</h1>

        </div>
        <div className="bg-paper-elevation-2 p-[16px] rounded-xl shadow-card-3d mb-4">
          <h2 className='subtitle-3 mb-4'>Transaction Details</h2>
          <div className='flex justify-between mb-3'>
            <p className='body-2'>Transaction ID</p>
            <p className='subtitle-4'>123456B</p>
          </div>
          <div className='flex justify-between mb-3'>
            <p className='body-2'>Type of Transaction</p>
            <p className='subtitle-4'>Cradit Card</p>
          </div>
          <div className='flex justify-between mb-3'>
            <p className='body-2'>Subtotal</p>
            <p className='subtitle-4'>$69.03</p>
          </div>
          <div className='flex justify-between mb-3'>
            <p className='body-2'>Subtotal</p>
            <p className='subtitle-4'>$0.00</p>
          </div>
          <div className='flex justify-between'>
            <p className='body-2'>Shipping</p>
            <p className='subtitle-4'>$0.00</p>
          </div>
        </div>
        <div className="flex gap3 justify-around">
          <Button className='bg-primary-soft button-medium text-primary-main border-primary-main'>Purchase History</Button>
          <Button className='bg-primary-main button-medium'>Browse more</Button>
          {/* <button className='bg-primary-soft'>Purchase History</button>
          <button className='bg-primary-main'>Browser more</button> */}
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessPage