import React from 'react'
import { Discord, FacebookLogo, Lock } from '../icons/Index'

function PaymentSuccess() {
  return (
    <div>
      <div className='flex justify-between m-5 border p-15'>
        <div className='w-3/5 pl-30'>
          <h1 className='font-bold text-4xl mb-5'>Check out</h1>
          <div className="">
            <div className="grid grid-cols-6 gap-3 mb-3">
              <h2 className='text-xl font-bold col-start-1 col-end-3'>Shipping Information</h2>
              <div className="grid grid-flow-col col-start-5 col-end-6">
                <input className='mr-3' type="checkbox" />
                <p className='font-bold text-xl'>Use your address</p>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 mb-5 rounded-3xl p-6 bg-[#e6dcc0]">
              <div className="grid grid-flow-row col-start-1 col-end-3">
                <label className='font-bold mb-2'>Full Name : </label>
                <input className='p-4 rounded-2xl bg-white' type="text" placeholder='Enter full name' />
              </div>
              <div className="grid grid-flow-row col-start-4 col-end-6">
                <label className='font-bold mb-2'>Email address :</label>
                <input className='p-4 rounded-2xl bg-white' type="text" placeholder='Enter email address' />
              </div>
              <div className="grid grid-flow-row col-start-1 col-end-3">
                <label className='font-bold mb-2'>Country : </label>
                <select className='p-4 rounded-2xl bg-white' defaultValue="Select your country">
                  <option disabled={true}>Select your country</option>
                  <option>Thailand</option>
                  <option>USA</option>
                </select>
              </div>
              <div className="grid grid-flow-row col-start-4 col-end-6">
                <label className='font-bold mb-2'>Moblie Number</label>
                <input className='p-4 rounded-2xl bg-white' type="text" placeholder='+66' />
              </div>
              <div className="grid grid-flow-row col-start-1 col-end-3">
                <label className='font-bold mb-2'>Street Address</label>
                <input className='p-4 rounded-2xl bg-white' type="text" placeholder='House Address, Streetname' />
              </div>
              <div className="grid grid-flow-row col-start-4 col-end-6">
                <label className='font-bold mb-2'>City</label>
                <select className='p-4 rounded-2xl bg-white' defaultValue="Please select">
                  <option disabled={true}>Please select</option>
                  <option>Bang-Aor</option>
                  <option>Bang-Po</option>
                </select>
              </div>
              <div className="grid grid-flow-row col-start-1 col-end-3">
                <label className='font-bold mb-2'>State/Province/Region</label>
                <select className='p-4 rounded-2xl bg-white' defaultValue="Please select">
                  <option disabled={true}>Please select</option>
                  <option>Bangkok</option>
                  <option>Nonthaburi</option>
                </select>
              </div>
              <div className="grid grid-flow-row col-start-4 col-end-6">
                <label className='font-bold mb-2'>Postal/Zip Code</label>
                <select className='p-4 rounded-2xl bg-white' defaultValue="Please select">
                  <option disabled={true}>Please select</option>
                  <option>11111</option>
                  <option>11122</option>
                </select>
              </div>
            </div>
            <div className="">
              <h2 className='text-xl font-bold mb-4'>Payment Method</h2>
              <div className="p-4 rounded-2xl bg-[#e6dcc0]">
                <div className="flex p-4 border border-gray-400 rounded-2xl mb-3">
                  <input className='mr-4' type="radio" />
                  <div>
                    <p className='font-bold'>PromptPay (QR Code)</p>
                  </div>
                </div>
                <div className="flex p-4 border border-gray-400 rounded-2xl">
                  <input className='mr-4' type="radio" />
                  <div>
                    <p className='font-bold'>Credit Card</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/6 grid grid-cols-3 gap-4 border p-5">
          <h2 className='text-2xl font-bold col-start-1 col-span-3'>Review your cart</h2>
          <p className='col-start-2 col-end-2 text-xl'>Subtotal</p>
          <p className='col-start-3 col-end-3 text-xl font-bold'>$20.00</p>
          <p className='col-start-2 col-end-2 text-xl'>Shipping</p>
          <p className='col-start-3 col-end-3 text-xl font-bold'>$20.00</p>
          <p className='col-start-2 col-end-2 text-xl font-bold'>Total</p>
          <p className='col-start-3 col-end-3 text-xl font-bold'>$20.00</p>
          <button className='col-start-1 col-end-4 rounded-2xl bg-[#bd5900] text-white font-bold cursor-pointer'>Pay Now</button>
          <Lock className="w-7 col-start-2 col-end-2" />
          <p className='col-start-3 col-end-4 font-bold'>Secure checkout - SSL Encrypted</p>
        </div>
      </div>

      <footer className='flex justify-between m-5 bg-[#13120f] p-5'>
        <div className='w-1/2 mb-5 text-[#cfc6aa]'>
          <h3 className='text-2xl font-bold text-[#cfc6aa] mb-4'>Relearn solution</h3>
          <p>Wanason Building 12th floor A, Room</p>
          <p>📞 083-795-1555</p>
          <p>✉️ relearn.acc@gmail.com</p>
          <div className='flex gap-3 mt-5'>
            <p>Term of service</p>
            <p>Privacy Notice</p>
            <p>Cookie preference</p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-end text-[#cfc6aa]">
          <h2 className='text-2xl mb-5 font-bold'>Readit</h2>
          <div className="flex">
            <FacebookLogo className="w-7" />
            <Discord className="w-7" />
          </div>
          <p>Version 0.1.0 © 2025  Readit. All Rights Reserved</p>
        </div>
      </footer>
    </div>
  )
}

export default PaymentSuccess