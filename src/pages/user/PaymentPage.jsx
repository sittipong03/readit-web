import React from 'react'
import { Input } from '../../../components/ui/input'
import { Button } from '@/components/ui/button'
import { Discord, FacebookLogo, Lock } from '../../icons/Index'

function PaymentPage() {
  return (
    <div>
      <div className='flex justify-between border p-20 bg-paper-elevation-6'>
        <div className='w-3/5 pl-30'>
          <h1 className='h6'>Check out</h1>
          <div className="">
            <div className="grid grid-cols-5 gap-3 mb-3">
              <h2 className='subtitle-1 col-start-1 col-end-3'>Shipping Information</h2>
                <input className='col-start-5 col-end-5 color-action-active' type="checkbox" />
                <p className='col-start-6 col-end-6 subtitle-4'>Use your address</p>
            </div>
            <div className="grid grid-cols-5 gap-3 mb-5 rounded-xl p-[16px] bg-paper-elevation-6 shadow-card-3d">
              <div className="grid grid-flow-row col-start-1 col-end-3">
                <label className='label-medium'>Full Name : </label>
                {/* <input className='p-4 rounded-2xl bg-secondary-lighter' type="text" placeholder='Enter full name' /> */}
                <Input className='bg-secondary-lighter' type="text" placeholder='Enter full name'/>
              </div>
              <div className="grid grid-flow-row col-start-4 col-end-6">
                <label className='label-medium mb-2'>Email address :</label>
                {/* <input className='p-4 rounded-2xl bg-secondary-lighter' type="text" placeholder='Enter email address' /> */}
                <Input className='bg-secondary-lighter' type="email" placeholder='Enter email address'/>
              </div>
              <div className="grid grid-flow-row col-start-1 col-end-3">
                <label className='label-medium mb-2'>Country : </label>
                <select className='p-3 rounded-2xl bg-secondary-lighter' defaultValue="Select your country">
                  <option disabled={true}>Select your country</option>
                  <option>Thailand</option>
                  <option>USA</option>
                </select>
              </div>
              <div className="grid grid-flow-row col-start-4 col-end-6">
                <label className='label-medium mb-2'>Moblie Number</label>
                {/* <input className='p-4 rounded-2xl bg-secondary-lighter' type="text" placeholder='+66' /> */}
                <Input className='bg-secondary-lighter' type="text" placeholder='+66'/>
              </div>
              <div className="grid grid-flow-row col-start-1 col-end-3">
                <label className='label-medium mb-2'>Street Address</label>
                {/* <input className='p-4 rounded-2xl bg-white' type="text" placeholder='House Address, Streetname' /> */}
                <Input className="bg-secondary-lighter" type="text" placeholder='House Address, Streetname'/>
              </div>
              <div className="grid grid-flow-row col-start-4 col-end-6">
                <label className='label-medium mb-2'>City</label>
                <select className='p-4 rounded-2xl bg-secondary-lighter' defaultValue="Please select">
                  <option disabled={true}>Please select</option>
                  <option>Bang-Aor</option>
                  <option>Bang-Po</option>
                </select>
              </div>
              <div className="grid grid-flow-row col-start-1 col-end-3">
                <label className='label-medium mb-2'>State/Province/Region</label>
                <select className='p-4 rounded-2xl bg-secondary-lighter' defaultValue="Please select">
                  <option disabled={true}>Please select</option>
                  <option>Bangkok</option>
                  <option>Nonthaburi</option>
                </select>
              </div>
              <div className="grid grid-flow-row col-start-4 col-end-6">
                <label className='label-medium mb-2'>Postal/Zip Code</label>
                <select className='p-4 rounded-2xl bg-secondary-lighter' defaultValue="Please select">
                  <option disabled={true}>Please select</option>
                  <option>11111</option>
                  <option>11122</option>
                </select>
              </div>
            </div>
            <div className="">
              <h2 className='subtitle-1 mb-4'>Payment Method</h2>
              <div className="p-4 rounded-2xl bg-[#e6dcc0]">
                <div className="flex p-4 border border-gray-400 rounded-2xl mb-3">
                  <input className='mr-4' type="radio" />
                  <div>
                    <p className='subtitle-3'>PromptPay (QR Code)</p>
                  </div>
                </div>
                <div className="flex p-4 border border-gray-400 rounded-2xl">
                  <input className='mr-4' type="radio" />
                  <div>
                    <p className='subtitle-3'>Credit Card</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/6 grid grid-cols-3 gap-4 border p-5 bg-paper-elevation-4">
          <h2 className='subtitle-2 col-start-1 col-span-3'>Review your cart</h2>
          <ul>
            <li>
              <div className="">
                <img src="../../picture/book-closed-svgrepo-com.png" alt="Mock book" />
              </div>
            </li>
          </ul>
          <p className='col-start-2 col-end-2 body-2'>Subtotal</p>
          <p className='col-start-3 col-end-3 body-2'>$20.00</p>
          <p className='col-start-2 col-end-2 body-2'>Shipping</p>
          <p className='col-start-3 col-end-3 body-2'>$20.00</p>
          <p className='col-start-2 col-end-2 subtitle-2'>Total</p>
          <p className='col-start-3 col-end-3 subtitle-2'>$20.00</p>
          {/* <button className='col-start-1 col-end-4 rounded-2xl button-large cursor-pointer'>Pay Now</button> */}
          <Button className='col-start-2 col-end-3' variant = "primary">Pay now</Button>
          <Lock className="w-7 col-start-1 col-end-1" />
          <p className='col-start-2 col-end-3 subtitle-4'>Secure checkout - SSL Encrypted</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage